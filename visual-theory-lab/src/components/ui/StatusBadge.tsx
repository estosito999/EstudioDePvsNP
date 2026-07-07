type StatusBadgeProps = {
  label: string;
  tone?: 'green' | 'cyan' | 'purple' | 'red' | 'yellow';
};

export function StatusBadge({ label, tone = 'cyan' }: StatusBadgeProps) {
  return <span className={`status-badge ${tone}`}>{label}</span>;
}
