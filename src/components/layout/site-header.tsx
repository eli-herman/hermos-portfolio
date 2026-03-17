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
      setScrolled(window.scrollY > 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out',
        scrolled
          ? 'bg-background border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-[1200px] flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          Eli Herman
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm text-muted hover:text-foreground transition-colors relative py-1',
                pathname === item.href && 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="mailto:eli@hermos.dev"
            className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-foreground text-sm font-medium h-8 px-3 transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Hamburger */}
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
              <Menu className="h-6 w-6" />
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
                      href="mailto:eli@hermos.dev"
                      className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-foreground font-medium h-9 px-4 mt-4 transition-colors"
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
