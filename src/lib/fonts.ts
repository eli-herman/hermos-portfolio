import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export { GeistSans };
