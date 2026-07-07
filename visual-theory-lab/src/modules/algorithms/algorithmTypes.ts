import type { CodeReference, MisconceptionSeverity } from '../complexity/complexityTypes';

export type AlgorithmId =
  | 'dfs'
  | 'bfs'
  | 'dijkstra'
  | 'bellman-ford'
  | 'ford-fulkerson'
  | 'edmonds-karp'
  | 'floyd-warshall';

export type AlgorithmNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type AlgorithmEdge = {
  id: string;
  source: string;
  target: string;
  weight?: number;
  capacity?: number;
  flow?: number;
};

export type AlgorithmStep = {
  id: string;
  title: string;
  description: string;
  activeNodeId?: string;
  activeEdgeId?: string;
  activeLine: number;
  structure: string[];
  table?: Record<string, string | number>;
  matrix?: string[][];
  residualEdges?: AlgorithmEdge[];
  augmentingPath?: string[];
  maxFlow?: number;
  event?: string;
};

export type AlgorithmMisconception = {
  error: string;
  correction: string;
  severity: MisconceptionSeverity;
};

export type AlgorithmMeta = {
  id: AlgorithmId;
  name: string;
  category: 'traversal' | 'shortest-path' | 'max-flow' | 'dynamic-programming';
  internalStructure: string;
  timeComplexity: string;
  spaceComplexity: string;
  worksWhen: string;
  failsWhen: string;
  truthStatus: 'theorem' | 'experiment';
  misconception: AlgorithmMisconception;
  nodes: AlgorithmNode[];
  edges: AlgorithmEdge[];
  codeLines: string[];
  steps: AlgorithmStep[];
  codeReferences: CodeReference[];
};
