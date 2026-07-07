import type { MisconceptionSeverity } from '../../modules/complexity/complexityTypes';

type SeverityBadgeProps = {
  severity: MisconceptionSeverity;
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return <span className={`severity-badge ${severity}`}>{severity}</span>;
}
