import type { CodeReference } from '../complexity/complexityTypes';

export type ProofSystemId = 'resolution' | 'cutting-planes' | 'frege' | 'unsat-proofs' | 'proof-size';

export type ProofComplexityTopic = {
  id: ProofSystemId;
  label: string;
  description: string;
  status: 'functional' | 'prepared';
};

export type ResolutionClause = {
  id: string;
  label: string;
  literals: string[];
  kind: 'initial' | 'derived' | 'contradiction';
};

export type ResolutionStep = {
  id: string;
  title: string;
  premises: string[];
  conclusion: string;
  pivot: string;
  rule: string;
  explanation: string;
};

export type ProofComplexityMeta = {
  misconception: {
    error: string;
    correction: string;
  };
  codeReferences: CodeReference[];
};
