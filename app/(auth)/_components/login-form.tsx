'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { loginSchema } from '@/lib/auth/schema'
import type { LoginSchema } from '@/lib/auth/schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { routes } from '@/lib/routes'

type Props = {
  nextPath?: string
  action: (data: LoginSchema) => Promise<string | undefined>
}

export const LoginForm = ({ nextPath, action }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      nextPath,
    }
  })

  const onSubmit = (data: LoginSchema) => {
    startTransition(async () => {
      const result = await action(data)

      if (result) {
        setError(result)
      }
    })
  }

  return (
    <Form key='login' {...form}>
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
            <FormItem
              className='space-y-2'
            >
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

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-col space-y-4 pt-2'>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'
          >
            Log In
          </Button>

          <Button
            disabled={isPending}
            variant='outline'
            type='button'
            onClick={() => router.push(routes.signup)}
          >
            Sign Up
          </Button>
        </div>

      </form>
    </Form >
  )
}