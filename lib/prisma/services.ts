import { cache } from 'react'
import { redirect } from 'next/navigation'

import type { Business } from '@prisma/client'
import { routes } from '@/lib/routes'

import { getUser } from '@/lib/supabase/server'
import prisma from '@/lib/prisma/client'

export const getUserBusiness = cache(async (): Promise<Business | null> => {
  const user = await getUser()

  if (!user) {
    return redirect(routes.login)
  }

  const result = await prisma.business.findUnique({
    where: {
      userId: user.id
    }
  })

  return result
})