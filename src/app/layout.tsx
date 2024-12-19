import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sacred Wallpaper Pack',
  description: 'Generate personalized wallpapers based on birth data and astrological cycles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          {children}
        </main>
      </body>
    </html>
  )
}
