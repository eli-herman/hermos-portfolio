'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <nav
        className={cn(
          'pointer-events-auto flex items-center justify-between h-14 transition-all duration-300 ease-in-out',
          scrolled
            ? 'w-full max-w-[860px] bg-background/80 backdrop-blur-md border border-border rounded-2xl px-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'w-full max-w-[1200px] bg-transparent px-2'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground font-bold text-base tracking-tight hover:opacity-80 transition-opacity"
        >
          Eli Herman
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm text-muted hover:text-foreground transition-colors relative py-1',
                pathname === item.href &&
                  'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:rounded-full'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="mailto:hermos.dev@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium h-8 px-4 transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="p-2 text-foreground hover:text-accent transition-colors"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-full sm:w-80">
              <div className="flex flex-col gap-6 mt-12">
                {NAV_ITEMS.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          'text-lg text-muted hover:text-foreground transition-colors',
                          pathname === item.href && 'text-accent'
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <Link
                      href="mailto:hermos.dev@gmail.com"
                      className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white font-medium h-10 px-5 mt-4 transition-colors"
                    />
                  }
                >
                  Get in touch
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
