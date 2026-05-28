# 🎰 Ingeniería de la Suerte

<div align="center">
  <img src="assets/images/Imagen explicativa.png" alt="Ingeniería de la Suerte" width="800" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); border: 2px solid rgba(212, 175, 55, 0.4); margin-bottom: 20px;" />

  [![Ver Sitio en Vivo](https://img.shields.io/badge/Vercel-Desplegado-black?style=for-the-badge&logo=vercel&logoColor=white&color=0A4A2F)](https://ingenieria-de-la-suerte.vercel.app/)
</div>

---

## 🎯 ¿Qué es este proyecto?

**Ingeniería de la Suerte** es una aplicación web interactiva diseñada bajo un concepto visual de **HUD (Head-Up Display) de Casino Premium**. El proyecto tiene como propósito analizar, deconstruir y explicar el funcionamiento mecánico y físico de una ruleta de casino tradicional desde una perspectiva técnica y estética.

La aplicación utiliza una paleta de colores sofisticada —**Verde Esmeralda Deep (#0A4A2F)**, **Dorado Metálico (#D4AF37)** y **Negro Obsidiana (#111111)**— para presentar una interfaz interactiva de alta precisión en tiempo real dividida en tres módulos:

1.  **🔍 Inspección 3D (Visor Three.js)**: Permite examinar el modelo 3D de la ruleta mediante vistas técnicas como vista general, corte transversal de piezas, diagrama explotado (despiece vertical), transparencias y zoom de detalle. Incluye fichas de telemetría interactiva al tocar los componentes.
2.  **📊 Análisis de Datos (Telemetría)**: Un dashboard estadístico que grafica el comportamiento, colores y números calientes/fríos utilizando **Chart.js** para emular el estudio de la aleatoriedad física de los giros.
3.  **🗺️ Mapa Interactivo**: Un visor geográfico plano en 3D que ilustra la distribución de casinos y terminales físicas de ruleta en el área metropolitana de Medellín.

---

## 📁 ¿Qué se hizo para organizar el repositorio?

El repositorio fue reestructurado por completo para eliminar la acumulación de archivos sueltos en el directorio raíz, logrando una arquitectura de software limpia y profesional. Se implementaron los siguientes cambios:

*   **Segmentación de Archivos y Carpetas**:
    *   **`docs/`**: Se centralizó toda la documentación académica, guiones de diseño, planes de trabajo y presentaciones (`.docx`, `.pptx`, `.pdf`, `.md`).
    *   **`assets/models/`**: Se agruparon de manera ordenada todos los modelos 3D y archivos nativos de diseño en Blender (`.fbx`, `.glb`, `.blend`, `.blend1`) de gran tamaño.
    *   **`assets/images/`**: Se reubicaron las capturas del simulador (`imagenes pantallas/`) y la infografía principal (`Imagen explicativa.png`).
*   **Actualización de Rutas Relativas**: 
    *   Se modificaron quirúrgicamente los archivos de código fuente (`index.html`, `debug_model.html`, `views/3d.html` y las presentaciones interactivas de Reveal.js) para reajustar las referencias internas de los modelos y capturas. Esto asegura que el visor 3D en Three.js y los marcadores de posición carguen con total normalidad desde sus nuevas carpetas.
