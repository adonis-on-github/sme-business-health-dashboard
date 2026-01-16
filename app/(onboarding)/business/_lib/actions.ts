'use server'

import prisma from '@/db/prisma/client'
import { businessSchema, type BusinessFormValues } from './schema'
import { redirect } from 'next/navigation'
import { getErrorMessage } from '@/lib/action-utils'
import { getFieldErrors } from '@/lib/getZodFieldErrors'

export type ActionResponse = {
  success: boolean;
  message: string;

  errors?: Partial<Record<keyof BusinessFormValues, string[]>>;
}

export async function createBusiness(values: BusinessFormValues): Promise<ActionResponse> {
  const validatedFields = businessSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please check the highlighted fields',
      errors: getFieldErrors(validatedFields.error)
    }
  }

  try {
    const result = await prisma.business.create({
      data: {
        name: validatedFields.data.name,
        type: validatedFields.data.type,
        city: validatedFields.data.city,
        salesRange: validatedFields.data.salesRange,
        currency: validatedFields.data.currency
      },
    })

    redirect('/metrics')

  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)

    console.error(errorMessage)

    return { success: false, message: errorMessage }
  }

}