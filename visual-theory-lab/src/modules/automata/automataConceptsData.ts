import type { AutomataConcept, AutomataLabMeta } from './automataTypes';

export const automataConcepts: AutomataConcept[] = [
  {
    id: 'dfa',
    label: 'DFA',
    kind: 'Finite automaton',
    definition: 'Automata finito determinista con un unico siguiente estado por simbolo.',
    relationToComplexity: 'Modelo base para lenguajes regulares; muy restringido frente a maquinas de Turing.',
    status: 'stub',
  },
  {
    id: 'nfa',
    label: 'NFA',
    kind: 'Nondeterministic finite automaton',
    definition: 'Automata finito no determinista con multiples transiciones posibles o epsilon-transiciones.',
    relationToComplexity: 'Equivalente a DFA en poder expresivo para lenguajes regulares, pero util para entender no determinismo.',
    status: 'stub',
  },
  {
    id: 'pda',
    label: 'PDA',
    kind: 'Pushdown automaton',
    definition: 'Automata con pila; reconoce lenguajes libres de contexto.',
    relationToComplexity: 'Introduce memoria estructurada antes de llegar al modelo general de Turing.',
    status: 'stub',
  },
  {
    id: 'dtm',
    label: 'Maquina de Turing determinista',
    kind: 'Deterministic Turing machine',
    definition: 'Modelo general de computo con una unica transicion aplicable por configuracion.',
    relationToComplexity: 'Tiempo polinomial determinista define P.',
    status: 'functional',
  },
  {
    id: 'ntm',
    label: 'Maquina de Turing no determinista',
    kind: 'Nondeterministic Turing machine',
    definition: 'Modelo matematico donde una configuracion puede ramificarse en varias configuraciones posibles.',
    relationToComplexity: 'Tiempo polinomial no determinista define NP; equivalente a verificacion polinomial de certificados.',
    status: 'stub',
  },
];

export const automataLabMeta: AutomataLabMeta = {
  conceptualMessage: 'P se define mediante computo determinista en tiempo polinomial. NP puede definirse mediante maquinas no deterministas en tiempo polinomial o, de forma equivalente, mediante verificacion polinomial de certificados.',
  misconception: {
    error: 'Pensar que una maquina no determinista es una computadora real magica.',
    correction: 'Es un modelo matematico para definir clases de complejidad.',
    explanation: 'El no determinismo permite razonar como si una maquina pudiera explorar ramas de computo, pero no debe confundirse con hardware real que prueba todas las posibilidades gratis.',
    severity: 'critical',
  },
  codeReferences: [
    {
      label: 'Modulo principal',
      path: 'src/modules/automata/TuringAutomataLab.tsx',
      module: 'Turing & Automata Lab',
      symbol: 'TuringAutomataLab',
      description: 'Orquesta selector de modelos, simulador de maquina de Turing, mapa conceptual y eventos de consola.',
    },
    {
      label: 'Datos de maquina de Turing',
      path: 'src/modules/automata/turingMachineData.ts',
      module: 'Turing & Automata Lab',
      symbol: 'evenOnesMachine',
      description: 'Define la maquina determinista de ejemplo, estados, alfabeto, transiciones e input inicial.',
    },
    {
      label: 'Visualizador Turing',
      path: 'src/components/automata/TuringMachineVisualizer.tsx',
      module: 'Turing & Automata Lab',
      symbol: 'TuringMachineVisualizer',
      description: 'Ejecuta step/run/reset, actualiza cinta, estado, transicion activa e historial de configuraciones.',
    },
  ],
};
