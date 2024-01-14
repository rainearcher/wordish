import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Endless Wordgames',
  description: 'Play Wordle endlessly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="rootHeader">
          <Link href="/wordish">Wordish</Link>
        </div>
        <div className={inter.className} 
            style={{
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center"
              }}>
          {children}
        </div>
      </body>
      
    </html>
  )
}
