import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Agent-Readiness Audit',
  description:
    'Audit any e-commerce product page for AI agent readiness — interpretability, executability, and reliability scoring.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/e-commerce-audit-dashboard/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/e-commerce-audit-dashboard/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/e-commerce-audit-dashboard/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/e-commerce-audit-dashboard/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f3ec' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
