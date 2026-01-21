import type { Business } from '@prisma/client'

import { getUser } from '@/lib/supabase/server'
import prisma from '@/lib/prisma/client'

export const getUserBusiness = async (): Promise<Business | null> => {
  const user = await getUser()

  if (!user) {
    return null
  }

  const result = await prisma.business.findUnique({
    where: {
      userId: user.id
    }
  })

  return result
}