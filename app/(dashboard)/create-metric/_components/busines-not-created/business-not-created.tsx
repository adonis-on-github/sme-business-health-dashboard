'use client'

import { useRouter } from 'next/navigation'

import { routes } from '@dashboard/_lib/routes'

import { Button } from '@/components/ui/button'
const BusinessNotCreated = () => {
  const router = useRouter()

  return (
    <section className='flex flex-col items-start justify-center h-full gap-4'>
      <h2 className='text-2xl font-bold'>There is no existing business</h2>

      <p className='text-sm text-slate-500'>
        Please create a business to continue
      </p>

      <Button
        className='px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20'
        onClick={() => router.push(routes.business)}
      >
        Create Business
      </Button>
    </section>
  )
}

export default BusinessNotCreated
