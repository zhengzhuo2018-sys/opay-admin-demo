type MultiLineCellProps = {
  lines: readonly string[];
  className?: string;
};

export default function MultiLineCell({ lines, className = '' }: MultiLineCellProps) {
  return (
    <span className={`list-multiline-cell ${className}`}>
      {lines.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}
    </span>
  );
}
