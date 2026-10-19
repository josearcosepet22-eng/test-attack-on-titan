/**
 * Attack on Titan (Shingeki no Kyojin) - Base de preguntas temáticas
 * Cada opción otorga ponderaciones multi-personaje acordes a los dilemas del universo de Isayama.
 * Cada pregunta incluye un banner cinemático temático para enriquecer la inmersión visual.
 */

export const QUESTIONS = [
  {
    id: 1,
    category: "Filosofía de Vida y Libertad",
    scenarioTitle: "La Sombra de las Murallas y el Anhelo del Exterior",
    banner: "/images/wall_sunset.jpg",
    question: "Si hubieras nacido confinado tras las gigantescas murallas, ¿cuál sería tu mayor anhelo?",
    options: [
      {
        letter: "A",
        text: "Ver con mis propios ojos el mar, los desiertos ardientes y los campos de hielo más allá del confinamiento.",
        scores: { armin: 3, eren: 2, hange: 1 },
        rationale: "Curiosidad intelectual y deseo de conocer el mundo exterior."
      },
      {
        letter: "B",
        text: "Destruir a todo aquel que intente arrebatarme mi derecho de nacimiento a ser libre.",
        scores: { eren: 3, mikasa: 1, levi: 1 },
        rationale: "Furia contra la opresión y voluntad de romper cadenas."
      },
      {
        letter: "C",
        text: "Asegurar que las personas que amo permanezcan con vida, sin importar de qué lado de la muralla estemos.",
        scores: { mikasa: 3, reiner: 2, sasha: 1 },
        rationale: "Instinto protector hacia los vínculos cercanos."
      },
      {
        letter: "D",
        text: "Comprender la verdad oculta: ¿por qué existen los titanes y qué nos ocultan los gobernantes?",
        scores: { hange: 3, erwin: 2, armin: 1 },
        rationale: "Búsqueda científica y desvelo de conspiraciones."
      }
    ]
  },
  {
    id: 2,
    category: "Liderazgo y Sacrificio en Combate",
    scenarioTitle: "La Carga de Caballería y las Bengala de Humo",
    banner: "/images/cavalry_charge.jpg",
    question: "En una emboscada fatal, solo una carga suicida puede abrir una brecha para que la humanidad gane tiempo. ¿Cómo procedes?",
    options: [
      {
        letter: "A",
        text: "Asumo el mando, cabalgo al frente de la formación y doy la orden de avanzar sin vacilar.",
        scores: { erwin: 3, eren: 1, levi: 1 },
        rationale: "Liderazgo carismático dispuesto al costo absoluto."
      },
      {
        letter: "B",
        text: "Me niego a rendirme ciegamente; busco de inmediato una variable oculta o maniobra de flanco que salve al mayor número de soldados.",
        scores: { armin: 3, hange: 2, sasha: 1 },
        rationale: "Pensamiento estratégico y táctica lateral."
      },
      {
        letter: "C",
        text: "Si la orden está dada, ejecuto mi deber con letal frialdad y me aseguro de que el sacrificio de mis camaradas no sea en vano.",
        scores: { levi: 3, mikasa: 2, reiner: 1 },
        rationale: "Disciplina implacable y honor militar."
      },
      {
        letter: "D",
        text: "Pongo mi propio cuerpo como escudo frontal para que los reclutas más jóvenes puedan replegarse.",
        scores: { reiner: 3, mikasa: 1, sasha: 1 },
        rationale: "Vocación de guardián y escudo fraternal."
      }
    ]
  },
  {
    id: 3,
    category: "Gestión de la Información y la Verdad",
    scenarioTitle: "El Misterio del Sótano y el Origen de los Titanes",
    banner: "/images/hange.jpg",
    question: "Capturas vivo a un enemigo portador de secretos cruciales sobre el origen de los titanes. ¿Qué método aplicas?",
    options: [
      {
        letter: "A",
        text: "Diseño experimentos científicos y lo examino minuciosamente con curiosidad y respeto por los datos biológicos.",
        scores: { hange: 3, armin: 1 },
        rationale: "Enfoque empírico de investigación y descubrimiento."
      },
      {
        letter: "B",
        text: "Interrogatorio directo, seco e implacable. Sin rodeos, sin tortura innecesaria, solo la información vital antes del anochecer.",
        scores: { levi: 3, erwin: 2 },
        rationale: "Eficiencia táctica y control psicológico."
      },
      {
        letter: "C",
        text: "Intento dialogar con él; quiero saber qué ideología o sufrimiento lo llevó a considerarnos demonios.",
        scores: { armin: 3, reiner: 2, sasha: 1 },
        rationale: "Empatía reflexiva y mediación dialógica."
      },
      {
        letter: "D",
        text: "Le dejo claro que si tocó a un solo inocente de nuestra gente, su castigo será implacable y ejemplar.",
        scores: { eren: 3, mikasa: 2 },
        rationale: "Retribución moral y justicia vehemente."
      }
    ]
  },
  {
    id: 4,
    category: "Reacción ante el Pánico Colectivo",
    scenarioTitle: "Alarma Roja: Invasión Inesperada en el Distrito",
    banner: "/images/forest_battle.jpg",
    question: "Una campana de emergencia resuena: una horda de titanes anómalos invadió el distrito comercial. ¿Cuál es tu primera acción?",
    options: [
      {
        letter: "A",
        text: "Desenfundar las cuchillas de acero ultraduro y lanzarme al corte de nucas al instante para proteger a la retaguardia.",
        scores: { mikasa: 3, levi: 2, eren: 1 },
        rationale: "Respuesta de combate inmediata y reflejos de élite."
      },
      {
        letter: "B",
        text: "Subir a la torre más alta, evaluar los patrones de viento y desplazamiento, y coordinar señales de bengala de colores.",
        scores: { armin: 3, erwin: 2, hange: 1 },
        rationale: "Control del teatro de operaciones y visión general."
      },
      {
        letter: "C",
        text: "Guiar a los civiles desorientados hacia las compuertas internas y repartir raciones o munición sin perder la calma.",
        scores: { sasha: 3, reiner: 2, mikasa: 1 },
        rationale: "Auxilio directo a las personas y conexión comunitaria."
      },
      {
        letter: "D",
        text: "Canalizar mi furia en fuerza de combate, convencido de que ni una sola de esas bestias saldrá con vida.",
        scores: { eren: 3, levi: 1, erwin: 1 },
        rationale: "Furia combativa canalizada."
      }
    ]
  },
  {
    id: 5,
    category: "Vínculos Afectivos y Moral de Equipo",
    scenarioTitle: "La Fogata Nocturna Previa a la Expedición 57",
    banner: "/images/night_camp.jpg",
    question: "En una noche gélida previa a la expedición número 57, ¿cómo pasas tus últimas horas en el campamento?",
    options: [
      {
        letter: "A",
        text: "Compartiendo risas, asando comida robada de la despensa y recordando de dónde venimos para no perder el espíritu.",
        scores: { sasha: 3, reiner: 1, armin: 1 },
        rationale: "Calor humano, humor y necesidad de compartir la vida cotidiana."
      },
      {
        letter: "B",
        text: "A solas o con mi círculo más íntimo, limpiando mi equipo minuciosamente y verificando cada tornillo del sistema de gas.",
        scores: { levi: 3, mikasa: 2 },
        rationale: "Rigor profesional e introversión protectora."
      },
      {
        letter: "C",
        text: "Revisando mapas tácticos bajo la luz de una vela, anticipando dónde acecharán los puntos ciegos de la formación.",
        scores: { erwin: 3, armin: 2, hange: 1 },
        rationale: "Dedicación obsesiva al plan maestro."
      },
      {
        letter: "D",
        text: "Debatiendo teorías fascinantes con cualquiera que esté despierto sobre la fisiología de los titanes.",
        scores: { hange: 3, armin: 1 },
        rationale: "Pasión intelectual inagotable y camaradería curiosa."
      }
    ]
  },
  {
    id: 6,
    category: "Manejo de la Culpa y la Duda",
    scenarioTitle: "El Peso del Mando y el Silencio de los Caídos",
    banner: "/images/levi.jpg",
    question: "Tus decisiones causaron bajas irreparables en tu escuadrón, pero lograron el objetivo militar. ¿Cómo procesas el duelo?",
    options: [
      {
        letter: "A",
        text: "Llevo el dolor en silencio; guardo los emblemas de sus capas y sigo adelante porque la muerte no espera a nadie.",
        scores: { levi: 3, mikasa: 1, erwin: 1 },
        rationale: "Estoicismo marcial y reverencia silenciosa."
      },
      {
        letter: "B",
        text: "Siento una angustia que desgarra mi mente, debatiéndome si merezco seguir con vida mientras otros cayeron.",
        scores: { reiner: 3, armin: 2 },
        rationale: "Carga existencial y sensibilidad moral profunda."
      },
      {
        letter: "C",
        text: "Transformo el luto en juramento inquebrantable: erradicaré la causa raíz de este sufrimiento para que nadie vuelva a morir.",
        scores: { eren: 3, erwin: 2 },
        rationale: "Metamorfosis del dolor en combustible para la causa."
      },
      {
        letter: "D",
        text: "Acepto que para cambiar el mundo hay que ensuciarse las manos y soportar ser el villano de la historia si es necesario.",
        scores: { armin: 2, erwin: 3, levi: 1 },
        rationale: "Pragmatismo ético trágico."
      }
    ]
  },
  {
    id: 7,
    category: "Estilo de Combate Preferido",
    scenarioTitle: "Vuelo Rasante en el Bosque de Árboles Gigantes",
    banner: "/images/forest_battle.jpg",
    question: "¿Qué equipamiento o enfoque táctico se adapta mejor a tu personalidad en combate?",
    options: [
      {
        letter: "A",
        text: "Vuelo rasante y giros de rotación a velocidad vertiginosa; asesto cortes certeros con dos hojas afiladas.",
        scores: { levi: 3, mikasa: 2 },
        rationale: "Agilidad acrobática y letalidad cuerpo a cuerpo."
      },
      {
        letter: "B",
        text: "Invento o modifico artefactos balísticos experimentales, como Lanzas Relámpago y trampas de arpones gigantes.",
        scores: { hange: 3, armin: 1 },
        rationale: "Ingeniería de armamento y sorpresa tecnológica."
      },
      {
        letter: "C",
        text: "Un fusil de precisión o arco a distancia; prefiero aprovechar el terreno natural, la puntería y la paciencia del cazador.",
        scores: { sasha: 3, armin: 1 },
        rationale: "Combate de emboscada y percepción periférica."
      },
      {
        letter: "D",
        text: "Un poder de impacto masivo: dureza de armadura, cuerpo a cuerpo implacable y choque frontal.",
        scores: { eren: 2, reiner: 3 },
        rationale: "Fuerza colosal y choque físico arrollador."
      }
    ]
  },
  {
    id: 8,
    category: "Dilema de la Lealtad vs las Órdenes",
    scenarioTitle: "Insubordinación Moral o Deber Militar",
    banner: "/images/erwin.jpg",
    question: "El mando militar te ordena ejecutar una directriz que consideras injusta o corrupta. ¿Qué camino tomas?",
    options: [
      {
        letter: "A",
        text: "Desobedezco de frente y actúo según mi propia convicción moral. Las murallas y sus leyes no me enjaularán.",
        scores: { eren: 3, hange: 1 },
        rationale: "Insubordinación justa e individualismo heroico."
      },
      {
        letter: "B",
        text: "Organizo un golpe institucional silencioso o expongo la verdad públicamente para cambiar la estructura desde la raíz.",
        scores: { erwin: 3, armin: 2, hange: 2 },
        rationale: "Revolución táctica coordinada."
      },
      {
        letter: "C",
        text: "Sigo mi instinto de cuidar a mi gente; las leyes me dan igual si amenazan a quienes juré proteger.",
        scores: { mikasa: 3, levi: 2 },
        rationale: "Lealtad personal por encima del dogma estatal."
      },
      {
        letter: "D",
        text: "Trato de cumplir mi deber con disciplina, pero busco atenuar el daño y proteger a los inocentes desde adentro.",
        scores: { reiner: 2, sasha: 2, levi: 1 },
        rationale: "Equilibrio entre disciplina castrense y conciencia humana."
      }
    ]
  },
  {
    id: 9,
    category: "Motivación Profunda",
    scenarioTitle: "La Promesa Inquebrantable tras la Tormenta",
    banner: "/images/hero.jpg",
    question: "¿Qué pensamiento te daría fuerzas para levantarte del suelo cuando tus fuerzas se han agotado por completo?",
    options: [
      {
        letter: "A",
        text: "El recuerdo de una promesa hecha a un camarada o el rostro de la persona que no puedo dejar morir.",
        scores: { mikasa: 3, levi: 2, reiner: 1 },
        rationale: "La promesa afectiva inquebrantable."
      },
      {
        letter: "B",
        text: "Saber que nací en este mundo y que tengo el derecho sagrado de no dejarme vencer por nadie.",
        scores: { eren: 3, erwin: 1 },
        rationale: "Afirmación ontológica radical de la existencia."
      },
      {
        letter: "C",
        text: "La promesa de que más allá de este infierno existe un futuro de paz donde podamos hablar y sonreír.",
        scores: { armin: 3, sasha: 2 },
        rationale: "Esperanza trascendente y reconciliación."
      },
      {
        letter: "D",
        text: "La curiosidad ardiente de ver qué hay al otro lado de la colina y qué respuestas guarda el sótano de los secretos.",
        scores: { erwin: 2, hange: 3 },
        rationale: "Sed de verdad que desafía a la muerte."
      }
    ]
  },
  {
    id: 10,
    category: "El Veredicto Final de la Muralla",
    scenarioTitle: "El Legado Inmortal de las Alas de la Libertad",
    banner: "/images/cavalry_charge.jpg",
    question: "Al final del día, cuando la historia recuerde a los exploradores de la Legión, ¿cómo deseas ser recordado?",
    options: [
      {
        letter: "A",
        text: "Como el estratega que nunca dudó en apostar su vida y su alma para guiar a la humanidad hacia la victoria.",
        scores: { erwin: 3, armin: 1 },
        rationale: "El gran visionario inmortalizado en la historia."
      },
      {
        letter: "B",
        text: "No me importa la gloria ni los monumentos; me basta con saber que cumplí mi deber y salvé a mis camaradas.",
        scores: { levi: 3, mikasa: 2, reiner: 1 },
        rationale: "Humildad marcial y deber cumplido."
      },
      {
        letter: "C",
        text: "Como alguien que luchó con garras y dientes por la libertad de su pueblo, sin pedir disculpas por soñar.",
        scores: { eren: 3, sasha: 1 },
        rationale: "El indomable que desafió a su época."
      },
      {
        letter: "D",
        text: "Como un explorador apasionado que abrió nuevas puertas al conocimiento y demostró que el miedo se vence con ciencia.",
        scores: { hange: 3, armin: 2 },
        rationale: "El legado científico de la innovación humana."
      }
    ]
  }
];
