'use server'

import { redirect } from 'next/navigation'

import prisma from '@/db/prisma/client'
import { businessSchema, type BusinessFormValues } from './schema'
import { getErrorMessage, getFieldErrors } from '@/lib/error-utils'
import { getUser } from '@/lib/supabase/server'

export type ActionResponse = {
  success: boolean;
  message: string;

  errors?: Partial<Record<keyof BusinessFormValues, string[]>>;
}

export async function createBusiness(values: BusinessFormValues): Promise<ActionResponse> {
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

    redirect('/metrics')

  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)

    console.error(errorMessage)

    return { success: false, message: errorMessage }
  }
}