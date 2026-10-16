// Contenido educativo y datos de ejemplo de la demo (bilingüe es/en).
// Los comercios, vecinos y cortes de agua son ficticios.

export const MISSIONS = [
  {
    id: 'm1',
    kind: 'shower',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Duchas de 5 minutos',
      tip: 'Una regadera convencional entrega entre 8 y 12 litros por minuto. Pasar de 10 a 5 minutos ahorra entre 40 y 60 litros por ducha.',
      q: '¿Cuánto puedes ahorrar si reduces tu ducha de 10 a 5 minutos?',
      options: ['Casi nada', 'Entre 40 y 60 litros', 'Más de 500 litros'],
      explain: 'Cada minuto menos son unos 8-12 litros que no bajan por el desagüe.',
      action: 'Pon un temporizador de 5 minutos en tu próxima ducha.',
    },
    en: {
      title: '5-minute showers',
      tip: 'A standard showerhead delivers 8 to 12 litres per minute. Going from 10 to 5 minutes saves 40 to 60 litres per shower.',
      q: 'How much can you save by cutting a shower from 10 to 5 minutes?',
      options: ['Almost nothing', 'Between 40 and 60 litres', 'More than 500 litres'],
      explain: 'Every minute you cut is about 8-12 litres that never reach the drain.',
      action: 'Set a 5-minute timer for your next shower.',
    },
    correct: 1,
  },
  {
    id: 'm2',
    kind: 'tooth',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Cierra la llave al cepillarte',
      tip: 'Con la llave abierta, cepillarte los dientes dos minutos puede gastar unos 10 litros. Con un vaso, bastan 1 o 2.',
      q: '¿Cuándo conviene abrir la llave al cepillarte?',
      options: ['Todo el tiempo', 'Solo para mojar y enjuagar', 'Nunca te cepilles'],
      explain: 'Abrirla solo para mojar el cepillo y enjuagar reduce el gasto a una fracción.',
      action: 'Cepíllate con un vaso de agua hoy.',
    },
    en: {
      title: 'Turn off the tap when brushing',
      tip: 'With the tap running, two minutes of brushing can use about 10 litres. With a glass of water, 1 or 2 is enough.',
      q: 'When should you open the tap while brushing?',
      options: ['The whole time', 'Only to wet and rinse', 'Never brush'],
      explain: 'Opening it only to wet the brush and rinse cuts the use to a fraction.',
      action: 'Brush with a glass of water today.',
    },
    correct: 1,
  },
  {
    id: 'm3',
    kind: 'toilet',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Caza fugas en el inodoro',
      tip: 'Una fuga silenciosa en el inodoro puede desperdiciar más de 100 litros al día sin que lo notes. Se detecta con unas gotas de colorante en el tanque.',
      q: '¿Cómo detectas una fuga silenciosa en el inodoro?',
      options: ['Colorante en el tanque, sin descargar', 'Escuchando la tubería', 'No se puede detectar'],
      explain: 'Si el color aparece en la taza sin descargar, hay fuga en la válvula.',
      action: 'Haz la prueba del colorante esta noche.',
    },
    en: {
      title: 'Hunt toilet leaks',
      tip: 'A silent toilet leak can waste over 100 litres a day without you noticing. A few drops of dye in the tank reveal it.',
      q: 'How do you detect a silent toilet leak?',
      options: ['Dye in the tank, without flushing', 'Listening to the pipes', 'It cannot be detected'],
      explain: 'If the colour shows up in the bowl without flushing, the valve is leaking.',
      action: 'Do the dye test tonight.',
    },
    correct: 0,
  },
  {
    id: 'm4',
    kind: 'dishes',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Platos sin chorro continuo',
      tip: 'Enjabona con la llave cerrada y enjuaga todo junto. Lavar con el chorro abierto puede gastar varias veces más agua.',
      q: '¿Cuál es la forma más eficiente de lavar los platos?',
      options: ['Chorro abierto todo el tiempo', 'Enjabonar con la llave cerrada y enjuagar junto', 'Lavar cada plato por separado'],
      explain: 'Concentrar el enjuague en un solo momento reduce el tiempo con la llave abierta.',
      action: 'Lava los platos de hoy con la llave cerrada mientras enjabonas.',
    },
    en: {
      title: 'Dishes without a running tap',
      tip: 'Soap up with the tap off and rinse everything together. Washing with the tap running can use several times more water.',
      q: 'What is the most efficient way to wash dishes?',
      options: ['Tap running the whole time', 'Soap with the tap off, rinse together', 'Wash each dish separately'],
      explain: 'Concentrating the rinse in one go reduces the time the tap is open.',
      action: "Wash today's dishes with the tap off while you soap.",
    },
    correct: 1,
  },
  {
    id: 'm5',
    kind: 'washer',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Lavadora con carga completa',
      tip: 'La lavadora gasta casi lo mismo con media carga que con carga completa. Esperar a llenarla reduce el número de ciclos por semana.',
      q: '¿Por qué conviene lavar con carga completa?',
      options: ['Gasta menos agua por prenda', 'Lava mejor siempre', 'No hay diferencia'],
      explain: 'El ciclo consume agua parecida; menos ciclos significan menos litros.',
      action: 'Espera a llenar la lavadora antes de usarla.',
    },
    en: {
      title: 'Full washing machine loads',
      tip: 'A washer uses almost the same water for a half load as for a full one. Waiting until it is full reduces cycles per week.',
      q: 'Why wash with a full load?',
      options: ['Less water per garment', 'It always cleans better', 'No difference'],
      explain: 'A cycle uses similar water; fewer cycles mean fewer litres.',
      action: 'Wait until the washer is full before running it.',
    },
    correct: 0,
  },
  {
    id: 'm6',
    kind: 'reuse',
    xp: 20,
    gotas: 10,
    es: {
      title: 'Reutiliza el agua',
      tip: 'El agua del último enjuague o de la lluvia sirve para trapear, regar plantas o llenar el tanque del inodoro.',
      q: '¿Para qué sirve el agua de enjuague de la ropa?',
      options: ['Para beber', 'Para trapear o descargar el inodoro', 'Debe botarse siempre'],
      explain: 'No necesita ser potable para estos usos.',
      action: 'Guarda un balde con agua de enjuague para trapear.',
    },
    en: {
      title: 'Reuse water',
      tip: 'Water from the last rinse or from rain works for mopping, watering plants or refilling the toilet tank.',
      q: 'What is laundry rinse water good for?',
      options: ['Drinking', 'Mopping or flushing the toilet', 'It must always be thrown away'],
      explain: 'It does not need to be drinkable for these uses.',
      action: 'Keep a bucket of rinse water for mopping.',
    },
    correct: 1,
  },
  {
    id: 'm7',
    kind: 'garden',
    xp: 25,
    gotas: 12,
    es: {
      title: 'Riega a la hora correcta',
      tip: 'Regar temprano en la mañana o al atardecer reduce la evaporación. Al mediodía gran parte del agua se pierde antes de llegar a la raíz.',
      q: '¿Cuándo es mejor regar las plantas?',
      options: ['Al mediodía', 'Temprano o al atardecer', 'Da igual'],
      explain: 'Con menos sol y calor, la planta aprovecha más agua.',
      action: 'Programa el riego antes de las 8 a. m. o después de las 5 p. m.',
    },
    en: {
      title: 'Water at the right time',
      tip: 'Watering early in the morning or at dusk reduces evaporation. At midday much of the water is lost before reaching the roots.',
      q: 'When is the best time to water plants?',
      options: ['At midday', 'Early or at dusk', 'It does not matter'],
      explain: 'With less sun and heat, the plant makes better use of the water.',
      action: 'Schedule watering before 8 a.m. or after 5 p.m.',
    },
    correct: 1,
  },
  {
    id: 'm8',
    kind: 'meter',
    xp: 25,
    gotas: 12,
    es: {
      title: 'Lee tu contador',
      tip: 'Cierra todas las llaves y mira el medidor: si sigue girando, hay una fuga en algún punto de la vivienda.',
      q: 'Con todas las llaves cerradas, el medidor sigue avanzando. ¿Qué significa?',
      options: ['Es normal', 'Hay una fuga', 'El medidor está dañado siempre'],
      explain: 'Sin consumo, el medidor debería quedarse quieto.',
      action: 'Anota la lectura antes de dormir y compárala al despertar.',
    },
    en: {
      title: 'Read your meter',
      tip: 'Close every tap and watch the meter: if it keeps turning, there is a leak somewhere in the home.',
      q: 'With every tap closed, the meter keeps moving. What does that mean?',
      options: ['It is normal', 'There is a leak', 'The meter is always broken'],
      explain: 'With no use, the meter should stay still.',
      action: 'Write down the reading before bed and compare it in the morning.',
    },
    correct: 1,
  },
  {
    id: 'm9',
    kind: 'tank',
    xp: 25,
    gotas: 12,
    es: {
      title: 'Prepárate para un corte',
      tip: 'Antes de un racionamiento, almacena agua en recipientes limpios y tapados, y lava el tanque con regularidad.',
      q: '¿Cómo almacenar agua para un corte programado?',
      options: ['En recipientes limpios y tapados', 'En cualquier balde destapado', 'No hace falta guardar'],
      explain: 'Tapar evita contaminación y la proliferación de mosquitos.',
      action: 'Revisa tu próximo corte en la pestaña Novedades.',
    },
    en: {
      title: 'Get ready for a cut',
      tip: 'Before rationing, store water in clean, covered containers and wash the tank regularly.',
      q: 'How do you store water for a scheduled cut?',
      options: ['In clean, covered containers', 'In any open bucket', 'No need to store'],
      explain: 'Covering prevents contamination and mosquito breeding.',
      action: 'Check your next cut in the News tab.',
    },
    correct: 0,
  },
  {
    id: 'm10',
    kind: 'aerator',
    xp: 25,
    gotas: 12,
    es: {
      title: 'Aireadores en las llaves',
      tip: 'Los aireadores mezclan aire con el agua y reducen el caudal sin que se note la diferencia al lavarte las manos.',
      q: '¿Qué hace un aireador?',
      options: ['Calienta el agua', 'Reduce el caudal sin perder comodidad', 'Filtra el agua para beber'],
      explain: 'Menos caudal por minuto significa menos litros por uso.',
      action: 'Mira en la Tienda el kit de aireadores.',
    },
    en: {
      title: 'Tap aerators',
      tip: 'Aerators mix air into the water and reduce flow without a noticeable difference when washing your hands.',
      q: 'What does an aerator do?',
      options: ['Heats the water', 'Reduces flow without losing comfort', 'Filters drinking water'],
      explain: 'Less flow per minute means fewer litres per use.',
      action: 'Look at the aerator kit in the Store.',
    },
    correct: 1,
  },
  {
    id: 'm11',
    kind: 'community',
    xp: 30,
    gotas: 15,
    es: {
      title: 'Reta a tu cuadra',
      tip: 'Los hábitos se contagian: cuando los vecinos comparan su consumo, el ahorro del grupo sube más que el de cada hogar por separado.',
      q: '¿Qué hace que un reto vecinal funcione mejor?',
      options: ['Competir sin ver resultados', 'Ver el avance de la cuadra y celebrar logros', 'Hacerlo en secreto'],
      explain: 'La visibilidad y el reconocimiento mantienen la motivación.',
      action: 'Comparte el ranking de tu cuadra con un vecino.',
    },
    en: {
      title: 'Challenge your block',
      tip: 'Habits are contagious: when neighbours compare consumption, the group saves more than each home alone.',
      q: 'What makes a neighbourhood challenge work better?',
      options: ['Competing without seeing results', 'Seeing block progress and celebrating wins', 'Doing it in secret'],
      explain: 'Visibility and recognition keep motivation up.',
      action: "Share your block's ranking with a neighbour.",
    },
    correct: 1,
  },
  {
    id: 'm12',
    kind: 'trophy',
    xp: 50,
    gotas: 30,
    es: {
      title: 'Reto: 7 días bajo la meta',
      tip: 'Mantén tu consumo diario por debajo de la meta de tu hogar durante una semana seguida para convertirte en Guardián del agua.',
      q: '¿Qué se necesita para el reto final?',
      options: ['Consumo bajo la meta 7 días seguidos', 'Cerrar todas las llaves', 'Comprar un filtro'],
      explain: 'La constancia es lo que cambia el hábito.',
      action: 'Sigue tu avance en el panel de consumo.',
    },
    en: {
      title: 'Challenge: 7 days under the goal',
      tip: "Keep your daily use under your home's goal for a full week to become a Water Guardian.",
      q: 'What is needed for the final challenge?',
      options: ['Use under the goal 7 days in a row', 'Close every tap', 'Buy a filter'],
      explain: 'Consistency is what changes the habit.',
      action: 'Track your progress in the consumption panel.',
    },
    correct: 0,
  },
]

export const TIPS = [
  { es: 'Cierra la llave mientras te enjabonas o te cepillas.', en: 'Turn off the tap while you soap up or brush.' },
  { es: 'Revisa el medidor de noche: si se mueve, tienes una fuga.', en: 'Check the meter at night: if it moves, you have a leak.' },
  { es: 'Usa un balde para trapear en lugar de la manguera.', en: 'Use a bucket to mop instead of a hose.' },
  { es: 'Instala aireadores: menos caudal, misma comodidad.', en: 'Install aerators: less flow, same comfort.' },
  { es: 'Riega temprano o al atardecer para evitar la evaporación.', en: 'Water early or at dusk to avoid evaporation.' },
  { es: 'Lava la ropa con carga completa y reutiliza el último enjuague.', en: 'Wash full loads and reuse the last rinse.' },
]

export const SHOP = [
  { id: 'super', cost: 120, icon: 'cart', es: { title: 'Bono $10.000', shop: 'Supermercado Verdi (ficticio)', desc: 'Válido en compras desde $50.000.' }, en: { title: '$10,000 voucher', shop: 'Verdi Market (fictional)', desc: 'Valid on purchases over $50,000.' } },
  { id: 'ferre', cost: 200, icon: 'wrench', es: { title: '15 % en griferías ahorradoras', shop: 'Ferretería AguaFix (ficticia)', desc: 'Incluye aireadores y reguladores.' }, en: { title: '15% off water-saving taps', shop: 'AguaFix Hardware (fictional)', desc: 'Includes aerators and flow limiters.' } },
  { id: 'cafe', cost: 80, icon: 'coffee', es: { title: 'Café 2x1', shop: 'Café Planeta (ficticio)', desc: 'Canjeable de lunes a viernes.' }, en: { title: 'Coffee 2-for-1', shop: 'Café Planeta (fictional)', desc: 'Redeemable Monday to Friday.' } },
  { id: 'kit', cost: 300, icon: 'gift', es: { title: 'Kit ahorrador', shop: 'F-Planet', desc: '2 aireadores + temporizador de ducha.' }, en: { title: 'Saver kit', shop: 'F-Planet', desc: '2 aerators + shower timer.' } },
  { id: 'arbol', cost: 150, icon: 'tree', es: { title: 'Planta un árbol', shop: 'Aliado ambiental (ficticio)', desc: 'Se planta en tu nombre en una cuenca local.' }, en: { title: 'Plant a tree', shop: 'Environmental partner (fictional)', desc: 'Planted in your name in a local watershed.' } },
  { id: 'cine', cost: 220, icon: 'ticket', es: { title: 'Entrada de cine', shop: 'Cine Aurora (ficticio)', desc: 'Función general, de lunes a jueves.' }, en: { title: 'Cinema ticket', shop: 'Aurora Cinema (fictional)', desc: 'General screening, Monday to Thursday.' } },
]

export const ACHIEVEMENTS = [
  { id: 'first-mission', icon: 'leaf', es: { t: 'Primera gota', d: 'Completaste tu primera misión.' }, en: { t: 'First drop', d: 'You completed your first mission.' } },
  { id: 'streak-3', icon: 'flame', es: { t: 'Racha de 3', d: 'Tres días seguidos aprendiendo.' }, en: { t: '3-day streak', d: 'Three days in a row learning.' } },
  { id: 'half-path', icon: 'map', es: { t: 'Mitad del camino', d: '6 misiones completadas.' }, en: { t: 'Halfway there', d: '6 missions completed.' } },
  { id: 'guardian', icon: 'shield', es: { t: 'Guardián del agua', d: 'Completaste las 12 misiones.' }, en: { t: 'Water Guardian', d: 'You completed all 12 missions.' } },
]

// Vecinos y cuadras de la comunidad (ficticios). xp semanal.
export const NEIGHBORS = [
  { name: 'Sofía R.', xp: 410, avatar: 'b' },
  { name: 'Mateo G.', xp: 365, avatar: 'c' },
  { name: 'Valentina P.', xp: 290, avatar: 'd' },
  { name: 'Julián M.', xp: 255, avatar: 'e' },
  { name: 'Daniela T.', xp: 220, avatar: 'f' },
  { name: 'Andrés C.', xp: 160, avatar: 'g' },
  { name: 'Laura V.', xp: 120, avatar: 'h' },
]

export const BLOCKS = [
  { id: 1, ahorro: 14.8 },
  { id: 2, ahorro: 12.1 },
  { id: 3, ahorro: 11.4 },
  { id: 4, ahorro: 10.2 },
  { id: 5, ahorro: 9.7 },
  { id: 6, ahorro: 8.3 },
  { id: 7, ahorro: 6.9 },
  { id: 8, ahorro: 4.2 },
]

// Cortes programados (ilustrativos): 9 sectores, un turno cada 9 días.
export const SECTORS = 9
export const MY_SECTOR = 4
export function getCuts(now = new Date(), count = 9) {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const cuts = []
  for (let s = 1; s <= SECTORS; s++) {
    const first = ((s - MY_SECTOR + SECTORS) % SECTORS) + 2 // un sector por día; el tuyo, en 2 días
    const start = new Date(base.getTime() + first * 86400000)
    start.setHours(8, 0, 0, 0)
    cuts.push({ sector: s, start, end: new Date(start.getTime() + 24 * 3600000), mine: s === MY_SECTOR })
  }
  return cuts.sort((a, b) => a.start - b.start).slice(0, count)
}

export const NEWS = [
  {
    id: 'n1',
    daysAgo: 0,
    es: { t: 'Nuevo: alertas de fuga nocturna', d: 'Si una llave registra flujo entre la 1 y las 4 a. m. durante varias noches, te avisamos para que revises la instalación.' },
    en: { t: 'New: overnight leak alerts', d: 'If a fixture shows flow between 1 and 4 a.m. for several nights, we alert you to check the plumbing.' },
  },
  {
    id: 'n2',
    daysAgo: 2,
    es: { t: 'Racionamiento por sectores: ¿cómo prepararte?', d: 'Guarda agua en recipientes tapados, ten linternas a mano y programa lavadoras y duchas antes del corte.' },
    en: { t: 'Sector rationing: how to prepare', d: 'Store water in covered containers, keep a flashlight handy and schedule washing and showers before the cut.' },
  },
  {
    id: 'n3',
    daysAgo: 4,
    es: { t: 'Reto de la cuadra: baja 10 % esta semana', d: 'Las cuadras que más reduzcan su consumo suben en el ranking y desbloquean premios comunitarios.' },
    en: { t: 'Block challenge: cut 10% this week', d: 'Blocks that reduce consumption the most climb the ranking and unlock community rewards.' },
  },
  {
    id: 'n4',
    daysAgo: 7,
    es: { t: 'Aprovecha el agua lluvia', d: 'Un balde bajo la bajante recoge agua suficiente para trapear o regar tus plantas.' },
    en: { t: 'Make use of rainwater', d: 'A bucket under the downspout collects enough water to mop or water your plants.' },
  },
]
