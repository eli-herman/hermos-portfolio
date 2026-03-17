import Image from 'next/image';

interface DiagramEmbedProps {
  src: string;
  alt: string;
  caption?: string;
}

export function DiagramEmbed({ src, alt, caption }: DiagramEmbedProps) {
  // Diagrams are created in Plan 05. Until then, render a skeleton placeholder.
  const diagramExists = false;

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border bg-card">
      {diagramExists ? (
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={600}
          className="w-full h-auto"
          priority
        />
      ) : (
        <div className="bg-card animate-pulse h-64 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm">
            Diagram placeholder — created in Plan 05
          </span>
        </div>
      )}
      {caption && (
        <p className="text-muted-foreground text-sm text-center mt-2 pb-3">
          {caption}
        </p>
      )}
    </div>
  );
}
