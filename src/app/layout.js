import { Outfit, Playfair_Display } from 'next/font/google'
import './globals.css'
import Scene from '@/components/3d/Scene'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: "For My Valentine",
  description: "A special message for a special person.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable}`}>
        <Scene />
        {children}
      </body>
    </html>
  )
}
