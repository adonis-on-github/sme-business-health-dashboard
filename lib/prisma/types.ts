import type prisma from './client'
import type { Prisma } from '@prisma/client'

/**
 * Metric type as returned by the extended Prisma client.
 * This includes the Decimal -> number conversions from the client extensions.
 */
export type ExtendedMetric = Awaited<ReturnType<typeof prisma.metric.findUnique>>

/**
 * Array of metrics as returned by the extended Prisma client.
 */
export type ExtendedMetrics = Awaited<ReturnType<typeof prisma.metric.findMany>>

/**
 * Business type as returned by the extended Prisma client.
 */
export type ExtendedBusiness = Awaited<ReturnType<typeof prisma.business.findUnique>>

/**
 * Generic helper to extract the return type of any Prisma query.
 *
 * @example
 * type MyMetric = PrismaQueryResult<typeof prisma.metric.findUnique>
 */
export type PrismaQueryResult<T extends (...args: unknown[]) => unknown> = Awaited<ReturnType<T>>

/**
 * Helper to get payload type with includes/selects
 *
 * @example
 * type MetricWithBusiness = PrismaPayload<'metric', { include: { business: true } }>
 */
export type PrismaPayload<
  Model extends Prisma.ModelName,
  Args = unknown
> = Prisma.TypeMap['model'][Model]['operations']['findUnique']['result'] & Args
