'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { SignupSchema } from '@/lib/auth/schema'
import { signupSchema } from '@/lib/auth/schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'

type SignupFormProps = {
  action: (data: SignupSchema) => Promise<string | undefined>
  nextPath?: string
}

export const SignupForm = ({ action, nextPath }: SignupFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nextPath,
    }
  })

  const onSubmit = (data: SignupSchema) => {
    startTransition(async () => {
      const result = await action(data)

      if (result) {
        setError(result)
      }

      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setError(null)}
        autoComplete='off'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input placeholder='you@example.com' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input
                  placeholder='Enter your password'
                  type='password' {...field}
                  autoComplete='new-password'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input placeholder='Confirm your password' type='password' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-col space-y-4 pt-2'>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'
          >
            Sign Up
          </Button>

          <Button
            disabled={isPending}
            type='button'
            variant='outline'
            onClick={() => router.push(routes.login)}
          >
            Log In
          </Button>
        </div>
      </form>
    </Form>
  )
}