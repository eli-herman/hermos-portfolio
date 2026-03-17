import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eli Herman — AI Infrastructure & Automation',
  description: 'The future, on demand. AI infrastructure that gives one person the output of an engineering team.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-muted antialiased">
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-foreground focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
