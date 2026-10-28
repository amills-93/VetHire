import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '../generated/prisma/client'

let prisma: PrismaClient | undefined

// One client per Functions instance; created on first use so cold starts
// without a request don't open a connection.
export function usePrisma() {
  if (!prisma) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw createError({ statusCode: 500, statusMessage: 'DATABASE_URL is not set' })
    }
    prisma = new PrismaClient({ adapter: new PrismaMssql(url) })
  }
  return prisma
}
