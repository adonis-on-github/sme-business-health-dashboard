import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { routes } from '@/lib/routes'
import { Logo } from '@/components/custom/logo'

const Home = async () => {
  const user = await getUser()

  if (user) {
    redirect(routes.business)
  }

  return (
    <div
      className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-center gap-6'
    >
      <header>
        <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 pt-4'>
          <Logo />
        </h1>
      </header>

      <main className='w-full space-y-10 mt-4'>
        <p className='text-justify sm:w-6xl text-xl text-zinc-500 mt-4 dark:text-zinc-400  mx-4  sm:mx-auto'>
          The all-in-one dashboard to track, analyze, and optimize your business performance with AI-driven insights.
        </p>

        <div className='flex justify-center'>
          <Button asChild size='lg' className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-xl rounded-xl shadow-lg shadow-indigo-500/25'>
            <Link href={routes.login}>Get Started</Link>

          </Button>
        </div>

      </main>

      <footer className='grid grid-cols-1 sm:w-6xl sm:grid-cols-3 gap-8 pt-10 border-zinc-200 dark:border-zinc-800'>
        <div className='space-y-2'>
          <h3 className='font-bold'>Real-time Tracking</h3>

          <p className='text-sm text-justify mx-4 sm:text-justify sm:mx-auto text-zinc-500'>Monitor your cashflow and revenue instantly.</p>
        </div>

        <div className='space-y-2'>
          <h3 className='font-bold'>Health Scoring</h3>

          <p className='text-sm text-justify mx-4 sm:text-justify sm:mx-auto text-zinc-500'>Get a 0-100 score of your business health.</p>
        </div>

        <div className='space-y-2'>
          <h3 className='font-bold'>AI Advice</h3>
          <p className='text-sm text-justify mx-4 sm:text-justify sm:mx-auto text-zinc-500'>Custom step-by-step actions to grow faster.</p>
        </div>
      </footer>

    </div>
  )
}

export default Home
