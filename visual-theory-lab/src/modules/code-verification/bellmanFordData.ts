import type { VerificationLabMeta, WeightedEdge, WeightedGraphNode } from './verificationTypes';

export const bellmanFordNodes: WeightedGraphNode[] = [
  { id: 'A', label: 'A', x: 70, y: 120 },
  { id: 'B', label: 'B', x: 230, y: 60 },
  { id: 'C', label: 'C', x: 230, y: 210 },
  { id: 'D', label: 'D', x: 395, y: 135 },
];

export const bellmanFordEdges: WeightedEdge[] = [
  { id: 'A-B', source: 'A', target: 'B', weight: 4 },
  { id: 'A-C', source: 'A', target: 'C', weight: 5 },
  { id: 'B-C', source: 'B', target: 'C', weight: -2 },
  { id: 'B-D', source: 'B', target: 'D', weight: 6 },
  { id: 'C-D', source: 'C', target: 'D', weight: 3 },
];

export const bellmanFordMeta: VerificationLabMeta = {
  id: 'bellman-ford',
  title: 'Bellman-Ford Lab',
  subtitle: 'Relajacion de aristas paso a paso sobre un grafo ponderado.',
  complexity: 'O(VE)',
  conceptualMessage: 'Bellman-Ford resuelve caminos mas cortos en tiempo polinomial. Esto lo coloca dentro de P.',
  codeLines: [
    'for _ in range(vertices - 1):',
    '    for u, v, w in edges:',
    '        if dist[u] + w < dist[v]:',
    '            dist[v] = dist[u] + w',
  ],
  codeReferences: [
    {
      label: 'Datos del laboratorio',
      path: 'src/modules/code-verification/bellmanFordData.ts',
      module: 'Code Verification Lab',
      symbol: 'bellmanFordMeta / bellmanFordEdges',
      description: 'Define el grafo inicial, pesos, codigo mostrado, complejidad O(VE) y mensaje conceptual del laboratorio.',
    },
    {
      label: 'Visualizador Bellman-Ford',
      path: 'src/components/verification/BellmanFordVisualizer.tsx',
      module: 'Code Verification Lab',
      symbol: 'BellmanFordVisualizer',
      description: 'Controla nodos movibles, pesos editables, tabla de distancias y relajacion paso a paso.',
    },
  ],
};
