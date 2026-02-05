'use client'

import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { authSchema } from '@/lib/auth/schema'
import type { AuthSchema } from '@/lib/auth/schema'
import { login, signup } from '@/lib/auth/actions'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { setServerErrors } from '@/lib/zod/error-utils'
import { AuthFormIds } from '@auth/login/_lib/test.ids'

type Props = {
  nextPath?: string
}

type AuthType = 'login' | 'signup'

export const AuthForm = ({ nextPath }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      nextPath,
    },
  })

  const handleAuth = (values: AuthSchema, type: AuthType = 'login') => {
    const authAction = type === 'login' ? login : signup

    startTransition(async () => {
      const result = await authAction(values)

      if (result?.message) {
        setAuthError(result.message)
      }

      if (result?.errors) {
        setServerErrors(result.errors, form.setError)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onChange={() => setAuthError(null)}
        autoComplete='off'
        onSubmit={form.handleSubmit(values => handleAuth(values))}
        data-testid={AuthFormIds.form}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder='Enter your email' {...field} data-testid={AuthFormIds.email} autoFocus />
              </FormControl>

              <FormMessage data-testid={AuthFormIds.emailError} />
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
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                  autoComplete='new-password'
                  data-testid={AuthFormIds.password}
                />
              </FormControl>

              <FormMessage data-testid={AuthFormIds.passwordError} />
            </FormItem>
          )}
        />

        {authError && <p className='text-red-500' data-testid={AuthFormIds.error}>{authError}</p>}

        <div className='flex flex-col space-y-4 pt-2'>
          <Button
            disabled={isPending}
            // type='button'
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'
            // onClick={form.handleSubmit(values => handleAuth(values, 'login'))}
            data-testid={AuthFormIds.login}
          >
            Log In
          </Button>

          <Button
            disabled={isPending}
            variant='outline'
            type='button'
            onClick={form.handleSubmit(values => handleAuth(values, 'signup'))}
            data-testid={AuthFormIds.signup}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  )
}