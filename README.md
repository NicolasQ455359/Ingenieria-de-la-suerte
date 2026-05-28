# 🎰 Ingeniería de la Suerte — Trabajo Final de Visualización

<div align="center">
  <img src="assets/images/Imagen explicativa.png" alt="Ingeniería de la Suerte Banner" width="800" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); border: 2px solid rgba(212, 175, 55, 0.4); margin-bottom: 20px;" />

  [![Ver Sitio en Vivo](https://img.shields.io/badge/Vercel-Desplegado-black?style=for-the-badge&logo=vercel&logoColor=white&color=0A4A2F)](https://ingenieria-de-la-suerte.vercel.app/)
  &nbsp;
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
  &nbsp;
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
  &nbsp;
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
  &nbsp;
  [![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](#)
</div>

---

## 🎯 Descripción General

**Ingeniería de la Suerte** es una aplicación web interactiva de alto impacto visual y técnico diseñada bajo el concepto de un **HUD (Head-Up Display) de Casino Premium**. La aplicación está concebida no solo como un visor interactivo, sino como una herramienta analítica y de ingeniería avanzada aplicada al análisis y la deconstrucción de una ruleta física de casino.

Con una paleta de colores curada que combina **Verde Esmeralda Deep (#0A4A2F)**, **Dorado Metálico (#D4AF37)** y **Negro Obsidiana (#111111)**, el sistema ofrece una experiencia inmersiva fluida en navegadores modernos, estructurada en tres pantallas principales auto-explicativas y conectadas.

---

## 🚀 Despliegue en Vercel

El proyecto está completamente optimizado para entornos de hosting estático y se encuentra desplegado en producción en el siguiente enlace:

👉 **[https://ingenieria-de-la-suerte.vercel.app/](https://ingenieria-de-la-suerte.vercel.app/)**

*(Nota: Si tu enlace final de Vercel es diferente, puedes editar este archivo en cualquier momento para actualizarlo).*

---

## 🌟 Características Principales

El proyecto se divide en tres módulos interactivos clave accesibles desde la barra de navegación superior persistente:

### 1. 🔍 Inspección 3D (Pantalla Principal)
Desarrollada sobre **Three.js**, esta pantalla permite interactuar directamente con un modelo 3D de alta precisión de la ruleta.
*   **Modos de Visualización HUD**:
    *   **Modo General**: Visualización externa clásica con controles orbitales y autorrotación cinematográfica.
    *   **Modo Corte**: Aplica un plano de sección en tiempo real sobre el eje X para revelar la composición interna de la ruleta.
    *   **Modo Despiece**: Simula un diagrama explotado vertical de las piezas, separando la cúpula de vidrio, el rotor de casillas, el eje metálico y la taza base.
    *   **Modo Transparencia**: Reduce la opacidad del chasis para apreciar la mecánica oculta.
    *   **Modo Detalle**: Enfoca la cámara dinámicamente en la pista y los deflectores de la bola.
*   **Fichas Técnicas HUD**: Al hacer clic en los componentes 3D (o mediante el panel selector), la tarjeta HUD lateral muestra en tiempo real sus especificaciones técnicas, masa, material, función y estadísticas de rendimiento físico (durabilidad, fricción, precisión).
*   **Bypass de CORS Local (Dropzone)**: Si el modelo 3D se bloquea localmente por restricciones de red/CORS, la interfaz se adapta automáticamente activando un área de "arrastrar y soltar" que permite cargar el archivo `.glb` del equipo al navegador en milisegundos sin configuraciones adicionales.

### 2. 📊 Análisis de Datos y Telemetría
Un tablero de control analítico premium que simula el análisis estadístico de la aleatoriedad física de la ruleta:
*   Visualización dinámica de la distribución de caída de la bola (Números más calientes vs. fríos).
*   Gráficos circulares de sectores (Rojo vs. Negro vs. Verde) y gráficos de barras integrados con **Chart.js**.
*   Ajustes interactivos mediante barras de rango deslizantes para modificar los valores de telemetría y ver el comportamiento del sistema.

### 3. 🗺️ Mapa Interactivo
Un visor geográfico que simula la distribución de casinos y terminales de ruleta en el área metropolitana de Medellín:
*   Construido utilizando una escena 3D / Proyección plana sobre un mapa detallado del territorio.
*   Presenta indicadores HUD translúcidos sobre puntos clave de distribución y controles interactivos de filtrado.

---

## 📁 Estructura del Repositorio Organizado

El repositorio ha sido reorganizado de manera exhaustiva para eliminar la acumulación de archivos sueltos en la raíz, logrando una arquitectura de software limpia y profesional:

```bash
Trabajo Final Visualizacion/
├── 📂 assets/                     # Recursos públicos del sitio web
│   ├── 📂 images/                 # Imágenes estáticas y capturas
│   │   ├── 📂 imagenes pantallas/ # Capturas de los wireframes HUD del simulador
│   │   └── Imagen explicativa.png # Infografía y banner explicativo
│   ├── 📂 models/                 # Modelos 3D e insumos de diseño en 3D
│   │   ├── Bottom.fbx             # Pieza base FBX
│   │   ├── ruleta final.fbx       # Modelo FBX general original
│   │   ├── rueltaTexturas.glb     # Modelo 3D de producción con texturas (39MB)
│   │   ├── ruletafinal.glb        # Modelo 3D alternativo (39MB)
│   │   ├── ruleta.blend           # Archivo fuente nativo de Blender
│   │   ├── ruleta.blend1          # Respaldo de Blender
│   │   └── ruleta vidrio.blend    # Archivo fuente Blender para pieza de vidrio
│   ├── medellin_map.jpg           # Imagen base para el mapa interactivo
│   ├── ruleta.fbx                 # Insumo de ruleta FBX secundario
│   └── ruleta vidrio.fbx          # Insumo de vidrio superior FBX
├── 📂 css/                        # Estilos de la aplicación
│   └── style.css                  # Hoja de estilos global (HUD, Glassmorphism)
├── 📂 js/                         # Lógica en JavaScript
│   ├── 3d-viewer.js               # Inicialización y control del visor Three.js
│   ├── analytics.js               # Tablero analítico e integración con Chart.js
│   ├── app.js                     # Controlador principal de vistas dinámicas SPA
│   ├── map.js                     # Inicialización del mapa interactivo
│   ├── map_base64.js              # Datos codificados para el mapa
│   └── model_base64.js            # Modelo de repuesto codificado en Base64
├── 📂 docs/                       # Documentación teórica y académica
│   ├── Contenido_Diapositivas_Diseno.md   # Guion y contenido de diapositivas
│   ├── Plan_Trabajo_Programa_Interactivo.md # Cronograma y fases de desarrollo
│   ├── Planteamiento.pdf          # Enunciado y base conceptual académica
│   ├── Presentacion_Diseno_UI.pptx # Diapositivas oficiales del proyecto
│   └── entrega final visualizacion.docx  # Documento de entrega final en Word
├── 📂 views/                      # Inyecciones HTML parciales (SPA)
│   ├── 3d.html                    # Fragmento HTML para el visor 3D
│   ├── data.html                  # Fragmento HTML para análisis estadístico
│   └── map.html                   # Fragmento HTML para el mapa
├── index.html                     # Entrada principal de Inspección 3D
├── datos.html                     # Entrada secundaria de Análisis de Datos
├── mapa.html                      # Entrada secundaria de Mapa Interactivo
├── debug_model.html               # Herramienta técnica de depuración del modelo 3D
├── Presentacion_Interactiva.html  # Diapositivas dinámicas basadas en Reveal.js
├── Presentacion_Interactiva_Local.html # Presentación compilada para uso offline
├── Programa_Interactivo_Ruleta.html # Prototipo monofilamento integrado
└── .gitignore                     # Configuración de exclusiones de Git
```

---

## 💻 Tecnologías Utilizadas

*   **HTML5 & CSS3**: Estructuras semánticas, maquetación flexible con Flexbox/Grid y efectos visuales de **Glassmorphism** usando `backdrop-filter` para el HUD.
*   **JavaScript (ES6+)**: Modularización en archivos independientes, import maps y lógica reactiva de controles HUD.
*   **Three.js (r160)**: Renderizado WebGL acelerado por hardware para visualización 3D interactiva, iluminación direccional curada, planos de corte en tiempo real y materiales con propiedades de transparencia y reflectividad física (PBR).
*   **OrbitControls**: Control de cámara intuitivo y suave con amortiguación inercial.
*   **Chart.js**: Renderizado de gráficos vectoriales para telemetría interactiva de datos.
*   **Reveal.js**: Utilizado como motor interactivo para las diapositivas de presentación de diseño dentro del repositorio.

---

## 🔧 Ejecución Local

Dado que el visor 3D realiza peticiones asíncronas para cargar texturas y el modelo en formato `.glb`, el navegador bloqueará estas solicitudes si abres el archivo `index.html` haciendo doble clic desde el explorador de archivos (debido a las políticas de seguridad **CORS**).

Para ejecutar el proyecto localmente sin problemas:

### Opción A (Recomendada - Servidor Rápido)
Si tienes instalado **Node.js**:
1. Abre tu terminal en la carpeta raíz del proyecto.
2. Inicia un servidor estático rápido:
   ```bash
   npx http-server .
   ```
3. Abre tu navegador e ingresa a `http://localhost:8080`.

### Opción B (Visual Studio Code)
1. Instala la extensión **Live Server** de VS Code.
2. Abre la carpeta del proyecto en VS Code.
3. Haz clic en el botón **"Go Live"** en la esquina inferior derecha.

### Opción C (Uso Offline / Sin Servidor)
Si abres `index.html` sin servidor:
1. La interfaz se iniciará en modo seguro y mostrará capturas de pantalla de alta fidelidad.
2. Para activar el visor 3D interactivo real de inmediato, simplemente arrastra y suelta el archivo `assets/models/rueltaTexturas.glb` dentro del recuadro punteado en el centro de la pantalla. El cargador local procesará el archivo binario instantáneamente en memoria.

---

## 🤵 Créditos del Proyecto
*   **Institución**: Trabajo Final de Visualización Académica.
*   **Temática**: Ingeniería de la Suerte (Ruleta de Casino - Componentes, Telemetría e Interacción 3D).
