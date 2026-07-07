import { StatusBadge } from '../ui/StatusBadge';

export type MobilePanel = 'sidebar' | 'workspace' | 'inspector';

type TopBarProps = {
  activeModule: string;
  selectedClass: string;
  mobilePanel: MobilePanel;
  onMobilePanelChange: (panel: MobilePanel) => void;
};

export function TopBar({ activeModule, selectedClass, mobilePanel, onMobilePanelChange }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="brand-block">
        <button
          className="mobile-hamburger"
          type="button"
          onClick={() => onMobilePanelChange(mobilePanel === 'sidebar' ? 'workspace' : 'sidebar')}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="brand-mark">VTL</span>
        <div>
          <strong>Visual Theory Lab</strong>
          <span>Laboratorio local de teoria de la computacion</span>
        </div>
      </div>
      <div className="top-status">
        <StatusBadge label="REACT FLOW ONLINE" tone="green" />
        <StatusBadge label="MONACO READY" tone="purple" />
        <span className="status-text">Modulo: {activeModule}</span>
        <span className="status-text">Seleccion: {selectedClass}</span>
      </div>
      <div className="mobile-nav-buttons">
        <button
          type="button"
          className={`mobile-nav-btn${mobilePanel === 'sidebar' ? ' active' : ''}`}
          onClick={() => onMobilePanelChange('sidebar')}
          aria-label="Menu de modulos"
        >
          Modulos
        </button>
        <button
          type="button"
          className={`mobile-nav-btn${mobilePanel === 'workspace' ? ' active' : ''}`}
          onClick={() => onMobilePanelChange('workspace')}
          aria-label="Area de trabajo"
        >
          Laboratorio
        </button>
        <button
          type="button"
          className={`mobile-nav-btn${mobilePanel === 'inspector' ? ' active' : ''}`}
          onClick={() => onMobilePanelChange('inspector')}
          aria-label="Inspector"
        >
          Inspector
        </button>
      </div>
    </header>
  );
}
