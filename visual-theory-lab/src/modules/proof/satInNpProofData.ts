import type { ProofMeta } from './proofTypes';

export const satFormulaClauses = [
  ['x1', '!x2', 'x3'],
  ['!x1', 'x2'],
  ['x2', 'x3'],
];

export const satInNpProofMeta: ProofMeta = {
  id: 'sat-in-np',
  title: 'Prueba: SAT pertenece a NP',
  theoremStatus: 'TEOREMA DEMOSTRADO',
  shortStatement: 'SAT esta en NP porque una asignacion candidata puede verificarse en tiempo polinomial.',
  formalIdea: 'No sabemos si SAT se puede resolver en tiempo polinomial. Pero si sabemos que una solucion propuesta puede verificarse en tiempo polinomial. Por eso SAT pertenece a NP.',
  misconceptionNote: 'SAT pertenece a NP no significa que SAT tenga algoritmo polinomial conocido. Significa que el certificado se verifica eficientemente.',
  codeLines: [
    'def verify_sat_certificate(formula, assignment):',
    '    for clause in formula:',
    '        if not any(lit.eval(assignment) for lit in clause):',
    '            return False',
    '',
    '    return True',
  ],
  steps: [
    { id: 'formula', label: 'Formula', description: 'La instancia SAT se presenta como formula booleana.' },
    { id: 'certificate', label: 'Certificado', description: 'Una asignacion candidata actua como certificado.' },
    { id: 'verifier', label: 'Verificador polinomial', description: 'El verificador revisa cada clausula y cada literal.' },
    { id: 'result', label: 'Acepta o rechaza', description: 'Si todas las clausulas son verdaderas, acepta el certificado.' },
  ],
  codeReferences: [
    {
      label: 'Datos de la prueba SAT en NP',
      path: 'src/modules/proof/satInNpProofData.ts',
      module: 'Proof Lab',
      symbol: 'satInNpProofMeta / satFormulaClauses',
      description: 'Define formula de ejemplo, pasos visuales, mensaje conceptual obligatorio y codigo visible del verificador.',
    },
    {
      label: 'Visualizador SAT en NP',
      path: 'src/components/proof/SatInNpVisualizer.tsx',
      module: 'Proof Lab',
      symbol: 'SatInNpVisualizer',
      description: 'Permite editar el certificado, verifica la formula y muestra por que la verificacion es polinomial.',
    },
  ],
};
