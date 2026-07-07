import type { CodeReference } from '../complexity/complexityTypes';

export type ProofConsoleStatus = 'THEOREM' | 'DEFINITION' | 'COMMON ERROR' | 'OPEN' | 'INTUITION';

export type ProofConsoleResponse = {
  id: string;
  command: string;
  status: ProofConsoleStatus;
  title: string;
  explanation: string;
  details: string[];
  codeReference: CodeReference;
};

export type ProofConsoleEntry = ProofConsoleResponse & {
  timestamp: string;
};

export type ProofConsoleCommand = {
  command: string;
  description: string;
};
