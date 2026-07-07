import { useState } from 'react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { evaluateProofConsoleCommand, initialProofConsoleEntry, proofConsoleCommands } from './proofConsoleData';
import type { ProofConsoleEntry, ProofConsoleStatus } from './proofConsoleTypes';

type ProofConsoleProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const statusTone: Record<ProofConsoleStatus, 'green' | 'cyan' | 'purple' | 'red' | 'yellow'> = {
  THEOREM: 'green',
  DEFINITION: 'cyan',
  'COMMON ERROR': 'red',
  OPEN: 'yellow',
  INTUITION: 'purple',
};

function toEntry(command: string): ProofConsoleEntry {
  return {
    ...evaluateProofConsoleCommand(command),
    timestamp: new Date().toLocaleTimeString(),
  };
}

export function ProofConsole({ onEvent }: ProofConsoleProps) {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<ProofConsoleEntry[]>([{ ...initialProofConsoleEntry, timestamp: new Date().toLocaleTimeString() }]);

  function runCommand(command: string) {
    const trimmed = command.trim();
    if (!trimmed) return;
    const entry = toEntry(trimmed);
    setEntries((current) => [...current.slice(-32), entry]);
    onEvent(`Proof Console command: ${trimmed}`, entry.status === 'COMMON ERROR' || entry.status === 'OPEN' ? 'warn' : 'system');
    onEvent(`Proof Console status: ${entry.status}`, entry.status === 'COMMON ERROR' ? 'warn' : 'info');
    setInput('');
  }

  return (
    <section className="module-shell proof-console-module">
      <header className="module-toolbar verification-toolbar proof-console-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Proof Console</h1>
          <p className="module-subtitle">Terminal tecnica para consultar afirmaciones, teoremas, errores comunes y problemas abiertos.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="MISCONCEPTION LAYER" tone="red" />
          <StatusBadge label="OPEN FRONTIER" tone="yellow" />
        </div>
      </header>

      <div className="proof-console-grid">
        <div className="proof-terminal">
          <div className="proof-terminal-header"><span>local://visual-theory-lab/proof-console</span><strong>ONLINE</strong></div>
          <div className="proof-terminal-scroll">
            {entries.map((entry) => (
              <article className="proof-terminal-entry" key={entry.id}>
                <div className="proof-command-line"><span>{entry.timestamp}</span><code>$ {entry.command}</code></div>
                <div className={`proof-status-line ${entry.status.toLowerCase().replace(/\s+/g, '-')}`}>STATUS: {entry.status}</div>
                <h2>{entry.title}</h2>
                <p>{entry.explanation}</p>
                <div className="proof-console-details">
                  {entry.details.map((detail) => <code key={detail}>{detail}</code>)}
                </div>
                <div className="proof-console-reference"><span>codigo relacionado</span><code>{entry.codeReference.path}</code></div>
              </article>
            ))}
          </div>
          <form className="proof-console-input-row" onSubmit={(event) => { event.preventDefault(); runCommand(input); }}>
            <span>$</span>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="query P vs NP" spellCheck={false} />
            <button type="submit">Run</button>
          </form>
        </div>

        <aside className="proof-console-command-card">
          <div className="verification-card-header">
            <div><p className="eyebrow">Comandos</p><h2>Quick reference</h2></div>
          </div>
          <div className="proof-console-command-list">
            {proofConsoleCommands.map((item) => (
              <button type="button" key={item.command} onClick={() => runCommand(item.command)}>
                <code>{item.command}</code>
                <span>{item.description}</span>
              </button>
            ))}
          </div>
          <div className="proof-console-status-grid">
            {(Object.keys(statusTone) as ProofConsoleStatus[]).map((status) => <StatusBadge key={status} label={status} tone={statusTone[status]} />)}
          </div>
        </aside>
      </div>
    </section>
  );
}
