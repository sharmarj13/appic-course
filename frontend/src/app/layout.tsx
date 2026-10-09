import type { Metadata } from 'next';
import '../index.css';
import { Providers } from './Providers';
import { ClientLayoutWrapper } from '@/components/layout/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'Appic Skill – Career-Focused Online Education & Live Workshops',
  description: 'Self-paced technical and professional programmes, live interactive workshops, and expert mentorship built for modern career growth.',
  openGraph: {
    title: 'Appic Skill – Career-Focused Online Education & Live Workshops',
    description: 'Self-paced technical and professional programmes, live interactive workshops, and expert mentorship built for modern career growth.',
    siteName: 'Appic Skill',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appic Skill – Career-Focused Online Education & Live Workshops',
    description: 'Self-paced technical and professional programmes, live interactive workshops, and expert mentorship built for modern career growth.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Appic Skill',
              description: 'Self-paced programmes, live workshops, and expert mentorship designed for career growth in software engineering, design, data, and business.',
              url: 'https://appicskill.edu',
            }),
          }}
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Providers>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
