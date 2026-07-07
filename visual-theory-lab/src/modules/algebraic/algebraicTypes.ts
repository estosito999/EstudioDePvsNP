import type { CodeReference } from '../complexity/complexityTypes';

export type AlgebraicConceptId = 'boolean-equations' | 'clause-polynomial' | 'ideal' | 'variety' | 'grobner' | 'nullstellensatz';

export type PolynomialEquation = {
  id: string;
  label: string;
  expression: string;
  explanation: string;
};

export type AlgebraicConcept = {
  id: AlgebraicConceptId;
  title: string;
  description: string;
  intuition: string;
};

export type AlgebraicLabMeta = {
  booleanFormula: string;
  algebraicTranslation: string;
  variables: string[];
  equations: PolynomialEquation[];
  warning: string;
  misconception: {
    error: string;
    correction: string;
  };
  codeReferences: CodeReference[];
};
