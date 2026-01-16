import { login, signup } from '../actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const LoginPage = async (props: {
  searchParams: Promise<{ next?: string }>
}) => {
  const searchParams = await props.searchParams
  const user = await getUser()

  if (user) {
    redirect(searchParams.next || '/business')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4'>
      <Card className='w-full max-w-md shadow-xl border-zinc-200 dark:border-zinc-800'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight'>
            Welcome Back
          </CardTitle>

          <CardDescription className='text-zinc-500 dark:text-zinc-400'>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='space-y-6'>
            <input type='hidden' name='next' value={searchParams.next || ''} />
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>

            <div className='flex flex-col space-y-4 pt-2'>
              <Button
                formAction={login}
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'
              >
                Log In
              </Button>

              <Button
                formAction={signup}
                variant='outline'
                className='w-full'
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
