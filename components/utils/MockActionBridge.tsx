'use client'

import type { MockFormIds } from '@/lib/test/types'

type MockActionBridgeProps = {
  action: (data: FormData) => Promise<void>
  formIds: MockFormIds
}

export const MockActionBridge = ({ action, formIds: { form, data, submit } }: MockActionBridgeProps) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
    return null
  }

  return (
    <form action={action} id={form}>
      <input type='hidden' name='data' id={data} />
      <button type='submit' id={submit}>Submit</button>
    </form>
  )
}