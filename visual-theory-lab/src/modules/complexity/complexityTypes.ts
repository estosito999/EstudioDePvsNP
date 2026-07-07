export type TruthStatus =
  | 'definition'
  | 'theorem'
  | 'experiment'
  | 'intuition'
  | 'conjecture'
  | 'open'
  | 'common_error';

export type ConceptKind = 'class' | 'problem' | 'theorem' | 'algorithm' | 'solver' | 'barrier';

export type ConceptLayer = 'basic' | 'randomized' | 'circuit' | 'advanced' | 'problem';

export type ConceptAccent = 'green' | 'cyan' | 'purple' | 'red' | 'yellow';

export type MisconceptionSeverity = 'low' | 'medium' | 'high' | 'critical';

export type Misconception = {
  id: string;
  title: string;
  wrongIdea: string;
  correction: string;
  explanation: string;
  severity: MisconceptionSeverity;
  relatedConceptIds: string[];
  tags: string[];
  truthStatus: 'common_error';
};

export type ComplexityCurve = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n^2)' | 'O(2^n)' | 'O(n!)';

export type ComplexityProfileCategory = 'polynomial' | 'superpolynomial' | 'exponential' | 'mixed' | 'not_applicable';

export type CodeReference = {
  label: string;
  path: string;
  module?: string;
  symbol?: string;
  description: string;
};

export type ComplexityProfile = {
  shortLabel: string;
  category: ComplexityProfileCategory;
  highlights: ComplexityCurve[];
  note: string;
  warning?: string;
};

export type ConceptNode = {
  id: string;
  label: string;
  kind: ConceptKind;
  layer: ConceptLayer;
  shortDefinition: string;
  definition: string;
  intuition: string;
  examples: string[];
  commonErrors: string[];
  corrections: string[];
  truthStatus: TruthStatus;
  codeSnippetId?: string;
  misconceptionIds?: string[];
  codeReferences?: CodeReference[];
  complexityProfile?: ComplexityProfile;
  accent: ConceptAccent;
  position: { x: number; y: number };
};

export type ComplexityRelationKind = 'inclusion' | 'reduction' | 'duality' | 'membership' | 'separation';

export type ComplexityRelation = {
  id: string;
  source: string;
  target: string;
  label: string;
  kind: ComplexityRelationKind;
  truthStatus: TruthStatus;
  layer: ConceptLayer;
  explanation?: string;
  example?: string;
  codeReferences?: CodeReference[];
};

export type ComplexityExplorerToggles = {
  inclusions: boolean;
  reductions: boolean;
  labels: boolean;
  technicalMode: boolean;
  showBasic: boolean;
  showRandomized: boolean;
  showCircuit: boolean;
  showAdvanced: boolean;
  showProblems: boolean;
  showMisconceptions: boolean;
  showTruthStatus: boolean;
};

export const initialComplexityExplorerToggles: ComplexityExplorerToggles = {
  inclusions: true,
  reductions: true,
  labels: true,
  technicalMode: true,
  showBasic: true,
  showRandomized: false,
  showCircuit: false,
  showAdvanced: false,
  showProblems: true,
  showMisconceptions: false,
  showTruthStatus: true,
};

export const truthStatusLabels: Record<TruthStatus, string> = {
  definition: 'DEFINICION',
  theorem: 'TEOREMA',
  experiment: 'EXPERIMENTO',
  intuition: 'INTUICION',
  conjecture: 'CONJETURA',
  open: 'ABIERTO',
  common_error: 'ERROR COMUN',
};

export const conceptLayerLabels: Record<ConceptLayer, string> = {
  basic: 'Basic',
  randomized: 'Randomized',
  circuit: 'Circuit',
  advanced: 'Advanced',
  problem: 'Problem',
};
