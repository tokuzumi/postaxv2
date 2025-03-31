import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Postax - Agendamento Inteligente de Posts',
  description: 'Plataforma para criação e agendamento automático de posts para redes sociais',
}

export const viewport: Viewport = {
  themeColor: '#13001E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} bg-postax-primary min-h-screen`}>
        {children}
      </body>
    </html>
  )
} 