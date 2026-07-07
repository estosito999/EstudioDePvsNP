import { complexityConcepts } from './complexityData';
import { complexityRelations } from './complexityRelations';
import { getVisibleComplexityConcepts, getVisibleComplexityRelations } from './complexityGraphAnalysis';
import type { ComplexityExplorerToggles, ComplexityRelation, ConceptNode } from './complexityTypes';

export type ComplexityUniverseCategory =
  | 'complexity-classes'
  | 'problems'
  | 'formal-languages'
  | 'decidability'
  | 'circuits'
  | 'randomization'
  | 'open-problems';

export type ComplexityUniverseNode = {
  id: string;
  name: string;
  category: ComplexityUniverseCategory;
  truthStatus: ConceptNode['truthStatus'];
  kind: ConceptNode['kind'];
  layer: ConceptNode['layer'];
  value: number;
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
};

export type ComplexityUniverseLink = {
  id: string;
  source: string | ComplexityUniverseNode;
  target: string | ComplexityUniverseNode;
  label: string;
  kind: ComplexityRelation['kind'];
  truthStatus: ComplexityRelation['truthStatus'];
  primary: boolean;
};

export const universeCategoryMeta: Record<ComplexityUniverseCategory, { label: string; color: string; center: { x: number; y: number; z: number } }> = {
  'complexity-classes': { label: 'complexity classes', color: '#32e6ff', center: { x: 0, y: 40, z: 0 } },
  problems: { label: 'problems', color: '#ff4d6d', center: { x: 90, y: -25, z: -10 } },
  'formal-languages': { label: 'formal languages', color: '#6eff9e', center: { x: -120, y: -35, z: -20 } },
  decidability: { label: 'decidability', color: '#ffd166', center: { x: -95, y: 50, z: 35 } },
  circuits: { label: 'circuits', color: '#b682ff', center: { x: 55, y: -80, z: 45 } },
  randomization: { label: 'randomization', color: '#20c997', center: { x: 120, y: 60, z: 35 } },
  'open-problems': { label: 'open problems', color: '#ff9f1c', center: { x: 35, y: 95, z: -45 } },
};

const formalLanguageIds = new Set([
  'Finite languages',
  'Regular',
  'Deterministic Context-Free',
  'Context-free',
  'Context-sensitive',
  'LBA',
]);

const decidabilityIds = new Set([
  'All Languages',
  'Finitely describable',
  'Not finitely describable',
  'Recognizable / RE',
  'co-RE',
  'Decidable / Recursive',
  'Undecidable',
  'Halting Problem / H',
  'Complement of Halting / Hbar',
  'Turing degrees',
  'Presburger arithmetic',
  'RE-complete',
]);

const openRelationNodeIds = new Set(
  complexityRelations
    .filter((relation) => relation.truthStatus === 'open')
    .flatMap((relation) => [relation.source, relation.target]),
);

const primaryRelationIds = new Set([
  'p-subset-np',
  'np-subset-pspace',
  'pspace-subset-exp',
  'exp-subset-expspace',
  'expspace-subset-decidable',
  'decidable-subset-re',
  'decidable-subset-core',
  're-subset-finitely-describable',
  'finitely-describable-subset-all',
  'finite-subset-regular',
  'regular-subset-dcfl',
  'dcfl-subset-cfl',
  'cfl-subset-csl',
  'csl-subset-decidable',
  '2sat-in-p',
  'sat-in-np',
  'sat-npc',
  'qbf-pspace',
  'qbf-pspace-complete',
  'go-exptime-complete',
  'halting-in-re',
  'halting-not-decidable',
  'hbar-not-re',
  'parity-not-ac0',
]);

export function getUniverseCategory(concept: ConceptNode): ComplexityUniverseCategory {
  if (concept.layer === 'circuit') return 'circuits';
  if (concept.layer === 'randomized') return 'randomization';
  if (formalLanguageIds.has(concept.id)) return 'formal-languages';
  if (decidabilityIds.has(concept.id)) return 'decidability';
  if (openRelationNodeIds.has(concept.id) || concept.truthStatus === 'open') return 'open-problems';
  if (concept.kind === 'problem') return 'problems';
  return 'complexity-classes';
}

export function isPrimaryUniverseRelation(relation: ComplexityRelation) {
  return primaryRelationIds.has(relation.id) || relation.kind === 'membership' || (relation.kind === 'inclusion' && relation.truthStatus === 'theorem');
}

function clusteredPosition(concept: ConceptNode) {
  const category = getUniverseCategory(concept);
  const center = universeCategoryMeta[category].center;
  const angle = (complexityConcepts.findIndex((item) => item.id === concept.id) + 1) * 1.77;
  const radius = 16 + (concept.id.length % 7) * 4;
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle * 0.7) * radius * 0.72,
    z: center.z + Math.sin(angle) * radius,
  };
}

function planarPosition(concept: ConceptNode) {
  return {
    x: (concept.position.x - 260) * 0.16,
    y: (320 - concept.position.y) * 0.16,
    z: ((concept.id.length % 9) - 4) * 8,
  };
}

export function buildComplexityUniverseGraph(toggles: ComplexityExplorerToggles, clusterMode: boolean) {
  const visibleConcepts = getVisibleComplexityConcepts(toggles);
  const visibleConceptIds = new Set(visibleConcepts.map((concept) => concept.id));
  const visibleRelations = getVisibleComplexityRelations(toggles).filter((relation) => (
    isPrimaryUniverseRelation(relation)
    || visibleConceptIds.has(relation.source)
    || visibleConceptIds.has(relation.target)
  ));

  const nodes: ComplexityUniverseNode[] = visibleConcepts.map((concept) => {
    const position = clusterMode ? clusteredPosition(concept) : planarPosition(concept);
    return {
      id: concept.id,
      name: concept.label,
      category: getUniverseCategory(concept),
      truthStatus: concept.truthStatus,
      kind: concept.kind,
      layer: concept.layer,
      value: concept.truthStatus === 'theorem' ? 7 : concept.kind === 'problem' ? 5 : 4,
      ...position,
    };
  });

  const links: ComplexityUniverseLink[] = visibleRelations.map((relation) => ({
    id: relation.id,
    source: relation.source,
    target: relation.target,
    label: relation.label,
    kind: relation.kind,
    truthStatus: relation.truthStatus,
    primary: isPrimaryUniverseRelation(relation),
  }));

  return { nodes, links };
}

export function endpointId(endpoint: string | ComplexityUniverseNode | undefined) {
  if (!endpoint) return '';
  return typeof endpoint === 'object' ? endpoint.id : endpoint;
}

export function getNeighborIds(nodeId: string, links: ComplexityUniverseLink[]) {
  const neighbors = new Set<string>();
  links.forEach((link) => {
    const source = endpointId(link.source);
    const target = endpointId(link.target);
    if (source === nodeId) neighbors.add(target);
    if (target === nodeId) neighbors.add(source);
  });
  return neighbors;
}

export function isIncidentLink(nodeId: string, link: ComplexityUniverseLink) {
  return endpointId(link.source) === nodeId || endpointId(link.target) === nodeId;
}
