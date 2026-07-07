import type { CodeReference } from '../complexity/complexityTypes';

export type VerificationLabId = 'bellman-ford' | 'three-sat-bruteforce';

export type WeightedGraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type WeightedEdge = {
  id: string;
  source: string;
  target: string;
  weight: number;
};

export type VerificationLabMeta = {
  id: VerificationLabId;
  title: string;
  subtitle: string;
  complexity: string;
  conceptualMessage: string;
  codeLines: string[];
  codeReferences: CodeReference[];
};

export type BooleanVariable = {
  id: string;
  label: string;
};

export type Literal = {
  variableId: string;
  negated?: boolean;
};

export type Clause = {
  id: string;
  literals: Literal[];
};
