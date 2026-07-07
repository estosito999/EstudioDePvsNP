import type { CodeReference } from '../complexity/complexityTypes';

export type RandomClassId = 'bpp' | 'rp' | 'co-rp' | 'zpp';

export type RandomClass = {
  id: RandomClassId;
  label: string;
  fullName: string;
  errorModel: string;
  guarantee: string;
  intuition: string;
  deterministicView: string;
  probabilisticView: string;
  baseError: string;
};

export type RepetitionRow = {
  runs: number;
  rpError: string;
  bppIntuition: string;
};

export type RandomizationLabMeta = {
  conceptualMessage: string;
  misconception: {
    error: string;
    correction: string;
  };
  prgPipeline: string[];
  advancedTopics: Array<{
    title: string;
    description: string;
  }>;
  codeReferences: CodeReference[];
};
