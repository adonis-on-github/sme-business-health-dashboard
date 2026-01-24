'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type PrerequisiteMissingProps = {
  title: string
  description: string
  actionText: string
  route: string
}

const PrerequisiteMissing = ({ title, description, actionText, route }: PrerequisiteMissingProps) => {
  const router = useRouter()

  return (
    <section className='flex flex-col items-start justify-center h-full gap-4'>
      <h2 className='text-2xl font-bold'>{title}</h2>

      <p className='text-sm text-slate-500'>{description}</p>

      <Button
        className='px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20'
        onClick={() => router.push(route)}
      >
        {actionText}
      </Button>
    </section>
  )
}

export default PrerequisiteMissing