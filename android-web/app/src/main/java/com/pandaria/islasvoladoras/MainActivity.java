package com.pandaria.islasvoladoras;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.graphics.Color;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.core.view.WindowCompat;
import androidx.work.Data;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;

public class MainActivity extends Activity {
    private static final String BASE = "https://juanmailcamara331-hash.github.io/islas-voladoras/";
    private static final String HOME = BASE + "index.html?app=1&native=078&v=20260921-1";
    private WebView web;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        // Draw the WebView behind Android system bars. Web content owns safe-area padding.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= 29) {
            getWindow().setStatusBarContrastEnforced(false);
            getWindow().setNavigationBarContrastEnforced(false);
        }
        web = new WebView(this);
        web.setBackgroundColor(Color.TRANSPARENT);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setSupportZoom(false);
        s.setUseWideViewPort(false);
        s.setLoadWithOverviewMode(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);

        web.setInitialScale(0);
        web.clearCache(true);
        web.clearHistory();
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient());
        web.addJavascriptInterface(new NativeNotificationsBridge(), "ISLNativeNotifications");

        scheduleSoftReminders();

        String target = getIntent().getStringExtra("isl_url");
        web.loadUrl(target != null ? BASE + target : HOME);
    }

    private void scheduleSoftReminders() {
        scheduleDaily("isl-morning", "morning", 8, 30);
        scheduleDaily("isl-afternoon", "afternoon", 15, 30);
    }

    private void scheduleDaily(String uniqueName, String slot, int hour, int minute) {
        Data data = new Data.Builder().putString("slot", slot).build();
        PeriodicWorkRequest req = new PeriodicWorkRequest.Builder(NotificationWorker.class, 24, TimeUnit.HOURS)
            .setInitialDelay(msUntil(hour, minute), TimeUnit.MILLISECONDS)
            .setInputData(data)
            .build();
        WorkManager.getInstance(this).enqueueUniquePeriodicWork(uniqueName, ExistingPeriodicWorkPolicy.UPDATE, req);
    }

    private long msUntil(int hour, int minute) {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime target = now.withHour(hour).withMinute(minute).withSecond(0).withNano(0);
        if (!target.isAfter(now)) target = target.plusDays(1);
        return Duration.between(now, target).toMillis();
    }

    private boolean hasNotificationPermission() {
        return Build.VERSION.SDK_INT < 33 || checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    private SharedPreferences notificationPrefs() {
        return getSharedPreferences(NotificationWorker.PREFS, Context.MODE_PRIVATE);
    }

    public class NativeNotificationsBridge {
        @JavascriptInterface
        public boolean isNative() { return true; }

        @JavascriptInterface
        public boolean hasPermission() { return hasNotificationPermission(); }

        @JavascriptInterface
        public String getMode() {
            return notificationPrefs().getString(NotificationWorker.PREF_MODE, "normal");
        }

        @JavascriptInterface
        public void setMode(String mode) {
            if (!"quiet".equals(mode) && !"normal".equals(mode) && !"active".equals(mode)) mode = "normal";
            notificationPrefs().edit().putString(NotificationWorker.PREF_MODE, mode).apply();
        }

        @JavascriptInterface
        public void requestPermission() {
            runOnUiThread(() -> {
                if (Build.VERSION.SDK_INT >= 33 && !hasNotificationPermission()) {
                    requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 4201);
                }
            });
        }

        @JavascriptInterface
        public void testNotification() {
            Data data = new Data.Builder().putString("slot", "morning").build();
            OneTimeWorkRequest req = new OneTimeWorkRequest.Builder(NotificationWorker.class).setInputData(data).build();
            WorkManager.getInstance(MainActivity.this).enqueue(req);
        }

        @JavascriptInterface
        public void open(String relativeUrl) {
            runOnUiThread(() -> web.loadUrl(BASE + relativeUrl));
        }
    }

    @Override
    public void onBackPressed() {
        if (web == null) {
            super.onBackPressed();
            return;
        }
        web.evaluateJavascript(
            "(function(){try{if(window.__islGoBack){window.__islGoBack();return 'handled';}" +
            "var p=sessionStorage.getItem('isl_return_to');" +
            "if(p&&p!==location.href){sessionStorage.setItem('isl_return_to',location.href);location.href=p;return 'handled';}" +
            "}catch(e){}return 'fallback';})()",
            result -> {
                if ("\"fallback\"".equals(result)) {
                    if (web.canGoBack()) web.goBack();
                    else web.loadUrl(HOME);
                }
            }
        );
    }
}
