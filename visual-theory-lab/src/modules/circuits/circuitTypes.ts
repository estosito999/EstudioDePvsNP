import type { CodeReference } from '../complexity/complexityTypes';

export type GateType = 'INPUT' | 'AND' | 'OR' | 'NOT';

export type BooleanFunctionId = 'and' | 'or' | 'majority' | 'parity';

export type CircuitModelId = 'AC0' | 'NC' | 'P/poly';

export type CircuitGate = {
  id: string;
  label: string;
  type: GateType;
  inputs: string[];
  layer: number;
};

export type CircuitDefinition = {
  id: BooleanFunctionId;
  name: string;
  variables: string[];
  outputGateId: string;
  gates: CircuitGate[];
  description: string;
  limitationNote?: string;
};

export type CircuitMetrics = {
  size: number;
  depth: number;
  fanIn: number;
  fanOut: number;
};

export type CircuitModel = {
  id: CircuitModelId;
  label: string;
  description: string;
  intuition: string;
};

export type CircuitLabMeta = {
  lowerBoundTitle: string;
  lowerBoundText: string;
  pVsNpTitle: string;
  pVsNpText: string;
  misconception: {
    error: string;
    correction: string;
  };
  codeReferences: CodeReference[];
};
