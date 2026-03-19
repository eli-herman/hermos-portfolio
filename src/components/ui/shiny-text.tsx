import { cn } from '@/lib/utils';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyText({ children, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent',
        'bg-[length:250%_auto]',
        'bg-[linear-gradient(110deg,#D4921A_20%,#F7E8C0_38%,#FFFBF0_50%,#F7E8C0_62%,#D4921A_80%)]',
        '[animation:shiny-sweep_4s_linear_infinite]',
        className
      )}
    >
      {children}
    </span>
  );
}
