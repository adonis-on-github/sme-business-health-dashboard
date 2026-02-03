'use server'
import { getErrorMessage, getFieldErrors } from '@/lib/zod/error-utils'
import prisma from '@/lib/prisma/client'

import { businessSchema, type BusinessFormValues } from './schema'
import { getUser } from '@/lib/supabase/server'
import type { ActionResponse } from './types'

export const createBusiness = async (values: BusinessFormValues): Promise<ActionResponse> => {
  const user = await getUser()

  if (!user) {
    return {
      success: false,
      message: 'User must be authenticated'
    }
  }

  const validatedFields = businessSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      success: false,
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

    return { success: true, message: 'Business created successfully' }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)

    console.error(errorMessage)

    return { success: false, message: errorMessage }
  }
}