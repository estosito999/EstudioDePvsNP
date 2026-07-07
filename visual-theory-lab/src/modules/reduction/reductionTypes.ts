import type { CodeReference } from '../complexity/complexityTypes';

export type ReductionId = 'sat-to-3sat' | '3sat-to-clique' | '3sat-to-vertex-cover' | '3sat-to-subset-sum';

export type ReductionDifficulty = 'intro' | 'standard' | 'advanced';

export type ReductionStep = {
  id: string;
  title: string;
  description: string;
  construction: string;
};

export type ReductionMeta = {
  id: ReductionId;
  label: string;
  sourceProblem: string;
  targetProblem: string;
  difficulty: ReductionDifficulty;
  theoremStatus: 'TEOREMA DEMOSTRADO';
  inputInstance: string;
  transformedInstance: string;
  intuition: string;
  equivalence: string;
  warning?: string;
  steps: ReductionStep[];
  codeReferences: CodeReference[];
};
