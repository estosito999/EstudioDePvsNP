import type { BooleanVariable, Clause, VerificationLabMeta } from './verificationTypes';

export const threeSatVariables: BooleanVariable[] = [
  { id: 'x1', label: 'x1' },
  { id: 'x2', label: 'x2' },
  { id: 'x3', label: 'x3' },
];

export const threeSatClauses: Clause[] = [
  { id: 'c1', literals: [{ variableId: 'x1' }, { variableId: 'x2', negated: true }, { variableId: 'x3' }] },
  { id: 'c2', literals: [{ variableId: 'x1', negated: true }, { variableId: 'x2' }, { variableId: 'x3' }] },
  { id: 'c3', literals: [{ variableId: 'x1' }, { variableId: 'x2' }, { variableId: 'x3', negated: true }] },
];

export const assignmentComparisons = [
  { variables: 10, assignments: '2¹⁰ = 1,024 asignaciones' },
  { variables: 20, assignments: '2²⁰ = 1,048,576 asignaciones' },
  { variables: 30, assignments: '2³⁰ = 1,073,741,824 asignaciones' },
];

export const threeSatBruteforceMeta: VerificationLabMeta = {
  id: 'three-sat-bruteforce',
  title: 'Brute Force 3-SAT Lab',
  subtitle: 'Enumeracion de asignaciones booleanas para visualizar crecimiento exponencial.',
  complexity: 'O(2^n)',
  conceptualMessage: 'Este experimento muestra crecimiento exponencial para fuerza bruta. Pero NO demuestra P != NP. Solo muestra que este algoritmo especifico no escala bien.',
  codeLines: [
    'for assignment in all_boolean_assignments(n):',
    '    if satisfies(formula, assignment):',
    '        return True',
    '',
    'return False',
  ],
  codeReferences: [
    {
      label: 'Datos del laboratorio',
      path: 'src/modules/code-verification/threeSatBruteforceData.ts',
      module: 'Code Verification Lab',
      symbol: 'threeSatBruteforceMeta / threeSatClauses',
      description: 'Define variables, clausulas, comparaciones 2^n, codigo mostrado y advertencia conceptual del experimento.',
    },
    {
      label: 'Visualizador 3-SAT',
      path: 'src/components/verification/ThreeSatBruteforceVisualizer.tsx',
      module: 'Code Verification Lab',
      symbol: 'ThreeSatBruteforceVisualizer',
      description: 'Controla switches booleanos, asignaciones generadas, bloques de clausulas, contador y grafica de crecimiento.',
    },
  ],
};
