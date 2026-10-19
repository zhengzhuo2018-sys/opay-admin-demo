export type ListStatusTone = 'neutral' | 'success' | 'warning' | 'danger';

type ListStatusProps = {
  children: string;
  tone: ListStatusTone;
};

export default function ListStatus({ children, tone }: ListStatusProps) {
  return <span className={`list-status list-status-${tone}`}>{children}</span>;
}
