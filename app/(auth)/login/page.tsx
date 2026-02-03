
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthForm } from './_components/auth-form'

const LoginPage = async (props: {
  searchParams: Promise<{ next?: string }>
}) => {
  const searchParams = await props.searchParams

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
          <AuthForm nextPath={searchParams.next} />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
