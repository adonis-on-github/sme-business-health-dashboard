import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SME Business Health Dashboard',
  description: 'SME Business Health Dashboard application',
}
import { Toaster } from '@/components/ui/sonner'

const CLASS_NAMES = `${geistSans.className}, ${geistMono.className}
antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' className='light'>
      <body
        className={CLASS_NAMES}
      >
        {children}

        <Toaster position='bottom-right' richColors />
      </body>
    </html>
  )
}

export default RootLayout
