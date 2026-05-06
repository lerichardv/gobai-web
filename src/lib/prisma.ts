import { PrismaClient } from "@prisma/client"
// Schema updated at: 2026-05-05T16:52:00
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prismaV6: PrismaClient | undefined
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prismaV6 ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaV6 = prisma
