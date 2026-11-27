import type { Metadata, Viewport } from 'next';
import { Orbitron, Poppins, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import SmoothScroll from '@/components/fx/smooth-scroll';
import Preloader from '@/components/fx/preloader';
import Cursor from '@/components/fx/cursor';
import ScrollProgress from '@/components/fx/scroll-progress';
import './globals.css';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Equinox Interactive - Official Website',
  description: 'Equinox Interactive is an indie game studio where game developers',
  authors: [{ name: 'Equinox Interactive' }],
  verification: { google: 'c1UK0DZeaj2DllOMJ_Vp0lPzF1d1vo-WSd0752HQdUg' },
  openGraph: { title: 'Equinox Interactive', description: 'Small Team. Big Dreams.', type: 'website', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', site: '@EquinoxIntratve', images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#15181f', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${orbitron.variable} ${poppins.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider>
            <Preloader />
            <SmoothScroll />
            <ScrollProgress />
            <Cursor />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
