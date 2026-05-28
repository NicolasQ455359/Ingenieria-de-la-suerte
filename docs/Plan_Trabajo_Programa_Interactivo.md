# Plan de trabajo: programa interactivo para la infografia

## Objetivo general
Transformar la propuesta actual en diapositivas en un programa interactivo ejecutable en navegador, donde la ruleta se explique por capas, vistas y piezas, sin depender por ahora de un modelo 3D real.

## Enfoque recomendado
En lugar de construir un visor 3D completo, se recomienda crear un simulador visual 2.5D:

- Usa la `Imagen explicativa.png` como base tecnica principal.
- Usa las `pantalla 1-5.png` como referencia de interfaz.
- Convierte la logica de presentacion en una experiencia navegable con botones, panel lateral, estados visuales y animaciones.

Esto permite entregar un "programa" funcional, defendible y visualmente solido sin bloquearse por la ausencia de modelos 3D.

## Producto final esperado
Una aplicacion web local que abra en pantalla completa y permita:

- Ver la ruleta en modo general.
- Cambiar entre vistas: externa, corte, despiece y detalle.
- Activar etiquetas de piezas.
- Mostrar fichas tecnicas por componente.
- Simular animaciones de separacion de piezas, enfoque y resalte.
- Navegar como si fuera un software expositivo, no una presentacion de diapositivas.

## Fases de trabajo

### Fase 1. Definicion del alcance
Objetivo: cerrar exactamente que funciones tendra la primera version.

Tareas:
- Definir que el programa no sera 3D real en esta entrega.
- Fijar 4 vistas principales: general, despiece, corte y detalle.
- Definir si se trabajara en una sola pantalla con panel lateral o en varias escenas.
- Establecer el mensaje narrativo central: "la ruleta como sistema de ingenieria de precision".

Entregable:
- Lista cerrada de modulos y pantallas del programa.

### Fase 2. Arquitectura del contenido
Objetivo: transformar la imagen explicativa en contenido interactivo.

Tareas:
- Separar la ruleta en componentes: vidrio, taza, disco, eje, separadores, rodamientos, base y bola.
- Escribir una ficha breve por pieza:
  - nombre
  - material
  - funcion
  - relacion con el sistema
- Agrupar la informacion por niveles:
  - estructura externa
  - mecanica interna
  - superficie de juego

Entregable:
- Base de datos simple en JSON o JavaScript con todas las piezas.

### Fase 3. Diseno del programa
Objetivo: pasar del wireframe al formato de software interactivo.

Tareas:
- Mantener la identidad visual ya definida:
  - verde esmeralda
  - dorado metalico
  - rojo tecnico
  - negro obsidiana
- Convertir el HUD de las diapositivas en una interfaz persistente.
- Diseñar estas zonas:
  - area central de visualizacion
  - barra lateral de controles
  - panel inferior o lateral de notas tecnicas
  - encabezado con titulo del modo actual

Entregable:
- Maqueta final de una sola interfaz principal.

### Fase 4. Prototipo visual sin 3D
Objetivo: resolver la ausencia del modelo 3D con recursos visuales creibles.

Tareas:
- Recortar o reinterpretar la `Imagen explicativa.png` en capas.
- Crear versiones visuales para cada estado:
  - vista completa
  - vista explotada
  - vista con etiquetas
  - zoom de detalle
- Simular profundidad con:
  - escalado
  - sombras
  - desplazamiento vertical
  - opacidad

Entregable:
- Set de imagenes o capas listas para animarse en HTML/CSS.

### Fase 5. Desarrollo del programa
Objetivo: construir la experiencia interactiva.

Tareas:
- Crear la estructura base en HTML, CSS y JavaScript.
- Reemplazar la logica de diapositivas por estados de interfaz.
- Implementar botones como:
  - Vista general
  - Corte
  - Despiece
  - Materiales
  - Detalle
- Hacer que cada boton:
  - cambie la visualizacion
  - actualice el panel tecnico
  - resalte partes concretas

Entregable:
- Primera version funcional del programa.

### Fase 6. Animacion e interaccion
Objetivo: dar sensacion de software tecnico premium.

Tareas:
- Animar apertura de paneles.
- Aplicar transiciones suaves entre modos.
- Resaltar piezas al pasar el cursor o hacer clic.
- Crear una animacion de despiece vertical.
- Simular enfoque tecnico con zoom o acercamientos.

Entregable:
- Prototipo interactivo pulido.

### Fase 7. Pruebas y ajuste
Objetivo: asegurar que el programa se pueda mostrar sin fallos.

Tareas:
- Probar lectura de textos y contraste visual.
- Revisar que las transiciones no sean lentas.
- Ajustar resolucion para portatil y pantalla de presentacion.
- Verificar que pueda abrirse localmente sin instalar nada complejo.

Entregable:
- Version lista para exposicion.

## Orden de prioridad
Si el tiempo es corto, este seria el orden ideal:

1. Crear una sola pantalla principal en vez de varias.
2. Montar la imagen explicativa como base visual.
3. Activar botones con cambio de informacion.
4. Simular despiece y zoom con animaciones.
5. Pulir estilo visual y transiciones.

## Riesgos y solucion

### Riesgo 1: no hay modelo 3D
Solucion:
- plantear el proyecto como una interfaz explicativa interactiva de tipo tecnico
- usar capas 2D animadas como reemplazo valido del 3D

### Riesgo 2: demasiado contenido tecnico para una sola vista
Solucion:
- dividir por modos
- mostrar solo la informacion relevante en cada estado

### Riesgo 3: que siga pareciendo una presentacion
Solucion:
- eliminar la navegacion por diapositivas
- dejar una interfaz fija con paneles y controles persistentes

## Recomendacion tecnica
La mejor ruta para esta entrega es:

- HTML + CSS + JavaScript
- programa local que se abre en navegador
- interfaz estilo dashboard/HUD
- animaciones 2D de capas en lugar de 3D real

No recomiendo invertir tiempo ahora en Blender, Three.js o modelado completo, porque te arriesga el cronograma y no es necesario para demostrar la idea.

## Siguiente paso ideal
Construir un MVP con estas 4 funciones:

1. Pantalla principal con la ruleta centrada.
2. Botones laterales para cambiar entre 4 vistas.
3. Panel tecnico dinamico por pieza o modo.
4. Animacion simple de despiece y resaltado.

Con eso ya tendrias un "programa" defendible, funcional y mucho mas fuerte que una presentacion.
