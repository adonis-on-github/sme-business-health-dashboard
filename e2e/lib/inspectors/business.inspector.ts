
import prisma from '@/lib/prisma/client'

export const businessInspector = async (userId: string) => {
  const business = await prisma.business.findUnique({
    where: { userId },
  })

  return business
}