import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as {
  prismaV6: PrismaClient | undefined
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

export const prisma = globalForPrisma.prismaV6 ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaV6 = prisma

