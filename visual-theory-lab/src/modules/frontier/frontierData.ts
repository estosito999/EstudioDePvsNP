import type { FrontierLabMeta, FrontierTopic } from './frontierTypes';

const sharedCodeReferences = [
  { label: 'Modulo principal', path: 'src/modules/frontier/OpenFrontierLab.tsx', module: 'Open Frontier Lab', symbol: 'OpenFrontierLab', description: 'Orquesta problemas abiertos, barreras y mensajes de frontera.' },
  { label: 'Datos de frontera', path: 'src/modules/frontier/frontierData.ts', module: 'Open Frontier Lab', symbol: 'frontierTopics', description: 'Define estados OPEN/BARRIER, conocido/desconocido, errores comunes y relacion con P vs NP.' },
];

export const frontierTopics: FrontierTopic[] = [
  {
    id: 'p-vs-np',
    title: 'P vs NP',
    status: 'OPEN',
    category: 'open-problem',
    known: ['P ⊆ NP', 'Muchos problemas naturales son NP-completos.', 'Si un problema NP-completo esta en P, entonces P = NP.'],
    unknown: ['P = NP o P ≠ NP', 'No conocemos limites inferiores generales suficientes para separar ambas clases.'],
    whyItMatters: 'Es el problema central sobre si encontrar soluciones puede ser tan eficiente como verificarlas.',
    commonMistakes: ['Presentar P ≠ NP como demostrado.', 'Confundir evidencia empirica con prueba matematica.', 'Creer que una visualizacion de reducciones resuelve la separacion.'],
    relationToPvsNP: 'Es el tema principal: todas las demas fronteras ayudan a ubicar evidencia, barreras o problemas relacionados.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'np-vs-co-np',
    title: 'NP vs co-NP',
    status: 'OPEN',
    category: 'open-problem',
    known: ['Si NP ≠ co-NP, entonces P ≠ NP.', 'TAUTOLOGY esta en co-NP y SAT esta en NP.'],
    unknown: ['No sabemos si NP = co-NP.', 'No sabemos si todo certificado de no-pertenencia puede verificarse eficientemente.'],
    whyItMatters: 'Conecta pruebas cortas de existencia con pruebas cortas de imposibilidad o universalidad.',
    commonMistakes: ['Asumir NP-completo implica co-NP-completo sin condiciones.', 'Creer que SAT y TAUTOLOGY son simetricos computacionalmente por definicion.'],
    relationToPvsNP: 'Una separacion NP vs co-NP implicaria P vs NP, pero no conocemos como demostrarla.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'p-vs-pspace',
    title: 'P vs PSPACE',
    status: 'OPEN',
    category: 'open-problem',
    known: ['P ⊆ PSPACE', 'NP ⊆ PSPACE', 'QBF es PSPACE-completo.'],
    unknown: ['No sabemos si P = PSPACE.', 'No sabemos demostrar separaciones fuertes entre tiempo polinomial y espacio polinomial general.'],
    whyItMatters: 'Ubica el poder de memoria polinomial frente a algoritmos de tiempo polinomial.',
    commonMistakes: ['Confundir PSPACE con EXP.', 'Pensar que QBF resuelve P vs NP por estar por encima de SAT.'],
    relationToPvsNP: 'Si P = PSPACE entonces P = NP, pero P vs PSPACE podria ser mas fuerte que P vs NP.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'p-vs-bpp',
    title: 'P vs BPP',
    status: 'OPEN',
    category: 'open-problem',
    known: ['P ⊆ BPP', 'La amplificacion reduce el error de BPP exponencialmente.', 'La derandomizacion conecta BPP con PRGs y limites inferiores.'],
    unknown: ['No sabemos demostrar incondicionalmente P = BPP.', 'No sabemos si la aleatoriedad siempre puede eliminarse eficientemente.'],
    whyItMatters: 'Pregunta si la aleatoriedad da poder computacional real o solo conveniencia algoritmica.',
    commonMistakes: ['Asumir que aleatoriedad siempre aumenta poder absoluto.', 'Confundir evidencia de derandomizacion con teorema general P = BPP.'],
    relationToPvsNP: 'Su estudio comparte herramientas con limites inferiores y pseudorandomness, relevantes para la frontera de P vs NP.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'strong-circuit-lower-bounds',
    title: 'Limites inferiores fuertes para circuitos',
    status: 'OPEN',
    category: 'open-problem',
    known: ['Existen limites inferiores para modelos restringidos como AC0.', 'Separaciones generales requeririan limites mucho mas fuertes.'],
    unknown: ['No sabemos probar limites inferiores superpolinomiales generales para problemas explicitos en NP.', 'No sabemos separar NP de P/poly.'],
    whyItMatters: 'Los circuitos son una ruta principal para formalizar que ciertos problemas requieren computo grande.',
    commonMistakes: ['Confundir limites para AC0 con limites para circuitos generales.', 'Pensar que un lower bound restringido resuelve P vs NP.'],
    relationToPvsNP: 'Un lower bound suficientemente fuerte contra circuitos generales podria implicar separaciones profundas relacionadas con P vs NP.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'general-separations',
    title: 'Separaciones generales',
    status: 'OPEN',
    category: 'open-problem',
    known: ['El teorema de jerarquia temporal separa algunas clases con mas tiempo.', 'El teorema de jerarquia espacial separa algunas clases con mas espacio.'],
    unknown: ['Muchas separaciones naturales entre clases centrales siguen abiertas.', 'No hay tecnica general capaz de resolver todas las separaciones importantes.'],
    whyItMatters: 'Explica por que la teoria conoce algunas separaciones y aun asi falla en las mas naturales.',
    commonMistakes: ['Creer que jerarquias resuelven automaticamente P vs NP.', 'Confundir separaciones artificiales con separaciones naturales centrales.'],
    relationToPvsNP: 'P vs NP es una separacion central que no cae directamente de las jerarquias conocidas.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'relativization',
    title: 'Relativization',
    status: 'BARRIER / LIMITATION',
    category: 'barrier',
    known: ['Existen oraculos A y B tales que P^A = NP^A y P^B ≠ NP^B.', 'Una prueba que relativiza no puede resolver P vs NP por si sola.'],
    unknown: ['No dice que P vs NP sea irresoluble.', 'No clasifica todas las tecnicas no relativizantes posibles.'],
    whyItMatters: 'Muestra una limitacion de grandes familias de argumentos que sobreviven al agregar oraculos.',
    commonMistakes: ['Interpretar relativization como prueba de independencia.', 'Creer que bloquea cualquier prueba futura.'],
    relationToPvsNP: 'Cualquier solucion de P vs NP debe evitar depender solo de tecnicas relativizantes.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'natural-proofs',
    title: 'Natural Proofs',
    status: 'BARRIER / LIMITATION',
    category: 'barrier',
    known: ['Bajo supuestos criptograficos, ciertas pruebas combinatorias naturales no bastan para lower bounds fuertes.', 'Afecta estrategias para separar NP de circuitos pequeños.'],
    unknown: ['No descarta todas las pruebas de lower bounds.', 'Depende de supuestos sobre funciones pseudoaleatorias.'],
    whyItMatters: 'Explica por que probar lower bounds de circuitos generales parece tecnicamente dificil.',
    commonMistakes: ['Pensar que Natural Proofs demuestra que lower bounds son imposibles.', 'Olvidar que es una barrera condicional y tecnica.'],
    relationToPvsNP: 'Ataca una ruta importante hacia P vs NP: probar que problemas NP requieren circuitos grandes.',
    codeReferences: sharedCodeReferences,
  },
  {
    id: 'algebrization',
    title: 'Algebrization',
    status: 'BARRIER / LIMITATION',
    category: 'barrier',
    known: ['Extiende la idea de relativization a tecnicas algebraicas usadas en complejidad.', 'Muchas tecnicas aritmeticas conocidas tambien algebrizan.'],
    unknown: ['No descarta tecnicas algebraicas totalmente nuevas.', 'No prueba que P vs NP sea independiente de sistemas formales.'],
    whyItMatters: 'Muestra que incluso algunas tecnicas no relativizantes pueden seguir siendo insuficientes.',
    commonMistakes: ['Confundir algebrization con una prueba de P ≠ NP.', 'Creer que toda algebra queda bloqueada.'],
    relationToPvsNP: 'Sugiere que una prueba final debe ir mas alla de relativization y de muchas aritmetizaciones conocidas.',
    codeReferences: sharedCodeReferences,
  },
];

export const frontierLabMeta: FrontierLabMeta = {
  conceptualMessage: 'Este laboratorio distingue teoremas demostrados, intuiciones, barreras técnicas y problemas abiertos. No todo lo visualizado es una demostración.',
  codeReferences: [
    ...sharedCodeReferences,
    { label: 'Selector de frontera', path: 'src/components/frontier/FrontierTopicSelector.tsx', module: 'Open Frontier Lab', symbol: 'FrontierTopicSelector', description: 'Lista problemas abiertos y barreras tecnicas.' },
    { label: 'Detalle de tema', path: 'src/components/frontier/FrontierTopicDetail.tsx', module: 'Open Frontier Lab', symbol: 'FrontierTopicDetail', description: 'Muestra estado, conocido, desconocido, importancia, errores comunes y relacion con P vs NP.' },
  ],
};

export const defaultFrontierTopicId = 'p-vs-np' satisfies FrontierTopic['id'];

export function getFrontierTopic(topicId: string) {
  return frontierTopics.find((topic) => topic.id === topicId) ?? frontierTopics[0];
}
