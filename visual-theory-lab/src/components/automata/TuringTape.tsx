type TuringTapeProps = {
  tape: string[];
  head: number;
};

export function TuringTape({ tape, head }: TuringTapeProps) {
  return (
    <div className="turing-tape">
      {tape.map((symbol, index) => (
        <div className={index === head ? 'tape-cell active' : 'tape-cell'} key={`${index}-${symbol}`}>
          <strong>{symbol}</strong>
          {index === head ? <span>HEAD</span> : null}
        </div>
      ))}
    </div>
  );
}
