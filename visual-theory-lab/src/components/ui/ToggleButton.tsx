type ToggleButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function ToggleButton({ label, active, onClick }: ToggleButtonProps) {
  return (
    <button className={active ? 'toggle-button active' : 'toggle-button'} type="button" onClick={onClick}>
      <span aria-hidden="true" />
      {label}
    </button>
  );
}
