# ¿Qué personaje de Attack on Titan (Shingeki no Kyojin) sos? ⚔️

Sitio web interactivo, modular y responsive diseñado con la estética del Cuerpo de Exploración (Survey Corps). Evalúa tus decisiones tácticas, dilemas morales y visión de libertad a través de 10 preguntas inmersivas para determinar tu afinidad psicológica con 8 personajes icónicos de la serie.

---

## 🌟 Características Principales

- **Diseño Táctico Militar**: Paleta de colores inspirada en la serie (verde legión, oro gastado, carmesí y texturas de muralla).
- **Tipografía Épica**: Google Fonts (`Cinzel` y `Plus Jakarta Sans`).
- **Lógica de Puntuación Multidimensional**: Cada respuesta distribuye ponderaciones en tiempo real entre los 8 personajes.
- **8 Perfiles Psicológicos Completos**: Eren, Mikasa, Armin, Levi, Erwin, Hange, Reiner y Sasha con arte en alta definición, citas célebres, rasgos clave y estilo de combate.
- **Medidor de Afinidad y Comparativa**: Porcentaje de coincidencia principal y desglose clasificado con todo el escuadrón.
- **Efectos de Sonido FX Synthesizer**: Audio nativo mediante Web Audio API (sin descargas externas pesadas) con botón de encendido/apagado.
- **Accesibilidad y Atajos de Teclado**: Soporte para responder con las teclas `1`-`4` o `A`-`D`.
- **Compartir en Redes**: Botones integrados para copiar resultado al portapapeles y compartir directamente en X (Twitter) y WhatsApp.
- **Zero Config para Vercel**: Listo para despliegue estático con `vercel.json` preconfigurado.

---

## 📂 Estructura del Proyecto

```text
├── index.html              # Estructura semántica, metas OpenGraph/SEO y CDN Tailwind
├── styles.css              # Variables CSS, animaciones personalizadas y estética SnK
├── src/
│   ├── data/
│   │   ├── characters.js   # Datos de los 8 personajes y rutas de avatares
│   │   └── questions.js    # 10 preguntas temáticas con matrices de puntos
│   └── app.js              # Controlador principal, máquina de estados y Web Audio API
├── vercel.json             # Configuración de despliegue estático y cabeceras para Vercel
├── README.md               # Documentación y guía de despliegue
└── .gitignore              # Archivos y carpetas ignorados por Git
```

---

## 🚀 Despliegue en Vercel y GitHub (Paso a Paso)

### Opción 1: Despliegue Directo desde GitHub con Vercel (Recomendado)

#### Paso 1: Inicializar el repositorio Git local
Abre tu terminal en la carpeta raíz del proyecto y ejecuta:

```bash
# 1. Iniciar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: initial commit quiz Attack on Titan"
```

#### Paso 2: Crear el repositorio en GitHub y subir los cambios
1. Ve a [GitHub](https://github.com) y pulsa en **"New repository"**.
2. Dale un nombre (ejemplo: `snk-character-quiz`).
3. Déjalo como **Public** y no agregues README ni .gitignore (ya los tienes creados).
4. Copia los comandos para subir un repositorio existente:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/snk-character-quiz.git
git push -u origin main
```

#### Paso 3: Conectar con Vercel
1. Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. En tu Dashboard, haz clic en el botón **"Add New..."** → **"Project"**.
3. Selecciona tu repositorio recién subido (`snk-character-quiz`) y pulsa **"Import"**.
4. En la pantalla de configuración:
   - **Framework Preset**: Puedes dejarlo en `Other` (sitio estático) o `Vite`.
   - **Root Directory**: `./` (la raíz).
   - Vercel detectará automáticamente `vercel.json` e `index.html`.
5. Haz clic en **"Deploy"**.
6. ¡Listo! En menos de 30 segundos tendrás tu URL pública (ejemplo: `https://snk-character-quiz.vercel.app`).

---

### Opción 2: Despliegue Directo vía Vercel CLI

Si prefieres usar la terminal:

```bash
# Instalar CLI de Vercel globalmente
npm i -g vercel

# Iniciar despliegue en la raíz del proyecto
vercel

# Para desplegar directamente a producción:
vercel --prod
```

---

## 💻 Desarrollo Local

Para probarlo localmente con cualquier servidor estático:

### Con Vite (incluido en este repositorio):
```bash
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### Con npx serve o Live Server:
```bash
npx serve .
```

---

## 📜 Licencia y Créditos

Este es un proyecto tributo de fans con fines educativos y de entretenimiento. *Attack on Titan* (*Shingeki no Kyojin*) y todos sus personajes son propiedad intelectual de **Hajime Isayama** y **Kodansha**.
