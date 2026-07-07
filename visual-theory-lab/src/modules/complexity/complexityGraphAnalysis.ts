import { complexityConcepts } from './complexityData';
import { complexityRelations } from './complexityRelations';
import type {
  CodeReference,
  ComplexityExplorerToggles,
  ComplexityRelation,
  ComplexityRelationKind,
  ConceptLayer,
  ConceptNode,
  TruthStatus,
} from './complexityTypes';

export type RelationVisualKind = 'inclusion' | 'reduction' | 'membership' | 'open' | 'separation' | 'conceptual';

export type GraphDiagnostics = {
  totalNodes: number;
  totalEdges: number;
  visibleNodes: number;
  visibleEdges: number;
  visibleTheorems: number;
  visibleOpenProblems: number;
  activeFilters: string[];
};

const layerToggleMap: Record<ConceptLayer, keyof ComplexityExplorerToggles> = {
  basic: 'showBasic',
  randomized: 'showRandomized',
  circuit: 'showCircuit',
  advanced: 'showAdvanced',
  problem: 'showProblems',
};

export const relationVisualLabels: Record<RelationVisualKind, string> = {
  inclusion: 'Inclusión',
  reduction: 'Reducción polinomial',
  membership: 'Pertenencia',
  open: 'Problema abierto',
  separation: 'Separación conocida',
  conceptual: 'Relación conceptual',
};

export const relationTruthLabels: Record<TruthStatus, string> = {
  definition: 'DEFINICION',
  theorem: 'TEOREMA',
  experiment: 'EXPERIMENTO',
  intuition: 'INTUICION',
  conjecture: 'CONJETURA',
  open: 'ABIERTO',
  common_error: 'ERROR COMUN',
};

export function isLayerVisible(layer: ConceptLayer, toggles: ComplexityExplorerToggles) {
  return toggles[layerToggleMap[layer]];
}

export function getVisibleComplexityConcepts(toggles: ComplexityExplorerToggles) {
  return complexityConcepts.filter((concept) => isLayerVisible(concept.layer, toggles));
}

export function isRelationKindVisible(relation: ComplexityRelation, toggles: ComplexityExplorerToggles) {
  if (relation.kind === 'inclusion') return toggles.inclusions;
  return toggles.reductions;
}

export function getVisibleComplexityRelations(toggles: ComplexityExplorerToggles) {
  const visibleConceptIds = new Set(getVisibleComplexityConcepts(toggles).map((concept) => concept.id));
  return complexityRelations.filter((relation) => (
    isRelationKindVisible(relation, toggles)
    && isLayerVisible(relation.layer, toggles)
    && visibleConceptIds.has(relation.source)
    && visibleConceptIds.has(relation.target)
  ));
}

export function getRelationVisualKind(relation: ComplexityRelation): RelationVisualKind {
  if (relation.truthStatus === 'open') return 'open';
  if (relation.kind === 'inclusion') return 'inclusion';
  if (relation.kind === 'reduction') return 'reduction';
  if (relation.kind === 'membership') return 'membership';
  if (relation.kind === 'separation') return 'separation';
  return 'conceptual';
}

export function getRelationTypeLabel(relation: ComplexityRelation) {
  return relationVisualLabels[getRelationVisualKind(relation)];
}

export function getRelationCodeReferences(relation: ComplexityRelation): CodeReference[] {
  const source = complexityConcepts.find((concept) => concept.id === relation.source);
  const target = complexityConcepts.find((concept) => concept.id === relation.target);
  return [
    {
      label: 'Definicion de relacion',
      path: 'src/modules/complexity/complexityRelations.ts',
      module: 'Complexity Explorer',
      symbol: 'complexityRelations',
      description: `Declara la relacion ${relation.label}, su tipo, estado de verdad y endpoints.`,
    },
    {
      label: 'Analisis del grafo',
      path: 'src/modules/complexity/complexityGraphAnalysis.ts',
      module: 'Complexity Explorer',
      symbol: 'getRelationTypeLabel / getVisibleComplexityRelations',
      description: 'Calcula tipo visual, conteos, filtros activos y referencias para el inspector.',
    },
    {
      label: 'Renderizado de aristas',
      path: 'src/components/graph/ComplexityGraph.tsx',
      module: 'Complexity Explorer',
      symbol: 'ComplexityGraph',
      description: 'Renderiza aristas, labels, tooltips, handles top/bottom/left/right y seleccion de relaciones.',
    },
    ...(source?.codeReferences?.slice(0, 1) ?? []),
    ...(target?.codeReferences?.slice(0, 1) ?? []),
    ...(relation.codeReferences ?? []),
  ];
}

export function getRelationExplanation(relation: ComplexityRelation) {
  if (relation.explanation) return relation.explanation;
  if (relation.truthStatus === 'open') return 'Esta arista marca una relacion abierta: el grafo muestra la frontera conceptual, no una demostracion de igualdad o separacion.';
  if (relation.kind === 'inclusion') return 'Indica contencion de clases: todo lenguaje o problema de la fuente pertenece tambien al destino bajo las definiciones mostradas.';
  if (relation.kind === 'membership') return 'Indica que el problema fuente pertenece a la clase destino.';
  if (relation.kind === 'reduction') return 'Indica una reduccion polinomial o una relacion de completitud usada para transferir dificultad.';
  if (relation.kind === 'separation') return 'Indica una separacion demostrada dentro del modelo o clase especificada.';
  return 'Relacion conceptual usada para ubicar clases, dualidades o fronteras tecnicas en el mapa.';
}

export function getRelationExample(relation: ComplexityRelation) {
  if (relation.example) return relation.example;
  if (relation.id === 'p-subset-np') return 'Si un algoritmo encuentra una solucion en tiempo polinomial, el mismo resultado puede verificarse en tiempo polinomial.';
  if (relation.id === '2sat-in-p') return '2-SAT se decide con SCCs en el grafo de implicacion, por eso aparece conectado hacia P.';
  if (relation.id === 'sat-in-np') return 'Una asignacion booleana satisface o no una formula SAT y se verifica recorriendo las clausulas.';
  if (relation.id === 'p-vs-np-open') return 'No sabemos si resolver SAT eficientemente es posible para todas las instancias.';
  if (relation.id === 'np-conp-open') return 'No sabemos si todo certificado eficiente de existencia tiene una contraparte eficiente para no-existencia.';
  return `${relation.source} → ${relation.target}: ${relation.label}`;
}

export function getRelationTooltip(relation: ComplexityRelation) {
  return `${relation.label} | ${getRelationTypeLabel(relation)} | ${relationTruthLabels[relation.truthStatus]}`;
}

export function getActiveGraphFilters(toggles: ComplexityExplorerToggles) {
  const activeFilters: string[] = [];
  if (toggles.inclusions) activeFilters.push('inclusions');
  if (toggles.reductions) activeFilters.push('reductions');
  if (toggles.showBasic) activeFilters.push('basic');
  if (toggles.showRandomized) activeFilters.push('randomized');
  if (toggles.showCircuit) activeFilters.push('circuit');
  if (toggles.showAdvanced) activeFilters.push('advanced');
  if (toggles.showProblems) activeFilters.push('problems');
  if (toggles.showTruthStatus) activeFilters.push('truth');
  if (toggles.showMisconceptions) activeFilters.push('misconceptions');
  return activeFilters;
}

export function getGraphDiagnostics(toggles: ComplexityExplorerToggles): GraphDiagnostics {
  const visibleConcepts = getVisibleComplexityConcepts(toggles);
  const visibleRelations = getVisibleComplexityRelations(toggles);
  const conceptById = new Map<string, ConceptNode>(visibleConcepts.map((concept) => [concept.id, concept]));

  return {
    totalNodes: complexityConcepts.length,
    totalEdges: complexityRelations.length,
    visibleNodes: visibleConcepts.length,
    visibleEdges: visibleRelations.length,
    visibleTheorems: visibleRelations.filter((relation) => relation.truthStatus === 'theorem').length,
    visibleOpenProblems: visibleRelations.filter((relation) => relation.truthStatus === 'open').length
      + visibleConcepts.filter((concept) => concept.truthStatus === 'open' || conceptById.get(concept.id)?.truthStatus === 'open').length,
    activeFilters: getActiveGraphFilters(toggles),
  };
}
