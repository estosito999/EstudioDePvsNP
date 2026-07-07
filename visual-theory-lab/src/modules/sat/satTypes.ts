import type { CodeReference } from '../complexity/complexityTypes';

export type SatLiteral = {
  variable: string;
  negated: boolean;
};

export type SatClause = {
  id: string;
  literals: SatLiteral[];
};

export type SatAssignment = Record<string, boolean | undefined>;

export type SolverStatus = 'idle' | 'running' | 'SAT' | 'UNSAT' | 'UNKNOWN';

export type DpllStep = {
  title: string;
  description: string;
  assignment: SatAssignment;
  activeVariable?: string;
  action: 'choose' | 'assign' | 'unit' | 'backtrack' | 'sat' | 'unsat';
  activeLine: number;
};

export type Z3SolveResponse = {
  status: 'SAT' | 'UNSAT';
  model: Record<string, boolean>;
};

export type SatLabMeta = {
  conceptualMessage: string;
  codeLines: string[];
  codeReferences: CodeReference[];
};
