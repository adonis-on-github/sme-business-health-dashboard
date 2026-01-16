import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='flex min-h-[calc(100-64px)] items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 px-4'>
      <Card className='w-full max-w-md text-center shadow-xl border-zinc-200 dark:border-zinc-800'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <div className='p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-600 dark:text-indigo-400'>
              <FileQuestion size={48} />
            </div>
          </div>
          <CardTitle className='text-3xl font-bold tracking-tight'>404</CardTitle>

          <CardTitle className='text-xl text-zinc-900 dark:text-zinc-100'>Page Not Found</CardTitle>
        </CardHeader>

        <CardContent>
          <p className='text-zinc-500 dark:text-zinc-400'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
        </CardContent>

        <CardFooter className='flex justify-center pb-8'>
          <Button asChild className='bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'>
            <Link href='/'>
              Return to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NotFound
