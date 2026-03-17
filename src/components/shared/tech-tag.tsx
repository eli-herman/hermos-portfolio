interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return <span className="tech-tag">{label}</span>;
}
