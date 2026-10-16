import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ContactModalProvider } from '@/components/ui/ContactModal';
import { fetchSettings } from '@/lib/api/endpoints';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await fetchSettings('uk');
    return {
      title: {
        default: settings.seo?.title || settings.site_name || 'WebStudio',
        template: `%s | ${settings.site_name || 'WebStudio'}`,
      },
      description: settings.seo?.description || settings.site_description || '',
      icons: settings.favicon_url ? {
        icon: settings.favicon_url,
        shortcut: settings.favicon_url,
        apple: settings.favicon_url,
      } : undefined,
      openGraph: settings.seo?.og_image_url ? {
        images: [{ url: settings.seo.og_image_url }],
        type: (settings.seo?.og_type as 'website') || 'website',
      } : undefined,
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: { default: 'WebStudio', template: '%s | WebStudio' },
      description: '',
      robots: { index: true, follow: true },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-[#080b11] text-slate-200 antialiased">
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}
