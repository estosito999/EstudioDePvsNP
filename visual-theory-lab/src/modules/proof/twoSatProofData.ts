import type { ProofMeta } from './proofTypes';

export const twoSatSamples = {
  sat: '(x1 or x2) and (!x1 or x2) and (!x2 or x3)',
  unsat: '(x1 or x1) and (!x1 or !x1)',
};

export const twoSatProofMeta: ProofMeta = {
  id: 'two-sat-in-p',
  title: 'Prueba: 2-SAT pertenece a P',
  theoremStatus: 'TEOREMA DEMOSTRADO',
  shortStatement: '2-SAT puede decidirse en tiempo polinomial usando grafos de implicaciones y SCC.',
  formalIdea: 'Una formula 2-SAT es satisfacible si ninguna variable x aparece en la misma componente fuertemente conexa que neg(x).',
  misconceptionNote: 'Que SAT general sea NP-completo no implica que toda restriccion de SAT sea NP-completa. 2-SAT tiene estructura adicional explotable en tiempo polinomial.',
  codeLines: [
    'def is_2sat_satisfiable(graph, variables):',
    '    scc = strongly_connected_components(graph)',
    '',
    '    for x in variables:',
    '        if scc[x] == scc[neg(x)]:',
    '            return False',
    '',
    '    return True',
  ],
  steps: [
    { id: 'formula', label: 'Formula 2-CNF', description: 'La entrada se expresa como clausulas con maximo dos literales.' },
    { id: 'implication', label: 'Grafo de implicaciones', description: 'Cada clausula (a or b) produce las implicaciones not a -> b y not b -> a.' },
    { id: 'scc', label: 'Componentes SCC', description: 'Se agrupan literales mutuamente alcanzables.' },
    { id: 'criterion', label: 'Criterio', description: 'Si x y not x caen en la misma SCC, la formula es contradictoria.' },
    { id: 'result', label: 'Resultado SAT / UNSAT', description: 'El criterio decide satisfacibilidad en tiempo polinomial.' },
  ],
  codeReferences: [
    {
      label: 'Datos de la prueba 2-SAT',
      path: 'src/modules/proof/twoSatProofData.ts',
      module: 'Proof Lab',
      symbol: 'twoSatProofMeta',
      description: 'Define pasos visuales, idea formal, codigo visible y muestras SAT/UNSAT de la prueba 2-SAT en P.',
    },
    {
      label: 'Visualizador 2-SAT',
      path: 'src/components/proof/TwoSatProofVisualizer.tsx',
      module: 'Proof Lab',
      symbol: 'TwoSatProofVisualizer',
      description: 'Construye el grafo de implicaciones, ejecuta SCC locales, resalta x y neg(x), y concluye SAT/UNSAT.',
    },
  ],
};
