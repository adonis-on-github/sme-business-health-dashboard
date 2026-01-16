const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 text-center'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800'>
        <div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-8 h-8'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' />
          </svg>
        </div>
        <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100'>Authentication Error</h1>
        <p className='text-zinc-500 dark:text-zinc-400'>
          Sorry, something went wrong during the authentication process. Please try again or contact support if the issue persists.
        </p>
        <a
          href='/login'
          className='inline-block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25'
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}

export default ErrorPage
