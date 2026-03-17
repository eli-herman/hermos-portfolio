'use client';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { TechTag } from '@/components/shared/tech-tag';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string | null;
  date: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  date,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-lg p-6 hover:bg-card-hover transition-colors duration-150"
    >
      <span className="text-muted-foreground text-sm font-mono">{date}</span>
      <h3 className="text-foreground text-lg font-semibold mt-1">{title}</h3>
      <p className="text-muted text-base mt-2 leading-[1.6]">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover text-sm flex items-center gap-1 mt-4 transition-colors duration-150"
        >
          View live
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
}
