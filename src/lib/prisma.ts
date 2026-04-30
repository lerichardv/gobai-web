import { PrismaClient } from "@prisma/client"
// Schema updated at: 2026-04-29T13:19:00
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prismaV5: PrismaClient | undefined
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prismaV5 ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaV5 = prisma
