import type { CodeReference, MisconceptionSeverity } from '../complexity/complexityTypes';

export type AutomataModelId = 'dfa' | 'nfa' | 'pda' | 'dtm' | 'ntm';

export type TuringDirection = 'L' | 'R' | 'S';

export type TuringRunStatus = 'running' | 'accepted' | 'rejected';

export type TuringTransition = {
  state: string;
  read: string;
  write: string;
  move: TuringDirection;
  nextState: string;
};

export type TuringMachineDefinition = {
  name: string;
  description: string;
  states: string[];
  alphabet: string[];
  blank: string;
  startState: string;
  acceptState: string;
  rejectState: string;
  transitions: TuringTransition[];
  defaultInput: string;
};

export type TuringConfiguration = {
  step: number;
  state: string;
  head: number;
  tape: string[];
  status: TuringRunStatus;
  transition?: TuringTransition;
};

export type AutomataConcept = {
  id: AutomataModelId;
  label: string;
  kind: string;
  definition: string;
  relationToComplexity: string;
  status: 'functional' | 'stub';
};

export type AutomataMisconception = {
  error: string;
  correction: string;
  explanation: string;
  severity: MisconceptionSeverity;
};

export type AutomataLabMeta = {
  conceptualMessage: string;
  misconception: AutomataMisconception;
  codeReferences: CodeReference[];
};
