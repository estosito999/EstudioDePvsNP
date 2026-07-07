import type { RandomClass, RandomizationLabMeta, RepetitionRow } from './randomizationTypes';

export const randomClasses: RandomClass[] = [
  {
    id: 'bpp',
    label: 'BPP',
    fullName: 'Bounded-error Probabilistic Polynomial time',
    errorModel: 'Error bilateral acotado',
    guarantee: 'Responde correctamente con probabilidad al menos 2/3 en instancias si y no.',
    intuition: 'Permite respuestas equivocadas raras, pero con probabilidad controlada.',
    deterministicView: 'Explora una ruta fija de cálculo.',
    probabilisticView: 'Muestrea bits aleatorios y acepta la mayoría de ejecuciones.',
    baseError: '≤ 1/3',
  },
  {
    id: 'rp',
    label: 'RP',
    fullName: 'Randomized Polynomial time',
    errorModel: 'Error unilateral para falsos negativos',
    guarantee: 'Si responde si, es correcto; puede fallar al encontrar testigos si existen.',
    intuition: 'Nunca acepta instancias no, pero puede perder una instancia si.',
    deterministicView: 'Busca un testigo siguiendo un orden fijo.',
    probabilisticView: 'Prueba testigos aleatorios y acepta al encontrar uno valido.',
    baseError: '≤ 1/2',
  },
  {
    id: 'co-rp',
    label: 'co-RP',
    fullName: 'Complement of RP',
    errorModel: 'Error unilateral para falsos positivos',
    guarantee: 'Si responde no, es correcto; puede aceptar por error con probabilidad acotada.',
    intuition: 'Es la version complementaria de RP.',
    deterministicView: 'Intenta descartar con una regla fija.',
    probabilisticView: 'Muestrea certificados de rechazo con error unilateral.',
    baseError: '≤ 1/2',
  },
  {
    id: 'zpp',
    label: 'ZPP',
    fullName: 'Zero-error Probabilistic Polynomial time',
    errorModel: 'Sin error, tiempo esperado polinomial',
    guarantee: 'Nunca responde incorrectamente; la aleatoriedad afecta el tiempo esperado.',
    intuition: 'Equivale a RP ∩ co-RP bajo la lectura clasica.',
    deterministicView: 'Ejecuta una estrategia fija hasta terminar.',
    probabilisticView: 'Usa aleatoriedad para acelerar, pero solo devuelve respuestas verificadas.',
    baseError: '0',
  },
];

export const repetitionRows: RepetitionRow[] = [
  { runs: 1, rpError: '1/2', bppIntuition: '≤ 1/3' },
  { runs: 2, rpError: '1/4', bppIntuition: 'menor por voto/repeticion' },
  { runs: 5, rpError: '1/32', bppIntuition: 'caida exponencial via amplificacion' },
  { runs: 10, rpError: '1/1024', bppIntuition: 'error extremadamente pequeño' },
];

export const randomizationLabMeta: RandomizationLabMeta = {
  conceptualMessage: 'La aleatorización puede acelerar algoritmos, pero en muchos escenarios se estudia si puede eliminarse mediante derandomización.',
  misconception: {
    error: 'Creer que aleatorización siempre significa más poder computacional absoluto.',
    correction: 'Muchas preguntas sobre aleatorización están conectadas con límites inferiores y generadores pseudoaleatorios.',
  },
  prgPipeline: ['semilla corta', 'generador pseudoaleatorio G', 'bits que parecen aleatorios', 'algoritmo probabilistico simulado'],
  advancedTopics: [
    {
      title: 'Hardness vs Randomness',
      description: 'La dureza computacional de ciertas funciones puede usarse para construir generadores pseudoaleatorios que engañan algoritmos eficientes.',
    },
    {
      title: 'Impagliazzo-Wigderson',
      description: 'El paradigma muestra que limites inferiores fuertes pueden implicar derandomizacion de clases probabilisticas como BPP.',
    },
  ],
  codeReferences: [
    { label: 'Modulo principal', path: 'src/modules/randomization/RandomizationDerandomizationLab.tsx', module: 'Randomization & Derandomization Lab', symbol: 'RandomizationDerandomizationLab', description: 'Orquesta clases probabilisticas, visualizaciones de error, PRG y derandomizacion.' },
    { label: 'Datos de clases', path: 'src/modules/randomization/randomizationData.ts', module: 'Randomization & Derandomization Lab', symbol: 'randomClasses', description: 'Define BPP, RP, co-RP, ZPP, repeticion, mensaje conceptual y misconception.' },
    { label: 'Arbol aleatorio', path: 'src/components/randomization/RandomDecisionTree.tsx', module: 'Randomization & Derandomization Lab', symbol: 'RandomDecisionTree', description: 'Muestra ramas de bits aleatorios y hojas aceptar/rechazar/error.' },
  ],
};

export const defaultRandomClassId = 'bpp' satisfies RandomClass['id'];

export function getRandomClass(classId: string) {
  return randomClasses.find((item) => item.id === classId) ?? randomClasses[0];
}
