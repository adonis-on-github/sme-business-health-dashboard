'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { getErrorMessage, getFieldErrors } from '@/lib/zod/error-utils'
import prisma from '@/lib/prisma/client'

import { businessSchema, type BusinessFormValues } from './schema'
import { getUser } from '@/lib/supabase/server'
import type { ActionResponse } from './types'
import { routes } from '@/lib/routes'

export const createBusiness = async (values: BusinessFormValues): Promise<ActionResponse> => {
  const user = await getUser()

  if (!user) {
    return {
      message: 'User must be authenticated'
    }
  }

  const validatedFields = businessSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      message: 'Please check the highlighted fields',
      errors: getFieldErrors(validatedFields.error)
    }
  }

  const { customBusinessType, customSalesRange, ...data } = validatedFields.data

  const businessData = {
    ...data,
    type: data.type === 'Other' ? customBusinessType! : data.type,
    salesRange: data.salesRange === 'Other' ? customSalesRange! : data.salesRange,
  }

  try {
    await prisma.business.upsert({
      where: {
        userId: user.id
      },
      update: businessData,
      create: {
        ...businessData,
        userId: user.id
      },
    })

  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)

    console.error(errorMessage)

    return { message: errorMessage }
  }

  revalidatePath(routes.business)

  redirect(routes.createMetric)
}