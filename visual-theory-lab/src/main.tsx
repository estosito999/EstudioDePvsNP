import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
/* ── Core ── */
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';

/* ── Views ── */
import './styles/complexity-view.css';
import './styles/venn-view.css';

/* ── Graph & UI ── */
import './styles/graph.css';
import './styles/react-flow.css';
import './styles/ui.css';

/* ── Modules ── */
import './styles/verification.css';
import './styles/code-trace.css';
import './styles/proof.css';
import './styles/reduction.css';
import './styles/algorithms.css';
import './styles/automata.css';
import './styles/sat.css';
import './styles/circuits.css';
import './styles/proof-complexity.css';
import './styles/algebraic.css';
import './styles/randomization.css';
import './styles/frontier.css';
import './styles/universe-module.css';
import './styles/proof-console.css';

/* ── Panels ── */
import './styles/inspector.css';
import './styles/console.css';

/* ── Responsive ── */
import './styles/media.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
