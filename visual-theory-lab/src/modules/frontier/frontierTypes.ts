import type { CodeReference } from '../complexity/complexityTypes';

export type FrontierTopicId =
  | 'p-vs-np'
  | 'np-vs-co-np'
  | 'p-vs-pspace'
  | 'p-vs-bpp'
  | 'strong-circuit-lower-bounds'
  | 'general-separations'
  | 'relativization'
  | 'natural-proofs'
  | 'algebrization';

export type FrontierTopicStatus = 'OPEN' | 'BARRIER / LIMITATION';

export type FrontierTopic = {
  id: FrontierTopicId;
  title: string;
  status: FrontierTopicStatus;
  category: 'open-problem' | 'barrier';
  known: string[];
  unknown: string[];
  whyItMatters: string;
  commonMistakes: string[];
  relationToPvsNP: string;
  codeReferences: CodeReference[];
};

export type FrontierLabMeta = {
  conceptualMessage: string;
  codeReferences: CodeReference[];
};
