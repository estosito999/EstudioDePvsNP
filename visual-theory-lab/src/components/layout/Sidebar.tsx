type SidebarProps = {
  activeModule: string;
  onModuleChange: (module: string) => void;
  onMobilePanelChange: () => void;
};

const modules = [
  { name: 'Complexity Explorer', state: 'active' },
  { name: 'Code Verification Lab', state: 'active' },
  { name: 'Proof Lab', state: 'active' },
  { name: 'Reduction Lab', state: 'active' },
  { name: 'Classic Algorithms Lab', state: 'active' },
  { name: 'Turing & Automata Lab', state: 'active' },
  { name: 'SAT / Z3 Lab', state: 'active' },
  { name: 'Circuit Complexity Lab', state: 'active' },
  { name: 'Proof Complexity Lab', state: 'active' },
  { name: 'Algebraic / Gröbner Lab', state: 'active' },
  { name: 'Randomization & Derandomization Lab', state: 'active' },
  { name: 'Open Frontier Lab', state: 'active' },
  { name: '3D Knowledge Universe', state: 'active' },
  { name: 'Proof Console', state: 'active' },
];

export function Sidebar({ activeModule, onModuleChange, onMobilePanelChange }: SidebarProps) {
  return (
    <aside className="sidebar-panel">
      <div className="panel-title-row">
        <p className="eyebrow">Modulos</p>
      </div>
      <nav className="module-list" aria-label="Modulos del laboratorio">
        {modules.map((module) => (
          <button
            key={module.name}
            className={module.name === activeModule ? 'module-item active' : 'module-item'}
            type="button"
            disabled={module.state !== 'active'}
            onClick={() => { onModuleChange(module.name); onMobilePanelChange(); }}
          >
            <span>{module.name}</span>
            <small>{module.state === 'active' ? 'online' : 'stub'}</small>
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <p>Arquitectura preparada para nuevos modulos sin backend.</p>
        <code>src/modules/*</code>
      </div>
    </aside>
  );
}
