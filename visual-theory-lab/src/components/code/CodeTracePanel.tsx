type CodeTracePanelProps = {
  title?: string;
  lines: string[];
  activeLine: number;
};

export function CodeTracePanel({ title = 'Codigo visible', lines, activeLine }: CodeTracePanelProps) {
  return (
    <section className="code-trace-panel">
      <div className="code-header">
        <h3>{title}</h3>
        <span>active line {activeLine + 1}</span>
      </div>
      <pre className="code-trace-block">
        {lines.map((line, index) => (
          <code className={index === activeLine ? 'active' : ''} key={`${index}-${line}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {line || ' '}
          </code>
        ))}
      </pre>
    </section>
  );
}
