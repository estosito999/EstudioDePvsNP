import type { UniverseCluster, UniverseLink, UniverseNode, UniverseNodeId } from './universeTypes';

const sharedReferences = [
  { label: 'Modulo principal', path: 'src/modules/universe/KnowledgeUniverse3D.tsx', module: '3D Knowledge Universe', symbol: 'KnowledgeUniverse3D', description: 'Orquesta el grafo 3D, rutas, seleccion de nodos y paneles control-room.' },
  { label: 'Datos 3D', path: 'src/modules/universe/universeData.ts', module: '3D Knowledge Universe', symbol: 'universeNodes / universeLinks', description: 'Define clusters SAT, Complexity y Proof con Truth Layer, Misconception Layer y enlaces.' },
  { label: 'Canvas Three.js', path: 'src/components/universe/UniverseCanvas3D.tsx', module: '3D Knowledge Universe', symbol: 'UniverseCanvas3D', description: 'Renderiza nodos, enlaces, particulas activas y controles rotar/zoom/pan/click.' },
];

function refs(...extra: typeof sharedReferences) {
  return [...sharedReferences, ...extra];
}

export const universeClusters: UniverseCluster[] = [
  { id: 'sat', label: 'SAT Cluster', color: '#32e6ff', description: 'Codificaciones logicas, solucionadores y sistemas de prueba cercanos a SAT.' },
  { id: 'complexity', label: 'Complexity Cluster', color: '#b682ff', description: 'Clases de complejidad y modelos no uniformes, probabilisticos y espaciales.' },
  { id: 'proof', label: 'Proof Cluster', color: '#ffd166', description: 'Reducciones, completitud y pruebas que conectan problemas y clases.' },
];

export const universeNodes: UniverseNode[] = [
  { id: 'sat', label: 'SAT', cluster: 'sat', position: [-5, 1.1, 0], truth: 'SAT pregunta si una formula booleana tiene una asignacion satisfactoria.', misconception: 'Creer que SAT es siempre intratable en todas sus variantes.', correction: 'Algunas restricciones como 2-SAT tienen algoritmos polinomiales.', severity: 'high', relatedModules: ['SAT / Z3 Lab', 'Reduction Lab', 'Proof Lab'], codeReferences: refs({ label: 'SAT Lab', path: 'src/modules/sat/SatZ3Lab.tsx', module: 'SAT / Z3 Lab', symbol: 'SatZ3Lab', description: 'Explora CNF, DPLL y comparacion con Z3.' }) },
  { id: 'two-sat', label: '2-SAT', cluster: 'sat', position: [-6.7, -0.5, 1], truth: '2-SAT esta en P via componentes fuertemente conexas en el grafo de implicacion.', misconception: 'Pensar que todo SAT restringido sigue siendo NP-completo.', correction: '2-SAT es un caso especial tratable.', severity: 'medium', relatedModules: ['Proof Lab', 'Complexity Explorer'], codeReferences: refs({ label: 'Prueba 2-SAT', path: 'src/components/proof/TwoSatProofVisualizer.tsx', module: 'Proof Lab', symbol: 'TwoSatProofVisualizer', description: 'Visualiza la prueba de 2-SAT en P.' }) },
  { id: 'three-sat', label: '3-SAT', cluster: 'sat', position: [-6.6, 1.8, -1.1], truth: '3-SAT es NP-completo.', misconception: 'Creer que 3 literales por clausula lo vuelve simple.', correction: 'La restriccion a 3 literales preserva NP-completitud.', severity: 'high', relatedModules: ['Reduction Lab'], codeReferences: refs({ label: 'Reducciones', path: 'src/modules/reduction/reductionsData.ts', module: 'Reduction Lab', symbol: 'reductionExamples', description: 'Incluye reducciones SAT a 3-SAT y desde 3-SAT.' }) },
  { id: 'cnf', label: 'CNF', cluster: 'sat', position: [-4.5, 2.9, 1.1], truth: 'CNF representa formulas como conjuncion de clausulas.', misconception: 'Confundir formato CNF con una solucion del problema.', correction: 'CNF es una representacion; la satisfacibilidad sigue siendo la pregunta.', severity: 'low', relatedModules: ['SAT / Z3 Lab'], codeReferences: refs({ label: 'CNF Builder', path: 'src/components/sat/CnfBuilder.tsx', module: 'SAT / Z3 Lab', symbol: 'CnfBuilder', description: 'Construye y edita formulas CNF.' }) },
  { id: 'dpll', label: 'DPLL', cluster: 'sat', position: [-3.3, 0.1, -1.2], truth: 'DPLL explora asignaciones con propagacion y backtracking.', misconception: 'Pensar que DPLL elimina la complejidad exponencial en peor caso.', correction: 'Puede ser muy efectivo, pero no prueba P=NP.', severity: 'high', relatedModules: ['SAT / Z3 Lab'], codeReferences: refs({ label: 'DPLL educativo', path: 'src/components/sat/DpllTracePanel.tsx', module: 'SAT / Z3 Lab', symbol: 'DpllTracePanel', description: 'Muestra trazas educativas de DPLL.' }) },
  { id: 'z3', label: 'Z3', cluster: 'sat', position: [-3.9, -1.7, 0.8], truth: 'Z3 es un solver SMT industrial usado aqui solo como comparador backend existente.', misconception: 'Creer que un solver rapido resuelve P vs NP.', correction: 'Rendimiento practico no equivale a prueba de complejidad general.', severity: 'critical', relatedModules: ['SAT / Z3 Lab'], codeReferences: refs({ label: 'Backend Z3 existente', path: 'backend/app/main.py', module: 'SAT / Z3 Lab', symbol: 'solve_z3', description: 'Endpoint FastAPI ya existente para comparar con Z3.' }) },
  { id: 'resolution', label: 'Resolution', cluster: 'sat', position: [-4.8, -2.4, -1], truth: 'Resolution es un sistema de prueba proposicional para derivar contradicciones.', misconception: 'Creer que limites en Resolution resuelven automaticamente NP vs co-NP.', correction: 'Resolution es un sistema restringido; sus limites son evidencia, no solucion general.', severity: 'high', relatedModules: ['Proof Complexity Lab'], codeReferences: refs({ label: 'Resolution visualizer', path: 'src/components/proof-complexity/ResolutionVisualizer.tsx', module: 'Proof Complexity Lab', symbol: 'ResolutionVisualizer', description: 'Visualiza derivaciones por Resolution.' }) },
  { id: 'grobner-encoding', label: 'Gröbner encoding', cluster: 'sat', position: [-7.6, 0.9, -2], truth: 'SAT puede codificarse como sistema polinomial con ecuaciones booleanas.', misconception: 'Creer que pasar a algebra vuelve SAT facil automaticamente.', correction: 'La dificultad puede reaparecer en bases de Gröbner enormes.', severity: 'critical', relatedModules: ['Algebraic / Gröbner Lab'], codeReferences: refs({ label: 'Algebraic Lab', path: 'src/modules/algebraic/AlgebraicGrobnerLab.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'AlgebraicGrobnerLab', description: 'Explora SAT como sistema algebraico.' }) },
  { id: 'p', label: 'P', cluster: 'complexity', position: [1.2, 0.8, 0], truth: 'P contiene problemas decidibles en tiempo polinomial determinista.', misconception: 'Confundir P con problemas faciles en todo sentido practico.', correction: 'Polinomial puede tener constantes o exponentes grandes.', severity: 'medium', relatedModules: ['Complexity Explorer'], codeReferences: refs({ label: 'Complexity data', path: 'src/modules/complexity/complexityData.ts', module: 'Complexity Explorer', symbol: 'complexityConcepts', description: 'Define P y clases relacionadas.' }) },
  { id: 'np', label: 'NP', cluster: 'complexity', position: [3, 1.2, -0.8], truth: 'NP contiene problemas con certificados verificables en tiempo polinomial.', misconception: 'Creer que NP significa no polinomial.', correction: 'NP significa nondeterministic polynomial time.', severity: 'critical', relatedModules: ['Complexity Explorer', 'Proof Lab'], codeReferences: refs({ label: 'Proof SAT in NP', path: 'src/components/proof/SatInNpProofVisualizer.tsx', module: 'Proof Lab', symbol: 'SatInNpProofVisualizer', description: 'Visualiza SAT en NP mediante certificados.' }) },
  { id: 'co-np', label: 'co-NP', cluster: 'complexity', position: [3.6, -0.8, 1.1], truth: 'co-NP contiene complementos de lenguajes en NP.', misconception: 'Asumir NP=co-NP o NP≠co-NP como demostrado.', correction: 'NP vs co-NP sigue abierto.', severity: 'high', relatedModules: ['Open Frontier Lab'], codeReferences: refs({ label: 'Frontier data', path: 'src/modules/frontier/frontierData.ts', module: 'Open Frontier Lab', symbol: 'frontierTopics', description: 'Registra NP vs co-NP como problema abierto.' }) },
  { id: 'pspace', label: 'PSPACE', cluster: 'complexity', position: [5.3, 1.8, 1.4], truth: 'PSPACE permite espacio polinomial y contiene NP.', misconception: 'Confundir PSPACE con EXP.', correction: 'Espacio polinomial puede permitir mucho tiempo, pero no es la definicion de EXP.', severity: 'medium', relatedModules: ['Open Frontier Lab', 'Complexity Explorer'], codeReferences: refs({ label: 'Frontier P vs PSPACE', path: 'src/modules/frontier/frontierData.ts', module: 'Open Frontier Lab', symbol: 'frontierTopics', description: 'Incluye P vs PSPACE como problema abierto.' }) },
  { id: 'bpp', label: 'BPP', cluster: 'complexity', position: [2.4, 3.2, 1.2], truth: 'BPP permite error acotado con aleatoriedad y amplificacion.', misconception: 'Creer que aleatoriedad siempre da mas poder absoluto.', correction: 'P vs BPP y derandomizacion siguen conectados a PRGs y lower bounds.', severity: 'high', relatedModules: ['Randomization & Derandomization Lab'], codeReferences: refs({ label: 'Randomization Lab', path: 'src/modules/randomization/RandomizationDerandomizationLab.tsx', module: 'Randomization & Derandomization Lab', symbol: 'RandomizationDerandomizationLab', description: 'Explora BPP, RP, co-RP y ZPP.' }) },
  { id: 'ac0', label: 'AC⁰', cluster: 'complexity', position: [0.8, -1.7, -1.3], truth: 'AC⁰ es una clase de circuitos de profundidad constante con fan-in no acotado.', misconception: 'Creer que lower bounds para AC⁰ son lower bounds para circuitos generales.', correction: 'AC⁰ es un modelo restringido.', severity: 'high', relatedModules: ['Circuit Complexity Lab'], codeReferences: refs({ label: 'Circuit Lab', path: 'src/modules/circuits/CircuitComplexityLab.tsx', module: 'Circuit Complexity Lab', symbol: 'CircuitComplexityLab', description: 'Explora AC0, NC, P/poly y metricas de circuitos.' }) },
  { id: 'p-poly', label: 'P/poly', cluster: 'complexity', position: [4.8, -1.5, -1.2], truth: 'P/poly modela familias de circuitos polinomiales no uniformes.', misconception: 'Confundir no uniformidad con algoritmos uniformes eficientes.', correction: 'Consejos/circuitos por tamaño no son lo mismo que un unico algoritmo uniforme.', severity: 'medium', relatedModules: ['Circuit Complexity Lab'], codeReferences: refs({ label: 'Circuit data', path: 'src/modules/circuits/circuitData.ts', module: 'Circuit Complexity Lab', symbol: 'circuitModels', description: 'Describe modelos AC0, NC y P/poly.' }) },
  { id: 'exp', label: 'EXP', cluster: 'complexity', position: [6.2, 0.2, -0.2], truth: 'EXP permite tiempo exponencial determinista.', misconception: 'Pensar que EXP es solo una etiqueta para problemas practicamente lentos.', correction: 'EXP es una clase formal de tiempo exponencial.', severity: 'low', relatedModules: ['Complexity Explorer'], codeReferences: refs({ label: 'Complexity concepts', path: 'src/modules/complexity/complexityData.ts', module: 'Complexity Explorer', symbol: 'complexityConcepts', description: 'Incluye EXP y relaciones con otras clases.' }) },
  { id: 'cook-levin', label: 'Cook-Levin', cluster: 'proof', position: [-0.8, -4.3, 0.2], truth: 'Cook-Levin demuestra que SAT es NP-completo.', misconception: 'Creer que NP-completitud prueba P≠NP.', correction: 'NP-completitud muestra universalidad dentro de NP, no separacion.', severity: 'critical', relatedModules: ['Proof Lab', 'Reduction Lab'], codeReferences: refs({ label: 'Proof Lab', path: 'src/modules/proof/ProofLab.tsx', module: 'Proof Lab', symbol: 'ProofLab', description: 'Incluye pruebas sobre SAT en NP y 2-SAT en P.' }) },
  { id: 'karp-reductions', label: 'Karp reductions', cluster: 'proof', position: [0.9, -5.2, -1.4], truth: 'Las reducciones many-one polinomiales transfieren dificultad entre problemas.', misconception: 'Invertir la direccion de una reduccion.', correction: 'A ≤p B significa que resolver B permite resolver A.', severity: 'critical', relatedModules: ['Reduction Lab'], codeReferences: refs({ label: 'Reduction Lab', path: 'src/modules/reduction/ReductionLab.tsx', module: 'Reduction Lab', symbol: 'ReductionLab', description: 'Visualiza reducciones SAT, 3-SAT, CLIQUE, VERTEX-COVER y SUBSET-SUM.' }) },
  { id: 'two-sat-in-p', label: '2-SAT ∈ P', cluster: 'proof', position: [-2.3, -5.8, 1.4], truth: 'La prueba usa SCCs en el grafo de implicacion.', misconception: 'Confundir 2-SAT con 3-SAT.', correction: '2-SAT es tratable; 3-SAT es NP-completo.', severity: 'high', relatedModules: ['Proof Lab'], codeReferences: refs({ label: 'Two SAT proof', path: 'src/components/proof/TwoSatProofVisualizer.tsx', module: 'Proof Lab', symbol: 'TwoSatProofVisualizer', description: 'Visualizador paso a paso de 2-SAT en P.' }) },
  { id: 'subset-sum-npc', label: 'SUBSET-SUM NP-completo', cluster: 'proof', position: [2.7, -4.5, 1.1], truth: 'SUBSET-SUM es NP-completo mediante reducciones polinomiales.', misconception: 'Creer que numeros grandes implican automaticamente dificultad por longitud numerica.', correction: 'La complejidad depende de la codificacion y del tamaño de entrada.', severity: 'medium', relatedModules: ['Reduction Lab'], codeReferences: refs({ label: 'Subset Sum reduction', path: 'src/components/reduction/ReductionVisualizer.tsx', module: 'Reduction Lab', symbol: 'ReductionVisualizer', description: 'Visualiza reducciones incluyendo SUBSET-SUM.' }) },
  { id: 'cutting-planes', label: 'Cutting Planes', cluster: 'proof', position: [0.2, -3.6, 2.5], truth: 'Cutting Planes es un sistema de prueba basado en desigualdades lineales enteras.', misconception: 'Asumir que todo sistema de prueba captura NP vs co-NP completo.', correction: 'Cada sistema modela un fragmento; los limites no resuelven automaticamente el caso general.', severity: 'high', relatedModules: ['Proof Complexity Lab'], codeReferences: refs({ label: 'Proof complexity data', path: 'src/modules/proof-complexity/proofComplexityData.ts', module: 'Proof Complexity Lab', symbol: 'proofComplexityTopics', description: 'Incluye Cutting Planes y otros sistemas de prueba.' }) },
];

export const universeLinks: UniverseLink[] = [
  { source: 'sat', target: 'cnf', label: 'represented as', strength: 'definition' },
  { source: 'sat', target: 'dpll', label: 'solved by search', strength: 'algorithm' },
  { source: 'sat', target: 'z3', label: 'solver comparison', strength: 'algorithm' },
  { source: 'sat', target: 'three-sat', label: 'restricted NP-complete form', strength: 'reduction' },
  { source: 'sat', target: 'two-sat', label: 'tractable restriction', strength: 'definition' },
  { source: 'sat', target: 'resolution', label: 'proof system', strength: 'proof' },
  { source: 'sat', target: 'grobner-encoding', label: 'algebraic encoding', strength: 'encoding' },
  { source: 'sat', target: 'np', label: 'SAT ∈ NP', strength: 'proof' },
  { source: 'three-sat', target: 'karp-reductions', label: 'source of reductions', strength: 'reduction' },
  { source: 'two-sat', target: 'two-sat-in-p', label: 'proved by SCC', strength: 'proof' },
  { source: 'resolution', target: 'cutting-planes', label: 'proof complexity systems', strength: 'proof' },
  { source: 'p', target: 'np', label: 'P ⊆ NP', strength: 'definition' },
  { source: 'np', target: 'co-np', label: 'open relation', strength: 'definition' },
  { source: 'np', target: 'pspace', label: 'NP ⊆ PSPACE', strength: 'definition' },
  { source: 'p', target: 'bpp', label: 'P ⊆ BPP', strength: 'definition' },
  { source: 'ac0', target: 'p-poly', label: 'circuit models', strength: 'definition' },
  { source: 'p-poly', target: 'np', label: 'lower bound frontier', strength: 'proof' },
  { source: 'pspace', target: 'exp', label: 'resource hierarchy context', strength: 'definition' },
  { source: 'cook-levin', target: 'sat', label: 'SAT NP-complete', strength: 'proof' },
  { source: 'cook-levin', target: 'np', label: 'universal verifier encoding', strength: 'proof' },
  { source: 'karp-reductions', target: 'subset-sum-npc', label: 'NP-completeness chain', strength: 'reduction' },
  { source: 'karp-reductions', target: 'three-sat', label: 'reductions from 3-SAT', strength: 'reduction' },
  { source: 'two-sat-in-p', target: 'p', label: 'membership in P', strength: 'proof' },
  { source: 'bpp', target: 'p', label: 'derandomization frontier', strength: 'definition' },
  { source: 'grobner-encoding', target: 'resolution', label: 'proof/algebra bridge', strength: 'encoding' },
];

export const defaultUniverseNodeId = 'sat' satisfies UniverseNodeId;
export const defaultUniverseRouteTargetId = 'np' satisfies UniverseNodeId;

export function getUniverseNode(nodeId: string) {
  return universeNodes.find((node) => node.id === nodeId) ?? universeNodes[0];
}

export function getUniverseCluster(clusterId: string) {
  return universeClusters.find((cluster) => cluster.id === clusterId) ?? universeClusters[0];
}

export function findUniverseRoute(source: UniverseNodeId, target: UniverseNodeId): UniverseNodeId[] {
  if (source === target) return [source];
  const adjacency = new Map<UniverseNodeId, UniverseNodeId[]>();
  universeNodes.forEach((node) => adjacency.set(node.id, []));
  universeLinks.forEach((link) => {
    adjacency.get(link.source)?.push(link.target);
    adjacency.get(link.target)?.push(link.source);
  });

  const queue: UniverseNodeId[][] = [[source]];
  const visited = new Set<UniverseNodeId>([source]);
  while (queue.length > 0) {
    const route = queue.shift();
    if (!route) continue;
    const last = route.at(-1);
    if (!last) continue;
    for (const next of adjacency.get(last) ?? []) {
      if (visited.has(next)) continue;
      const nextRoute = [...route, next];
      if (next === target) return nextRoute;
      visited.add(next);
      queue.push(nextRoute);
    }
  }
  return [source];
}
