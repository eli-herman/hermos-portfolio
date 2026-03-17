interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="font-mono text-sm bg-accent-subtle text-foreground/80 px-2 py-1 rounded">
      {label}
    </span>
  );
}
