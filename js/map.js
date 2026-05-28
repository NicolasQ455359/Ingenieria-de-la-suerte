// ============================================================
// MAP DATA — Casino locations, stories, and financial data
// Routes updated to follow street grid with right-angle turns
// ============================================================

const CASINOS_DATA = [
    { name: "Casino Hollywood – Milla de Oro", px: 0.505, py: 0.770, route: [], icon: "slot" },
    { name: "Casino Río Medellín", px: 0.540, py: 0.470,
      route: [
        {px:0.505,py:0.770}, {px:0.505,py:0.720}, {px:0.505,py:0.670},
        {px:0.505,py:0.600}, {px:0.505,py:0.530}, {px:0.505,py:0.470},
        {px:0.540,py:0.470}
      ], icon: "chart_up" },
    { name: "Casino Broadway Unicentro", px: 0.420, py: 0.430,
      route: [
        {px:0.540,py:0.470}, {px:0.540,py:0.430}, {px:0.505,py:0.430},
        {px:0.470,py:0.430}, {px:0.445,py:0.430}, {px:0.420,py:0.430}
      ], icon: "explosion" },
    { name: "Casino Broadway 70", px: 0.400, py: 0.335,
      route: [
        {px:0.420,py:0.430}, {px:0.400,py:0.430}, {px:0.400,py:0.400},
        {px:0.400,py:0.370}, {px:0.400,py:0.335}
      ], icon: "star" },
    { name: "Casino Broadway 80", px: 0.380, py: 0.270,
      route: [
        {px:0.400,py:0.335}, {px:0.380,py:0.335}, {px:0.380,py:0.310},
        {px:0.380,py:0.290}, {px:0.380,py:0.270}
      ], icon: "chart_down" },
    { name: "Casino Elite Class", px: 0.435, py: 0.450,
      route: [
        {px:0.380,py:0.270}, {px:0.435,py:0.270}, {px:0.435,py:0.335},
        {px:0.435,py:0.390}, {px:0.435,py:0.420}, {px:0.435,py:0.450}
      ], icon: "skull" }
];

const STORIES = [
    "Enero de 2025: Samuel regresa a un casino con su amigo. Sin mayor expectativa juegan ruleta física y tienen una ganancia de $1.500.000, motivo de orgullo en redes.",
    "Jerónimo lo contacta. Crean el sistema de 'doblar al perder' apostando a un color. La táctica rinde frutos, dejándolos confiados y ganando $3.000.000 esa noche.",
    "La ilusión se rompe a pedazos. Jerónimo apuesta a escondidas $10 millones de su negocio familiar. La noche huele a ruina y terminan perdiendo el 100% del dinero.",
    "Cambian y apuestan por sectores, de pronto ocurre el milagro: ¡Empieza la racha de oro! Se recuperan en Broadway 70 y el dinero se dispara meteóricamente hasta 22 millones.",
    "La avaricia despierta; necesitaban 30... y llegó la caída. Las pérdidas golpean repetidamente. Deciden frenar y escapan a las 4 a.m., desplomándose a la mitad del fondo.",
    "Regresan a recuperar todo un sábado en la mañana. El esfuerzo es inútil y los bolsillos quedan vacíos. Jerónimo confiesa a sus padres. La historia se corta de tajo a $0."
];

const MONEY_DATA = [1500000, 3000000, 0, 22000000, 15000000, 0];
