import { login, signup } from '../actions'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100'>
            Welcome Back
          </h1>
          <p className='mt-2 text-zinc-500 dark:text-zinc-400'>
            Sign in to your account to continue
          </p>
        </div>

        <form className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='mt-1 block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                placeholder='you@example.com'
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='mt-1 block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                placeholder='••••••••'
              />
            </div>
          </div>

          <div className='flex flex-col space-y-4'>
            <button
              formAction={login}
              className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 active:transform active:scale-[0.98]'
            >
              Log In
            </button>
            <button
              formAction={signup}
              className='w-full py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold rounded-xl transition-all duration-200 active:transform active:scale-[0.98]'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
