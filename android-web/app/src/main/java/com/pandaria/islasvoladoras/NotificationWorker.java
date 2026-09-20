package com.pandaria.islasvoladoras;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;

public class NotificationWorker extends Worker {
    public static final String CHANNEL_ID = "isl_rhythm";
    private static final String STATE_URL = "https://juanmailcamara331-hash.github.io/islas-voladoras/isl-mission-state.json";

    public NotificationWorker(@NonNull Context context, @NonNull WorkerParameters params) {
        super(context, params);
    }

    @NonNull @Override
    public Result doWork() {
        Context c = getApplicationContext();
        ensureChannel(c);

        String slot = getInputData().getString("slot");
        if (slot == null) slot = "morning";

        String mission = fetchNowMission();
        int day = LocalDate.now().getDayOfYear();
        boolean growthDay = day % 3 == 0;

        String title;
        String body;
        String url;

        if ("afternoon".equals(slot)) {
            title = "ISL · El viento gira al caer la tarde";
            if (growthDay) {
                body = "Hay botín fuera del juego: Making, mockup o campaña. Una pieza pequeña basta hoy.";
                url = "crecimiento.html";
            } else {
                body = mission != null
                    ? "La cubierta está tranquila. Si haces una sola cosa: " + mission + ". Después, suelta el timón."
                    : "No hace falta conquistar otra isla. Cierra un fleco y suelta el timón.";
                url = "mission-map.html";
            }
        } else {
            title = "ISL · Parte de navegación";
            body = mission != null
                ? "Capitán: hoy la brújula apunta a «" + mission + "». Una misión, no veinte."
                : "Capitán: revisa MISIONES. El cielo ya ha ordenado lo importante por ti.";
            url = "mission-map.html";
        }

        Intent intent = new Intent(c, MainActivity.class);
        intent.putExtra("isl_url", url);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(c, url.hashCode(), intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder n = new NotificationCompat.Builder(c, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setContentIntent(pi);

        NotificationManager nm = (NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.notify((slot + LocalDate.now().toString()).hashCode(), n.build());
        return Result.success();
    }

    private static void ensureChannel(Context c) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel ch = new NotificationChannel(CHANNEL_ID, "Ritmo ISL", NotificationManager.IMPORTANCE_DEFAULT);
            ch.setDescription("Misiones, crecimiento y recordatorios suaves de ISL.");
            nm.createNotificationChannel(ch);
        }
    }

    private String fetchNowMission() {
        HttpURLConnection con = null;
        try {
            con = (HttpURLConnection)new URL(STATE_URL).openConnection();
            con.setConnectTimeout(3000);
            con.setReadTimeout(3000);
            con.setRequestProperty("Cache-Control","no-cache");
            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder sb = new StringBuilder(); String line;
            while ((line = br.readLine()) != null) sb.append(line);
            br.close();
            JSONArray a = new JSONObject(sb.toString()).optJSONArray("missions");
            if (a == null) return null;
            for (int i=0;i<a.length();i++) {
                JSONObject x=a.optJSONObject(i);
                if (x != null && "NOW".equals(x.optString("lane"))) return x.optString("title", null);
            }
        } catch (Exception ignored) {
        } finally {
            if (con != null) con.disconnect();
        }
        return null;
    }
}
