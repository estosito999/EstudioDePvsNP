import type { CodeReference, MisconceptionSeverity } from '../complexity/complexityTypes';

export type UniverseClusterId = 'sat' | 'complexity' | 'proof';

export type UniverseNodeId =
  | 'sat'
  | 'two-sat'
  | 'three-sat'
  | 'cnf'
  | 'dpll'
  | 'z3'
  | 'resolution'
  | 'grobner-encoding'
  | 'p'
  | 'np'
  | 'co-np'
  | 'pspace'
  | 'bpp'
  | 'ac0'
  | 'p-poly'
  | 'exp'
  | 'cook-levin'
  | 'karp-reductions'
  | 'two-sat-in-p'
  | 'subset-sum-npc'
  | 'cutting-planes';

export type UniverseCluster = {
  id: UniverseClusterId;
  label: string;
  color: string;
  description: string;
};

export type UniverseNode = {
  id: UniverseNodeId;
  label: string;
  cluster: UniverseClusterId;
  position: [number, number, number];
  truth: string;
  misconception: string;
  correction: string;
  severity: MisconceptionSeverity;
  relatedModules: string[];
  codeReferences: CodeReference[];
};

export type UniverseLink = {
  source: UniverseNodeId;
  target: UniverseNodeId;
  label: string;
  strength: 'definition' | 'reduction' | 'proof' | 'algorithm' | 'encoding';
};

export type UniverseRoute = {
  source: UniverseNodeId;
  target: UniverseNodeId;
  nodes: UniverseNodeId[];
};
