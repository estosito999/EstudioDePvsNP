import type { CodeReference } from '../complexity/complexityTypes';

export type ProofId = 'two-sat-in-p' | 'sat-in-np';

export type ProofStepStatus = 'pending' | 'active' | 'complete';

export type ProofStep = {
  id: string;
  label: string;
  description: string;
};

export type ProofMeta = {
  id: ProofId;
  title: string;
  theoremStatus: string;
  shortStatement: string;
  formalIdea: string;
  misconceptionNote?: string;
  codeLines: string[];
  codeReferences: CodeReference[];
  steps: ProofStep[];
};

export type SatAssignment = Record<string, boolean>;
