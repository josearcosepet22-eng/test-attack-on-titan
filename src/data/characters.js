/**
 * Attack on Titan (Shingeki no Kyojin) - Base de datos de personajes
 * Cada perfil contiene datos psicológicos, rol militar, frase emblemática
 * y avatar gráfico de alta resolución.
 */

import erenImg from '../assets/images/snk_eren_portrait_1792430581221.jpg';
import mikasaImg from '../assets/images/snk_mikasa_portrait_1792430582394.jpg';
import arminImg from '../assets/images/snk_armin_portrait_1792430596694.jpg';
import leviImg from '../assets/images/snk_levi_portrait_1792430580516.jpg';
import erwinImg from '../assets/images/snk_erwin_portrait_1792430598396.jpg';
import hangeImg from '../assets/images/snk_hange_portrait_1792430598999.jpg';
import reinerImg from '../assets/images/snk_reiner_portrait_1792430599126.jpg';
import sashaImg from '../assets/images/snk_sasha_portrait_1792430598829.jpg';

export const CHARACTERS = [
  {
    id: "eren",
    name: "Eren Jaeger",
    japaneseName: "エレン・イェーガー",
    title: "El Impulsor de la Libertad",
    division: "Cuerpo de Exploración · 104º Escuadrón de Reclutas",
    quote: "«Si tú crees que la realidad es solo vivir cómodamente dentro de estas murallas, jamás serás libre.»",
    description: "Posees una determinación inquebrantable y una sed feroz de independencia. Odias la complacencia y no toleras que nadie dicte tu destino o el de tus seres queridos. Cuando tomas una decisión, avanzas sin importar el costo ni los sacrificios personales, guiado por tu propia brújula moral y un compromiso absoluto con lo que consideras justo.",
    traits: ["Determinación extrema", "Fervor indomable", "Pasión implacable", "Espíritu rebelde"],
    combatStyle: "Fuerza de choque brutal, ofensiva continua y voluntad absoluta.",
    themeColor: "#b91c1c",
    accentBg: "rgba(185, 28, 28, 0.15)",
    image: erenImg || "/images/eren.jpg",
    fallbackImage: "/images/eren.jpg"
  },
  {
    id: "mikasa",
    name: "Mikasa Ackerman",
    japaneseName: "ミカサ・アッカーマン",
    title: "La Fuerza Protectora Absoluta",
    division: "Cuerpo de Exploración · Guardia de Élite",
    quote: "«Este mundo es cruel y despiadado, pero al mismo tiempo es sumamente hermoso.»",
    description: "Tu lealtad es un escudo impenetrable. Tranquilo, reservado y de pocas palabras, ocultas una potencia descomunal y una capacidad de acción fulminante ante el peligro. Tu devoción hacia quienes amas define cada uno de tus pasos, manteniéndote de pie aun cuando todo a tu alrededor parece derrumbarse.",
    traits: ["Lealtad incondicional", "Serenidad letal", "Protección férrea", "Precisión impecable"],
    combatStyle: "Destreza técnica inigualable, agilidad quirúrgica y reflejos sobrehumanos.",
    themeColor: "#991b1b",
    accentBg: "rgba(153, 27, 27, 0.15)",
    image: mikasaImg || "/images/mikasa.jpg",
    fallbackImage: "/images/mikasa.jpg"
  },
  {
    id: "armin",
    name: "Armin Arlert",
    japaneseName: "アルミン・アルレルト",
    title: "La Mente Estratégica Visionaria",
    division: "Cuerpo de Exploración · 15º Comandante",
    quote: "«Aquellos que no pueden sacrificar nada, jamás podrán cambiar nada en absoluto.»",
    description: "Entiendes que la inteligencia y la empatía son armas mucho más decisivas que la fuerza bruta. Eres un analista agudo, capaz de descifrar patrones ocultos y hallar soluciones creativas bajo una presión desgarradora. Aunque dudas de tus propias capacidades a menudo, tu convicción y visión de futuro iluminan el camino de los demás.",
    traits: ["Ingenio analítico", "Curiosidad insaciable", "Pragmatismo moral", "Compasión lúcida"],
    combatStyle: "Estrategia táctica multidimensional y anticipación psicológica de movimientos rivales.",
    themeColor: "#2563eb",
    accentBg: "rgba(37, 99, 235, 0.15)",
    image: arminImg || "/images/armin.jpg",
    fallbackImage: "/images/armin.jpg"
  },
  {
    id: "levi",
    name: "Levi Ackerman",
    japaneseName: "リヴァイ・アッカーマン",
    title: "El Soldado Más Fuerte de la Humanidad",
    division: "Cuerpo de Exploración · Capitán de Operaciones Especiales",
    quote: "«Toma una decisión de la que no te arrepientas. Nadie sabe nunca cómo saldrán las cosas.»",
    description: "Bajo una apariencia distante, fría y una obsesión por el orden, albergas un profundo sentido de responsabilidad y afecto por tus compañeros. Eres eficiente, no pierdes tiempo en rodeos y asumes el peso de las decisiones difíciles en silencio. En combate, tu disciplina y destreza no tienen rival.",
    traits: ["Perfeccionismo clínico", "Pragmatismo silencioso", "Liderazgo en la acción", "Lealtad estoica"],
    combatStyle: "Velocidad supersónica con equipo de maniobras tridimensionales y cortes letales.",
    themeColor: "#15803d",
    accentBg: "rgba(21, 128, 61, 0.15)",
    image: leviImg || "/images/levi.jpg",
    fallbackImage: "/images/levi.jpg"
  },
  {
    id: "erwin",
    name: "Erwin Smith",
    japaneseName: "エルヴィン・スミス",
    title: "El Comandante de la Verdad",
    division: "Cuerpo de Exploración · 13º Comandante en Jefe",
    quote: "«¡Avancen! ¡Entreguen sus corazones por el futuro de la humanidad!»",
    description: "Posees un magnetismo natural y un temple de acero que inspira a ejércitos a marchar hacia lo desconocido. Eres capaz de ponderar costos devastadores si el premio final es la salvación colectiva y el descubrimiento de la verdad. Tu mente abraza el riesgo calculado y tu voz infunde valor aun frente a la muerte segura.",
    traits: ["Liderazgo imponente", "Audacia estratégica", "Búsqueda de la verdad", "Carisma arrebatador"],
    combatStyle: "Comando magistral a caballo, coordinación masiva de frentes y cargas decisivas.",
    themeColor: "#d97706",
    accentBg: "rgba(217, 119, 6, 0.15)",
    image: erwinImg || "/images/erwin.jpg",
    fallbackImage: "/images/erwin.jpg"
  },
  {
    id: "hange",
    name: "Hange Zoë",
    japaneseName: "ハンジ・ゾエ",
    title: "La Investigadora Ingeniosa",
    division: "Cuerpo de Exploración · 14º Comandante / División Científica",
    quote: "«Si no comprendemos al enemigo con ojos científicos, jamás podremos vencer su amenaza.»",
    description: "Tu motor es la fascinación por lo desconocido. Abordas las mayores crisis con creatividad científica, entusiasmo contagioso y un pensamiento lateral fuera de todo molde establecido. Aunque algunos te juzguen de excéntrico, tu aguda percepción y lealtad inquebrantable te convierten en un pilar insustituible.",
    traits: ["Curiosidad científica", "Pensamiento innovador", "Entusiasmo apasionado", "Coraje audaz"],
    combatStyle: "Despliegue de armas experimentales (Lanzas Relámpago) e investigación de campo en vivo.",
    themeColor: "#854d0e",
    accentBg: "rgba(133, 77, 14, 0.15)",
    image: hangeImg || "/images/hange.jpg",
    fallbackImage: "/images/hange.jpg"
  },
  {
    id: "reiner",
    name: "Reiner Braun",
    japaneseName: "ライナー・ブラウン",
    title: "El Escudo Resistente",
    division: "Guerreros de Marley · Portador del Titán Acorazado",
    quote: "«Cumpliré con mi deber de soldado y protector hasta el último suspiro que me quede.»",
    description: "Cargas con el peso del mundo sobre tus hombros. Posees una enorme fuerza física y un sentido del deber que te empuja a proteger a los tuyos, aun cuando te desgarras por dentro ante contradicciones morales insoportables. Eres resiliente, solidario y jamás dejas a nadie atrás en el campo de batalla.",
    traits: ["Resiliencia monumental", "Sentido del deber", "Espíritu protector", "Vulnerabilidad heroica"],
    combatStyle: "Defensa blindada inexpugnable, embestidas colosales y resistencia al dolor.",
    themeColor: "#475569",
    accentBg: "rgba(71, 85, 105, 0.15)",
    image: reinerImg || "/images/reiner.jpg",
    fallbackImage: "/images/reiner.jpg"
  },
  {
    id: "sasha",
    name: "Sasha Blouse",
    japaneseName: "サシャ・ブラウス",
    title: "El Alma Genuina e Intrépida",
    division: "Cuerpo de Exploración · Francotiradora de Élite",
    quote: "«¡Siempre que haya comida caliente y amigos por los que luchar, vale la pena vivir!»",
    description: "Espontánea, auténtica y guiada por un instinto cazador formidable. Eres la chispa de calidez y humanidad en medio de las pruebas más oscuras. Aunque amas los placeres sencillos de la vida, cuando la situación exige valentía, tu puntería y rapidez no vacilan para salvar a quien lo necesite.",
    traits: ["Instinto infalible", "Autenticidad pura", "Puntería certera", "Generosidad cálida"],
    combatStyle: "Tiro con arco y fusil a larga distancia, velocidad ágil de cazadora del bosque.",
    themeColor: "#b45309",
    accentBg: "rgba(180, 83, 9, 0.15)",
    image: sashaImg || "/images/sasha.jpg",
    fallbackImage: "/images/sasha.jpg"
  }
];
