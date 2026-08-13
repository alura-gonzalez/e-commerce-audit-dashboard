import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
