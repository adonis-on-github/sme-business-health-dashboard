import { redirect } from 'next/navigation'

import { routes } from '@/lib/routes'
import { getUser } from '@/lib/supabase/server'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { signup } from '@/lib/auth/actions'
import { SignupForm } from '@auth/_components/signup-form'

const SignupPage = async (props: {
  searchParams: Promise<{ next?: string }>
}) => {
  const searchParams = await props.searchParams
  const user = await getUser()

  if (user) {
    redirect(searchParams.next || routes.business)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4'>
      <Card className='w-full max-w-md shadow-xl border-zinc-200 dark:border-zinc-800'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight'>
            Welcome
          </CardTitle>

          <CardDescription className='text-zinc-500 dark:text-zinc-400'>
            Create your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignupForm nextPath={searchParams.next} action={signup} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupPage
