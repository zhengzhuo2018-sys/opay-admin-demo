type PosTerminalIllustrationProps = {
  variant: 'smart' | 'traditional';
};

export default function PosTerminalIllustration({ variant }: PosTerminalIllustrationProps) {
  return (
    <span
      className={`pos-terminal pos-terminal-${variant}`}
      role="img"
      aria-label={variant === 'smart' ? 'OPay Smart POS terminal' : 'OPay Traditional POS terminal'}
      data-pos-asset-slot={variant}
    >
      <span className="pos-terminal-screen">
        <i /><i /><i />
      </span>
      <span className="pos-terminal-keypad">
        {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
      </span>
    </span>
  );
}
