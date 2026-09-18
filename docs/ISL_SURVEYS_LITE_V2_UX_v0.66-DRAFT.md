# ISL — SURVEYS LITE v2 · UX FLOW v0.66-DRAFT
Fecha: 2026-09-18
Estado: DISEÑO CERRADO · NO PUBLICAR hasta R1/R2 GREEN

## Principio
La encuesta debe sentirse como una micro-experiencia ISL, no como un formulario.
Objetivo: 45–70 s, mobile-first, 1 pregunta por pantalla, lectura en 2–4 s.

## Lenguaje visual
- fondo ISL oscuro, limpio y atmosférico
- tarjetas grandes con icono/mini-ilustración
- tipografía corta, sin párrafos en opciones
- chips táctiles para multi-selección
- CTA grande fijo abajo
- barra de progreso visible
- selección con microanimación y feedback breve
- reduced-motion respetado
- targets táctiles >=44px
- sin scroll largo dentro de una pregunta

## Patrón de interacción
Pantalla 0: portada visual
Pantallas 1–N: una pregunta
Pantalla final: sello de huella
Navegación: Atrás / Siguiente
Auto-advance sólo en preguntas de una sola opción si no compromete accesibilidad.
Guardar estado de la encuesta durante la sesión para no perder respuestas al volver atrás.

# PILARES LITE v2

## 0 · Portada
Hero visual: barco-hogar + islas + tripulación separada + huellas.
Título: ISL · HUELLA RÁPIDA
Copy: “Dinos qué entiendes y qué te tira. 1 minuto.”
CTA: EMPEZAR →

## 1 · ¿Qué sientes que es ISL?
Cards:
👥 Reunir una tripulación perdida
🏝️ Explorar islas raras
🚢 Reconstruir un barco-hogar
🌀 Una mezcla de todo eso
❔ Aún no lo pillo
Microfeedback: “Lectura capturada.”

## 2 · ¿Qué te tira más?
Máximo 2 chips/cards:
👥 Tripulación
🏝️ Islas
✨ Huellas
🚢 Barco-hogar
🧿 Reliquias/builds
🎭 Tono raro-poético
Microcopy: “Elige dos como máximo.”

## 3 · ¿Qué vibra te gusta?
Cards visuales:
🌤️ Aventura poética
🌀 Raro con encanto
👻 Humor extraño
🌫️ Misterio y belleza
🎨 Mezcla de todo
Microfeedback: “Vibra guardada.”

## 4 · ¿Qué te preocupa?
Cards:
🧱 Demasiadas cosas
❓ No entenderlo
🎮 Mucha idea y poco juego
🎭 Tono demasiado mezclado
✅ Nada especial

## 5 · ¿Qué NO quitarías?
Una sola línea.
Placeholder: “Yo salvaría…”
Límite corto: 120–160 caracteres.

## 6 · ¿Qué recortarías sin piedad?
Una sola línea.
Placeholder: “Yo cortaría…”
Límite corto: 120–160 caracteres.

## Final
Sello visual: HUELLA GUARDADA
Copy: “Tu respuesta no decide el canon. Nos ayuda a hacer mejores preguntas.”
CTA secundario: VER OTRA ENCUESTA

# REFERENCIAS LITE v2

## 0 · Portada
Hero visual: panel “NO COPIAMOS → MUTAMOS”.
Título: LABORATORIO DE REFERENCIAS
Copy: “Trae energía útil, no disfraces.”
CTA: MUTAR →

## 1 · ¿Qué tipo de referencia te activa?
Cards:
🎮 Jugabilidad
📖 Narrativa/emoción
🎨 Visual/espacio
🎵 Música/atmósfera
🎭 Humor/tono
🌀 Rareza difícil de explicar

## 2 · Del fantasma marítimo absurdo, ¿qué salvarías?
Máximo 2 chips:
👻 Presencia espectral
😂 Humor absurdo
⚡ Amenaza + comedia
🌫️ Niebla/umbral
🚢 Barco maldito
📜 Reglas propias
Microfeedback: “Función extraída.”

## 3 · ¿Cómo debería entrar en ISL?
Cards:
✦ Pincelada pequeña
♻ Evento/criatura recurrente
⚙ Regla del mundo
🌫️ Tono/vibe
✖ Mejor fuera

## 4 · ¿Qué NO deberíamos copiar nunca?
Una línea.
Placeholder: “No copiaría…”

## 5 · Suelta una referencia útil
Campo 1: “Referencia”
Campo 2 corto: “Lo útil de ella es…”
No textarea larga.

## Final
Sello: MUTACIÓN REGISTRADA
Copy: “ISL roba funciones a la realidad, no identidades a las obras.”

# Microinteracciones
- card seleccionada: elevación + borde + pulso suave
- chip: toggle instantáneo
- progreso: 1/6, 2/6...
- transición lateral 140–220 ms
- feedback máximo 600 ms, nunca bloquea
- sin confeti
- vibración opcional sólo si plataforma y preferencia lo permiten

# Accesibilidad
- labels reales
- foco visible
- aria-live para progreso/feedback
- contraste AA
- navegación teclado
- prefers-reduced-motion
- no depender sólo de color
- texto escalable
- errores inline breves

# Instrumentación mínima
Registrar sin PII adicional:
- survey_version
- cohort
- survey_source
- started_at
- completed_at
- completion_time_band
- abandoned_step
- selected options
No registrar gestos finos ni telemetría invasiva.

# Criterio de éxito
- mediana de finalización <=70 s
- abandono principal identificable
- 80%+ completan sin volver atrás por confusión
- campos abiertos con alta tasa de respuesta pese a ser opcionales
- usuarios describen la experiencia como rápida/ligera
- nadie confunde encuesta con votación vinculante

# Imágenes necesarias
A. HERO_ISL_SUMMARY_v1
   - barco-hogar
   - tripulación dispersa
   - islas
   - huellas
   - rareza poética
B. HERO_MUTATE_REFERENCES_v1
   - NO COPIAMOS / MUTAMOS
   - identidad tachada
   - funciones convertidas en iconos: ritmo, regla, atmósfera, contradicción, humor

# Regla de publicación
No reemplazar v1 en producción hasta:
1. R1/R2 GREEN
2. test local/preview
3. envío completo Netlify test
4. recuperación metadata
5. rollback URL/commit conocidos
