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
import { Header } from '@/app/_components/header'
import { getUser } from '@/lib/supabase/server'
import { Toaster } from '@/components/ui/sonner'

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUser()

  return (
    <html lang='en' className='light'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`}
      >
        <Header user={user} />

        <main className='flex-1'>
          {children}
        </main>

        <Toaster position='bottom-right' richColors />
      </body>
    </html>
  )
}

export default RootLayout
