import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {React.Children.map(children, (child, index) => {
        if (index === 0 && React.isValidElement(child)) {
          return (
            <div className="lg:col-span-2">
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}
