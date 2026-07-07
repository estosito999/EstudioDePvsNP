import { complexityConcepts, getComplexityConcept } from './complexityData';
import type { CodeReference } from './complexityTypes';

export type VennGroupId = 'formal-languages' | 'complexity-decidability' | 'grammars';

export type VennSetId =
  | 'formal-re'
  | 'formal-recursive'
  | 'Finite languages'
  | 'Regular'
  | 'Deterministic Context-Free'
  | 'Context-free'
  | 'Context-sensitive'
  | 'P'
  | 'NP'
  | 'PSPACE'
  | 'EXP'
  | 'EXPSPACE'
  | 'Decidable / Recursive'
  | 'Recognizable / RE'
  | 'co-NP'
  | 'NP-Complete'
  | 'NP-Hard'
  | 'PSPACE-complete'
  | 'BPP'
  | 'P/poly'
  | 'grammar-unrestricted'
  | 'grammar-context-sensitive'
  | 'grammar-context-free'
  | 'grammar-right-linear';

export type VennSetNode = {
  id: VennSetId;
  label: string;
  group: VennGroupId;
  parentId?: VennSetId;
  childIds: VennSetId[];
  markerConceptIds: string[];
  exclusiveConceptIds: string[];
  exclusiveLabel: string;
  note: string;
  visualRole?: 'nested' | 'overlay';
  visualHint?: string;
};

export const vennGroups: Array<{ id: VennGroupId; title: string; rootIds: VennSetId[]; note: string }> = [
  {
    id: 'formal-languages',
    title: 'Formal languages',
    rootIds: ['formal-re'],
    note: 'Jerarquia clasica de lenguajes formales: Finite ⊆ Regular ⊆ Deterministic CFL ⊆ CFL ⊆ Context-Sensitive ⊆ Recursive ⊆ RE.',
  },
  {
    id: 'complexity-decidability',
    title: 'Complexity / decidability',
    rootIds: ['Recognizable / RE'],
    note: 'Muestra inclusiones conocidas. Los marcadores de completitud no prueban separaciones abiertas como P vs NP, NP vs PSPACE o PSPACE vs EXPTIME.',
  },
  {
    id: 'grammars',
    title: 'Grammars',
    rootIds: ['grammar-unrestricted'],
    note: 'Jerarquia de Chomsky para gramaticas: right-linear ⊆ context-free ⊆ context-sensitive ⊆ unrestricted.',
  },
];

export const vennSets: VennSetNode[] = [
  {
    id: 'formal-re',
    label: 'Recursively Enumerable / RE',
    group: 'formal-languages',
    childIds: ['formal-recursive'],
    markerConceptIds: ['Recognizable / RE', 'Halting Problem / H'],
    exclusiveConceptIds: ['Recognizable / RE', 'Halting Problem / H', 'RE-complete'],
    exclusiveLabel: 'RE \\ Recursive',
    note: 'Lenguajes enumerables/reconocibles. Incluyen lenguajes como Halting que son reconocibles pero no decidibles.',
  },
  {
    id: 'formal-recursive',
    label: 'Recursive',
    group: 'formal-languages',
    parentId: 'formal-re',
    childIds: ['Context-sensitive'],
    markerConceptIds: ['Decidable / Recursive'],
    exclusiveConceptIds: ['Decidable / Recursive', 'Presburger arithmetic'],
    exclusiveLabel: 'Recursive \\ Context-Sensitive',
    note: 'Lenguajes decidibles por una maquina que siempre se detiene. Context-sensitive es una subclase decidible.',
  },
  {
    id: 'Context-sensitive',
    label: 'Context-Sensitive',
    group: 'formal-languages',
    parentId: 'formal-recursive',
    childIds: ['Context-free'],
    markerConceptIds: ['LBA'],
    exclusiveConceptIds: ['Context-sensitive', 'LBA'],
    exclusiveLabel: 'Context-Sensitive \\ Context-Free',
    note: 'Incluye lenguajes reconocidos por LBA. Ejemplo clasico de la region fuera de CFL: a^n b^n c^n.',
  },
  {
    id: 'Context-free',
    label: 'Context-Free',
    group: 'formal-languages',
    parentId: 'Context-sensitive',
    childIds: ['Deterministic Context-Free'],
    markerConceptIds: [],
    exclusiveConceptIds: ['Context-free'],
    exclusiveLabel: 'Context-Free \\ Deterministic Context-Free',
    note: 'Ejemplo conceptual: ww^R como lenguaje context-free no determinista.',
  },
  {
    id: 'Deterministic Context-Free',
    label: 'Deterministic Context-Free',
    group: 'formal-languages',
    parentId: 'Context-free',
    childIds: ['Regular'],
    markerConceptIds: [],
    exclusiveConceptIds: ['Deterministic Context-Free'],
    exclusiveLabel: 'Deterministic Context-Free \\ Regular',
    note: 'Ejemplo conceptual: a^n b^n.',
  },
  {
    id: 'Regular',
    label: 'Regular',
    group: 'formal-languages',
    parentId: 'Deterministic Context-Free',
    childIds: ['Finite languages'],
    markerConceptIds: [],
    exclusiveConceptIds: ['Regular'],
    exclusiveLabel: 'Regular \\ Finite',
    note: 'Ejemplo conceptual: a*.',
  },
  {
    id: 'Finite languages',
    label: 'Finite',
    group: 'formal-languages',
    parentId: 'Regular',
    childIds: [],
    markerConceptIds: [],
    exclusiveConceptIds: ['Finite languages'],
    exclusiveLabel: 'Finite',
    note: 'Ejemplo conceptual: {a,b}. Todo lenguaje finito es regular.',
  },
  {
    id: 'Recognizable / RE',
    label: 'Recognizable / RE',
    group: 'complexity-decidability',
    childIds: ['Decidable / Recursive'],
    markerConceptIds: ['Halting Problem / H', 'Complement of Halting / Hbar', 'RE-complete'],
    exclusiveConceptIds: ['Recognizable / RE', 'Halting Problem / H', 'RE-complete'],
    exclusiveLabel: 'RE \\ Decidable',
    note: 'Halting Problem es RE-complete y reconocible, pero no decidible. Hbar se muestra como marcador de frontera: no pertenece a RE.',
  },
  {
    id: 'Decidable / Recursive',
    label: 'Decidable / Recursive',
    group: 'complexity-decidability',
    parentId: 'Recognizable / RE',
    childIds: ['EXPSPACE'],
    markerConceptIds: ['Presburger arithmetic'],
    exclusiveConceptIds: ['Decidable / Recursive', 'Presburger arithmetic'],
    exclusiveLabel: 'Decidable \\ EXPSPACE',
    note: 'Decidible significa que existe un decidor total. Presburger arithmetic se muestra como ejemplo decidible fuera de la cadena P/NP/PSPACE/EXPTIME/EXPSPACE de este panel.',
  },
  {
    id: 'EXPSPACE',
    label: 'EXPSPACE',
    group: 'complexity-decidability',
    parentId: 'Decidable / Recursive',
    childIds: ['EXP'],
    markerConceptIds: [],
    exclusiveConceptIds: ['EXPSPACE'],
    exclusiveLabel: 'EXPSPACE \\ EXPTIME',
    note: 'EXPTIME ⊆ EXPSPACE. Esta vista solo usa inclusiones conocidas.',
  },
  {
    id: 'EXP',
    label: 'EXPTIME',
    group: 'complexity-decidability',
    parentId: 'EXPSPACE',
    childIds: ['PSPACE'],
    markerConceptIds: ['EXPTIME-complete', 'Go'],
    exclusiveConceptIds: ['EXP'],
    exclusiveLabel: 'EXPTIME \\ PSPACE',
    note: 'Go aparece como marcador EXPTIME-complete, pero la vista no usa ese marcador para afirmar separaciones abiertas.',
  },
  {
    id: 'PSPACE',
    label: 'PSPACE',
    group: 'complexity-decidability',
    parentId: 'EXP',
    childIds: ['NP', 'PSPACE-complete'],
    markerConceptIds: ['PSPACE-complete', 'QBF'],
    exclusiveConceptIds: ['PSPACE'],
    exclusiveLabel: 'PSPACE \\ NP',
    note: 'QBF es PSPACE-complete, pero no se coloca como testigo de PSPACE\\NP porque NP vs PSPACE no se resuelve aqui.',
  },
  {
    id: 'NP',
    label: 'NP',
    group: 'complexity-decidability',
    parentId: 'PSPACE',
    childIds: ['P', 'NP-Complete'],
    markerConceptIds: ['SAT'],
    exclusiveConceptIds: ['NP'],
    exclusiveLabel: 'NP \\ P',
    note: 'SAT y NP-complete son marcadores de pertenencia/completitud. No se dibujan como prueba de NP\\P porque P vs NP esta abierto.',
  },
  {
    id: 'NP-Complete',
    label: 'NP-complete',
    group: 'complexity-decidability',
    parentId: 'NP',
    childIds: [],
    markerConceptIds: ['SAT', 'NP-Hard'],
    exclusiveConceptIds: ['NP-Complete', 'SAT'],
    exclusiveLabel: 'NP-complete',
    note: 'NP-complete esta dentro de NP y corresponde a la interseccion NP ∩ NP-hard bajo reducciones polinomiales. SAT es el marcador canonico.',
    visualHint: 'inside NP, connected to NP-hard',
  },
  {
    id: 'P',
    label: 'P',
    group: 'complexity-decidability',
    parentId: 'NP',
    childIds: [],
    markerConceptIds: ['2-SAT'],
    exclusiveConceptIds: ['P', '2-SAT'],
    exclusiveLabel: 'P',
    note: '2-SAT se muestra como ejemplo probado en P.',
  },
  {
    id: 'PSPACE-complete',
    label: 'PSPACE-complete',
    group: 'complexity-decidability',
    parentId: 'PSPACE',
    childIds: [],
    markerConceptIds: ['QBF'],
    exclusiveConceptIds: ['PSPACE-complete', 'QBF'],
    exclusiveLabel: 'PSPACE-complete',
    note: 'PSPACE-complete esta dentro de PSPACE. QBF es el ejemplo canonico, pero no prueba PSPACE\\NP.',
  },
  {
    id: 'co-NP',
    label: 'co-NP',
    group: 'complexity-decidability',
    parentId: 'PSPACE',
    childIds: [],
    markerConceptIds: ['TAUTOLOGY', 'P'],
    exclusiveConceptIds: ['co-NP', 'TAUTOLOGY'],
    exclusiveLabel: 'co-NP \\ P (NP ∩ co-NP open beyond P)',
    note: 'co-NP se muestra como region solapada con NP, no como subconjunto. P esta en la interseccion conocida. NP vs co-NP permanece OPEN.',
    visualRole: 'overlay',
    visualHint: 'overlaps NP; P is known in the intersection; NP vs co-NP OPEN',
  },
  {
    id: 'NP-Hard',
    label: 'NP-hard',
    group: 'complexity-decidability',
    childIds: [],
    markerConceptIds: ['NP-Complete'],
    exclusiveConceptIds: ['NP-Hard'],
    exclusiveLabel: 'NP-hard outside NP',
    note: 'NP-hard no es subconjunto de NP. Puede extenderse fuera de NP; NP-complete es la zona donde NP-hard intersecta NP.',
    visualRole: 'overlay',
    visualHint: 'extends outside NP; intersects NP at NP-complete',
  },
  {
    id: 'BPP',
    label: 'BPP',
    group: 'complexity-decidability',
    parentId: 'PSPACE',
    childIds: [],
    markerConceptIds: ['P'],
    exclusiveConceptIds: ['BPP'],
    exclusiveLabel: 'BPP region (not drawn inside NP)',
    note: 'BPP no se dibuja dentro de NP. Se muestra como region lateral con P ⊆ BPP y BPP ⊆ PSPACE; P vs BPP permanece OPEN.',
    visualRole: 'overlay',
    visualHint: 'not inside NP; derandomization frontier OPEN',
  },
  {
    id: 'P/poly',
    label: 'P/poly',
    group: 'complexity-decidability',
    childIds: [],
    markerConceptIds: ['P'],
    exclusiveConceptIds: ['P/poly'],
    exclusiveLabel: 'P/poly nonuniform side region',
    note: 'P/poly es no uniforme. No se coloca dentro de la cadena decidible uniforme; P esta contenido en P/poly bajo circuitos/consejos.',
    visualRole: 'overlay',
    visualHint: 'nonuniform; do not read as a standard decidable-time class',
  },
  {
    id: 'grammar-unrestricted',
    label: 'unrestricted',
    group: 'grammars',
    childIds: ['grammar-context-sensitive'],
    markerConceptIds: ['Recognizable / RE'],
    exclusiveConceptIds: ['Recognizable / RE', 'Halting Problem / H', 'RE-complete'],
    exclusiveLabel: 'unrestricted \\ context-sensitive',
    note: 'Las gramaticas unrestricted tienen poder equivalente a maquinas de Turing para lenguajes reconocibles. Ejemplo conceptual: problemas RE como Halting.',
  },
  {
    id: 'grammar-context-sensitive',
    label: 'context-sensitive',
    group: 'grammars',
    parentId: 'grammar-unrestricted',
    childIds: ['grammar-context-free'],
    markerConceptIds: ['Context-sensitive', 'LBA'],
    exclusiveConceptIds: ['Context-sensitive', 'LBA'],
    exclusiveLabel: 'context-sensitive \\ context-free',
    note: 'Las gramaticas context-sensitive corresponden conceptualmente a LBA. Ejemplo: a^n b^n c^n.',
  },
  {
    id: 'grammar-context-free',
    label: 'context-free',
    group: 'grammars',
    parentId: 'grammar-context-sensitive',
    childIds: ['grammar-right-linear'],
    markerConceptIds: ['Context-free'],
    exclusiveConceptIds: ['Context-free'],
    exclusiveLabel: 'context-free \\ right-linear',
    note: 'Las gramaticas context-free se relacionan con PDA/NPDA. Ejemplo: ww^R o lenguajes con estructura anidada.',
  },
  {
    id: 'grammar-right-linear',
    label: 'right-linear',
    group: 'grammars',
    parentId: 'grammar-context-free',
    childIds: [],
    markerConceptIds: ['Regular'],
    exclusiveConceptIds: ['Regular', 'Finite languages'],
    exclusiveLabel: 'right-linear',
    note: 'Las gramaticas right-linear caracterizan lenguajes regulares. Ejemplo: una gramatica que genera a*.',
  },
];

export function getVennSet(setId: string | undefined) {
  return vennSets.find((set) => set.id === setId);
}

export function getVennChildren(setId: string) {
  const selected = getVennSet(setId);
  return selected?.childIds
    .map((childId) => getVennSet(childId))
    .filter((child): child is VennSetNode => Boolean(child))
    .filter((child) => child.visualRole !== 'overlay') ?? [];
}

export function getVennOverlaySets(groupId: VennGroupId) {
  return vennSets.filter((set) => set.group === groupId && set.visualRole === 'overlay');
}

export function getVennStrictSubsetIds(setId: string): VennSetId[] {
  const selected = getVennSet(setId);
  if (!selected) return [];
  return selected.childIds.flatMap((childId) => [childId, ...getVennStrictSubsetIds(childId)]);
}

export function getVennSupersetIds(setId: string): VennSetId[] {
  const selected = getVennSet(setId);
  if (!selected?.parentId) return [];
  return [selected.parentId, ...getVennSupersetIds(selected.parentId)];
}

export function getVennExclusiveNodeIds(setId: string | undefined) {
  return getVennSet(setId)?.exclusiveConceptIds ?? [];
}

export function getVennMarkerConcepts(setId: string) {
  const selected = getVennSet(setId);
  return selected?.markerConceptIds.map((conceptId) => getComplexityConcept(conceptId)).filter(Boolean) ?? [];
}

export function getVennCodeReferences(setId: string): CodeReference[] {
  const selected = getVennSet(setId);
  const concept = getComplexityConcept(setId);
  return [
    {
      label: 'Datos Set / Venn',
      path: 'src/modules/complexity/complexityVennData.ts',
      module: 'Complexity Explorer',
      symbol: 'vennSets',
      description: `Define el conjunto ${selected?.label ?? setId}, sus subconjuntos visibles y su region exclusiva.`,
    },
    {
      label: 'Vista Set / Venn',
      path: 'src/components/graph/ComplexitySetVennView.tsx',
      module: 'Complexity Explorer',
      symbol: 'ComplexitySetVennView',
      description: 'Renderiza diagramas anidados de lenguajes formales, decidibilidad y complejidad.',
    },
    ...(concept.codeReferences?.slice(0, 2) ?? []),
  ];
}

export function conceptExists(conceptId: string) {
  return complexityConcepts.some((concept) => concept.id === conceptId);
}
