import { SKILLS } from '@/lib/constants';
import { TechTag } from '@/components/shared/tech-tag';

export function StackList() {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SKILLS.map((category) => (
        <div key={category.category}>
          <h4 className="text-foreground text-lg font-semibold mb-3">
            {category.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <TechTag key={item} label={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
