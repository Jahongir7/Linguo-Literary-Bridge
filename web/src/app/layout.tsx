import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Linguo-Literary Bridge',
    template: '%s | Linguo-Literary Bridge',
  },
  description:
    'An interactive SaaS platform for learning English through E.L. Voynich\'s classic literature with AI-powered tutoring and CEFR-adapted content.',
  keywords: ['English learning', 'CEFR', 'literature', 'The Gadfly', 'AI tutor', 'SaaS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
