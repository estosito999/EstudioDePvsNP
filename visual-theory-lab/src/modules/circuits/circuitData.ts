import type { CircuitDefinition, CircuitLabMeta, CircuitModel } from './circuitTypes';

export const circuitModels: CircuitModel[] = [
  {
    id: 'AC0',
    label: 'AC0',
    description: 'Circuitos de profundidad constante, tamaño polinomial y fan-in no acotado para AND/OR.',
    intuition: 'Modelo muy restringido: excelente para estudiar limites inferiores, pero mucho mas debil que computacion general.',
  },
  {
    id: 'NC',
    label: 'NC',
    description: 'Familias de circuitos de tamaño polinomial y profundidad polilogaritmica.',
    intuition: 'Modelo de computacion paralela eficiente; se sabe NC ⊆ P, pero no si NC = P.',
  },
  {
    id: 'P/poly',
    label: 'P/poly',
    description: 'Familias no uniformes de circuitos de tamaño polinomial.',
    intuition: 'Captura computacion con consejo no uniforme; relevante para complejidad de circuitos y barreras.',
  },
];

export const circuitExamples: CircuitDefinition[] = [
  {
    id: 'and',
    name: 'AND',
    variables: ['x1', 'x2'],
    outputGateId: 'g1',
    description: 'Circuito mínimo que calcula x1 AND x2.',
    gates: [
      { id: 'x1', label: 'x1', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'x2', label: 'x2', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'g1', label: 'AND', type: 'AND', inputs: ['x1', 'x2'], layer: 1 },
    ],
  },
  {
    id: 'or',
    name: 'OR',
    variables: ['x1', 'x2'],
    outputGateId: 'g1',
    description: 'Circuito mínimo que calcula x1 OR x2.',
    gates: [
      { id: 'x1', label: 'x1', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'x2', label: 'x2', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'g1', label: 'OR', type: 'OR', inputs: ['x1', 'x2'], layer: 1 },
    ],
  },
  {
    id: 'majority',
    name: 'MAJORITY',
    variables: ['x1', 'x2', 'x3'],
    outputGateId: 'out',
    description: 'MAJORITY de 3 bits: verdadero si al menos dos entradas son verdaderas.',
    gates: [
      { id: 'x1', label: 'x1', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'x2', label: 'x2', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'x3', label: 'x3', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'a12', label: 'x1 AND x2', type: 'AND', inputs: ['x1', 'x2'], layer: 1 },
      { id: 'a13', label: 'x1 AND x3', type: 'AND', inputs: ['x1', 'x3'], layer: 1 },
      { id: 'a23', label: 'x2 AND x3', type: 'AND', inputs: ['x2', 'x3'], layer: 1 },
      { id: 'or1', label: 'OR', type: 'OR', inputs: ['a12', 'a13'], layer: 2 },
      { id: 'out', label: 'OR', type: 'OR', inputs: ['or1', 'a23'], layer: 3 },
    ],
  },
  {
    id: 'parity',
    name: 'PARITY',
    variables: ['x1', 'x2'],
    outputGateId: 'out',
    description: 'PARITY de 2 bits implementada como XOR usando AND/OR/NOT.',
    limitationNote: 'PARITY general no pertenece a AC0. Este circuito pequeño solo ilustra la funcion para pocas entradas.',
    gates: [
      { id: 'x1', label: 'x1', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'x2', label: 'x2', type: 'INPUT', inputs: [], layer: 0 },
      { id: 'n1', label: 'NOT x1', type: 'NOT', inputs: ['x1'], layer: 1 },
      { id: 'n2', label: 'NOT x2', type: 'NOT', inputs: ['x2'], layer: 1 },
      { id: 'a1', label: 'x1 AND !x2', type: 'AND', inputs: ['x1', 'n2'], layer: 2 },
      { id: 'a2', label: '!x1 AND x2', type: 'AND', inputs: ['n1', 'x2'], layer: 2 },
      { id: 'out', label: 'OR', type: 'OR', inputs: ['a1', 'a2'], layer: 3 },
    ],
  },
];

export const circuitLabMeta: CircuitLabMeta = {
  lowerBoundTitle: 'Límites inferiores',
  lowerBoundText: 'Un limite inferior demuestra que cierta funcion no puede calcularse dentro de un modelo restringido bajo ciertos recursos. El ejemplo clasico es PARITY fuera de AC0.',
  pVsNpTitle: '¿Por qué esto NO resuelve P vs NP?',
  pVsNpText: 'Un límite inferior contra un modelo restringido no implica automáticamente un límite inferior contra máquinas de Turing generales.',
  misconception: {
    error: 'Creer que un límite inferior para AC0 resuelve P vs NP.',
    correction: 'AC0 es un modelo restringido. Probar PARITY ∉ AC0 no separa P de NP.',
  },
  codeReferences: [
    { label: 'Modulo principal', path: 'src/modules/circuits/CircuitComplexityLab.tsx', module: 'Circuit Complexity Lab', symbol: 'CircuitComplexityLab', description: 'Orquesta selector de funciones, visualizador, modelos de circuito, metricas y eventos.' },
    { label: 'Datos de circuitos', path: 'src/modules/circuits/circuitData.ts', module: 'Circuit Complexity Lab', symbol: 'circuitExamples / circuitModels', description: 'Define circuitos de ejemplo, modelos AC0/NC/P-poly, misconception y texto de limites inferiores.' },
    { label: 'Visualizador de circuitos', path: 'src/components/circuits/CircuitVisualizer.tsx', module: 'Circuit Complexity Lab', symbol: 'CircuitVisualizer', description: 'Renderiza capas de profundidad, compuertas, aristas y resultado de evaluacion.' },
  ],
};

export const defaultCircuitId = 'and';
