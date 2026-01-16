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

import { logout } from './(auth)/actions'
import { createClient } from '@/lib/supabase/server'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang='en' className='light'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`}
      >
        {user && (
          <header className='w-full py-4 px-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xs'>SH</span>
              </div>
              <span className='font-semibold tracking-tight'>SME Business Health</span>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-zinc-500 dark:text-zinc-400 hidden sm:inline-block'>
                {user.email}
              </span>
              <form>
                <button
                  formAction={logout}
                  className='px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200'
                >
                  Logout
                </button>
              </form>
            </div>
          </header>
        )}
        <main className='flex-1'>
          {children}
        </main>
      </body>
    </html>
  )
}
