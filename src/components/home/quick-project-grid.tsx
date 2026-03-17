'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TechTag } from '@/components/shared/tech-tag';
import { PROJECTS } from '@/lib/constants';

const projectEntries = [
  { key: 'hermos' as const, featured: true },
  { key: 'vine' as const, featured: false },
];

function ProjectCard({
  name,
  tagline,
  description,
  tags,
  featured,
}: {
  name: string;
  tagline: string;
  description: string;
  tags: readonly string[];
  featured: boolean;
}) {
  return (
    <Card
      className={`group bg-card hover:bg-card-hover border border-border hover:border-accent/40 transition-all duration-200 h-full hover:-translate-y-0.5 ${
        featured
          ? 'border-l-2 border-l-accent shadow-[0_0_0_0_rgba(212,146,26,0)] hover:shadow-[0_4px_24px_rgba(212,146,26,0.15)]'
          : 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
      }`}
    >
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-bold group-hover:text-accent transition-colors duration-200">
          {name}
        </CardTitle>
        <p className="text-muted text-sm font-mono">{tagline}</p>
      </CardHeader>
      <CardContent>
        <p className="text-muted text-base">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickProjectGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16 md:py-[64px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectEntries.map(({ key, featured }, index) => {
          const project = PROJECTS[key];
          const isInternal = project.link?.startsWith('/');

          return (
            <motion.div
              key={key}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
            >
              {project.link ? (
                isInternal ? (
                  <Link href={project.link} className="block">
                    <ProjectCard
                      name={project.name}
                      tagline={project.tagline}
                      description={project.description}
                      tags={project.tags}
                      featured={featured}
                    />
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <ProjectCard
                      name={project.name}
                      tagline={project.tagline}
                      description={project.description}
                      tags={project.tags}
                      featured={featured}
                    />
                  </a>
                )
              ) : (
                <div className="block">
                  <ProjectCard
                    name={project.name}
                    tagline={project.tagline}
                    description={project.description}
                    tags={project.tags}
                    featured={featured}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
