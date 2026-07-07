import type { Misconception, MisconceptionSeverity } from './complexityTypes';

export const misconceptions: Misconception[] = [
  {
    id: 'np-means-non-polynomial',
    title: 'NP no significa no polinomial',
    wrongIdea: 'NP significa no polinomial.',
    correction: 'No. NP significa que una solucion propuesta puede verificarse en tiempo polinomial.',
    explanation: 'NP no describe directamente que un problema sea imposible o exponencial. Describe una condicion de verificacion eficiente. Muchos problemas en NP podrian estar en P; justamente P vs NP pregunta si todos los problemas verificables eficientemente tambien pueden resolverse eficientemente.',
    severity: 'critical',
    relatedConceptIds: ['P', 'NP', 'NP-Complete'],
    tags: ['P-vs-NP', 'verification', 'definition'],
    truthStatus: 'common_error',
  },
  {
    id: '3sat-bruteforce-does-not-prove-pneqnp',
    title: 'Fuerza bruta lenta no prueba P != NP',
    wrongIdea: 'Si mi fuerza bruta tarda mucho, entonces P != NP.',
    correction: 'No. Eso solo demuestra que ese algoritmo especifico escala mal. No demuestra que no exista otro algoritmo polinomial.',
    explanation: 'La fuerza bruta para 3-SAT prueba muchas asignaciones y puede crecer como O(2^n), pero eso es una propiedad del algoritmo de fuerza bruta, no una prueba de imposibilidad para todos los algoritmos posibles.',
    severity: 'critical',
    relatedConceptIds: ['3-SAT', 'SAT', 'NP', 'NP-Complete'],
    tags: ['brute-force', 'P-vs-NP', 'algorithm-analysis'],
    truthStatus: 'common_error',
  },
  {
    id: 'np-complete-impossible',
    title: 'NP-completo no significa imposible',
    wrongIdea: 'NP-completo significa imposible.',
    correction: 'No. NP-completo significa que el problema esta en NP y que todo problema de NP se reduce a el en tiempo polinomial.',
    explanation: 'Un problema NP-completo representa los problemas mas dificiles conocidos dentro de NP bajo reducciones polinomiales. Si uno de ellos tuviera un algoritmo polinomial, entonces P = NP. Pero no se ha demostrado que sean imposibles de resolver en tiempo polinomial.',
    severity: 'high',
    relatedConceptIds: ['NP-Complete', 'NP', 'NP-Hard', 'P'],
    tags: ['reductions', 'hardness', 'P-vs-NP'],
    truthStatus: 'common_error',
  },
  {
    id: 'np-hard-inside-np',
    title: 'NP-hard no implica pertenecer a NP',
    wrongIdea: 'Todo problema NP-hard esta dentro de NP.',
    correction: 'No necesariamente. NP-hard significa al menos tan dificil como los problemas de NP, pero el problema puede estar fuera de NP.',
    explanation: 'Algunos problemas NP-hard no son problemas de decision o no tienen certificados verificables en tiempo polinomial. Por eso NP-hard no implica automaticamente pertenecer a NP.',
    severity: 'high',
    relatedConceptIds: ['NP-Hard', 'NP', 'NP-Complete'],
    tags: ['hardness', 'membership', 'reductions'],
    truthStatus: 'common_error',
  },
  {
    id: 'np-conp-obviously-same',
    title: 'NP y co-NP no son obviamente iguales',
    wrongIdea: 'NP y co-NP son obviamente lo mismo.',
    correction: 'No se sabe si NP = co-NP.',
    explanation: 'NP se asocia con certificados eficientes para respuestas SI. co-NP se asocia con certificados eficientes para respuestas NO. Sabemos que P esta contenida en NP y co-NP, pero no sabemos si NP y co-NP son iguales.',
    severity: 'high',
    relatedConceptIds: ['NP', 'co-NP', 'P'],
    tags: ['open-problem', 'complement', 'certificates'],
    truthStatus: 'common_error',
  },
  {
    id: 'p-fast-in-practice',
    title: 'P no garantiza rapidez practica',
    wrongIdea: 'P significa que el algoritmo siempre es rapido en la practica.',
    correction: 'No necesariamente. P significa tiempo polinomial teorico, pero un polinomio enorme puede ser impractico.',
    explanation: 'Un algoritmo O(n^100) esta en P, pero puede ser inutil en la practica. La clase P mide eficiencia asintotica teorica, no siempre rendimiento practico.',
    severity: 'medium',
    relatedConceptIds: ['P'],
    tags: ['asymptotic-analysis', 'practical-performance'],
    truthStatus: 'common_error',
  },
  {
    id: 'ac0-lower-bound-solves-pnp',
    title: 'AC0 no es suficiente para resolver P vs NP',
    wrongIdea: 'Probar que PARITY no esta en AC0 resuelve P vs NP.',
    correction: 'No. AC0 es un modelo restringido de circuitos.',
    explanation: 'Los limites inferiores para AC0 son importantes, pero AC0 es mucho mas debil que modelos generales de computo. Un limite inferior en un modelo restringido no implica automaticamente una separacion como P != NP.',
    severity: 'critical',
    relatedConceptIds: ['AC0', 'PARITY', 'P', 'NP'],
    tags: ['circuit-lower-bounds', 'barriers', 'P-vs-NP'],
    truthStatus: 'common_error',
  },
  {
    id: 'parity-not-ac0-not-p',
    title: 'PARITY fuera de AC0 no significa fuera de P',
    wrongIdea: 'Si PARITY no esta en AC0, entonces PARITY no esta en P.',
    correction: 'No. PARITY si se puede calcular eficientemente, pero no por circuitos AC0.',
    explanation: 'PARITY sirve para mostrar limites de modelos restringidos como AC0. Eso no significa que sea dificil para todos los modelos computacionales.',
    severity: 'high',
    relatedConceptIds: ['PARITY', 'AC0', 'P'],
    tags: ['circuit-lower-bounds', 'model-restriction'],
    truthStatus: 'common_error',
  },
  {
    id: 'sat-in-np-means-in-p',
    title: 'SAT en NP no significa SAT en P',
    wrongIdea: 'SAT pertenece a NP significa que SAT tiene algoritmo polinomial.',
    correction: 'No. SAT pertenece a NP significa que una asignacion candidata puede verificarse en tiempo polinomial.',
    explanation: 'SAT es NP-completo. Sabemos verificar soluciones eficientemente, pero no sabemos si siempre se puede encontrar una solucion en tiempo polinomial.',
    severity: 'critical',
    relatedConceptIds: ['SAT', 'NP', 'P', 'NP-Complete'],
    tags: ['verification', 'SAT', 'P-vs-NP'],
    truthStatus: 'common_error',
  },
  {
    id: 'qbf-just-sat-more-vars',
    title: 'QBF no es SAT con mas variables',
    wrongIdea: 'QBF es simplemente SAT con mas variables.',
    correction: 'No. QBF agrega cuantificadores y es PSPACE-completo.',
    explanation: 'QBF permite alternar cuantificadores existenciales y universales, lo cual cambia profundamente la dificultad del problema. SAT pregunta si existe una asignacion; QBF puede expresar juegos logicos con alternancia de decisiones.',
    severity: 'high',
    relatedConceptIds: ['QBF', 'SAT', 'PSPACE'],
    tags: ['PSPACE', 'quantifiers', 'alternation'],
    truthStatus: 'common_error',
  },
  {
    id: 'finitely-describable-means-decidable',
    title: 'Descripcion finita no implica decidibilidad',
    wrongIdea: 'Finitamente describible significa decidible.',
    correction: 'No. Un problema puede tener una descripcion finita y aun asi no tener decidor total.',
    explanation: 'El Halting Problem tiene una formulacion finita y una maquina universal puede reconocer instancias positivas, pero no existe algoritmo que decida todas las instancias.',
    severity: 'high',
    relatedConceptIds: ['Finitely describable', 'Decidable / Recursive', 'Halting Problem / H'],
    tags: ['decidability', 'description', 'computability'],
    truthStatus: 'common_error',
  },
  {
    id: 'not-finitely-describable-programmable',
    title: 'No describible no significa pendiente de descubrir',
    wrongIdea: 'No finitely describable significa muy dificil pero eventualmente programable.',
    correction: 'No. Por cardinalidad, no existe ninguna descripcion finita para esos lenguajes.',
    explanation: 'Hay incontablemente muchos lenguajes sobre Σ*, pero solo contablemente muchas cadenas finitas que puedan describir maquinas, gramaticas o formulas.',
    severity: 'medium',
    relatedConceptIds: ['All Languages', 'Not finitely describable', 'Finitely describable'],
    tags: ['cardinality', 'formal-languages'],
    truthStatus: 'common_error',
  },
  {
    id: 'recognizable-means-decidable',
    title: 'Reconocible no significa decidible',
    wrongIdea: 'Reconocible significa decidible.',
    correction: 'No. Un reconocedor puede no detenerse en instancias negativas.',
    explanation: 'RE solo garantiza aceptacion eventual para las entradas del lenguaje. Para decidibilidad se exige detenerse tanto en instancias positivas como negativas.',
    severity: 'critical',
    relatedConceptIds: ['Recognizable / RE', 'Decidable / Recursive', 'Halting Problem / H'],
    tags: ['RE', 'decidability', 'halting'],
    truthStatus: 'common_error',
  },
  {
    id: 'formal-description-implies-decidable',
    title: 'Tener descripcion formal no basta para decidir',
    wrongIdea: 'Si un problema tiene descripcion formal, entonces es decidible.',
    correction: 'No. La descripcion puede definir un lenguaje sin proveer un algoritmo total de decision.',
    explanation: 'La computabilidad distingue entre poder especificar una propiedad y poder decidirla en todas las entradas.',
    severity: 'high',
    relatedConceptIds: ['Decidable / Recursive', 'Finitely describable', 'Undecidable'],
    tags: ['decidability', 'specification'],
    truthStatus: 'common_error',
  },
  {
    id: 'halting-undecidable-not-recognizable',
    title: 'Halting es reconocible aunque indecidible',
    wrongIdea: 'Halting no es reconocible porque es indecidible.',
    correction: 'No. Halting es reconocible: se simula el programa y se acepta si se detiene.',
    explanation: 'La indecidibilidad aparece porque no hay forma general de concluir correctamente que un programa nunca se detendra.',
    severity: 'critical',
    relatedConceptIds: ['Halting Problem / H', 'Recognizable / RE', 'Decidable / Recursive'],
    tags: ['halting', 'RE', 'decidability'],
    truthStatus: 'common_error',
  },
  {
    id: 're-closed-under-complement',
    title: 'RE no esta cerrada bajo complemento',
    wrongIdea: 'El complemento de un lenguaje RE tambien debe ser RE.',
    correction: 'No. H esta en RE, pero H̄ no esta en RE.',
    explanation: 'Si un lenguaje y su complemento fueran ambos reconocibles, se podria decidir ejecutando ambos reconocedores en paralelo. Eso contradice la indecidibilidad de Halting para H y H̄.',
    severity: 'critical',
    relatedConceptIds: ['Recognizable / RE', 'co-RE', 'Complement of Halting / Hbar'],
    tags: ['RE', 'co-RE', 'closure'],
    truthStatus: 'common_error',
  },
];

const severityRank: Record<MisconceptionSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

export function getMisconceptionsForConcept(conceptId: string) {
  return misconceptions.filter((misconception) => misconception.relatedConceptIds.includes(conceptId));
}

export function getMisconceptionsByIds(ids: string[] = []) {
  const idSet = new Set(ids);
  return misconceptions.filter((misconception) => idSet.has(misconception.id));
}

export function getHighestMisconceptionSeverity(items: Misconception[]) {
  return items.reduce<MisconceptionSeverity | undefined>((highest, item) => {
    if (!highest || severityRank[item.severity] > severityRank[highest]) {
      return item.severity;
    }

    return highest;
  }, undefined);
}

export function getSeverityRank(severity: MisconceptionSeverity) {
  return severityRank[severity];
}
