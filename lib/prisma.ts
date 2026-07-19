import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (process.env.npm_lifecycle_event === "build" || process.env.VERCEL_ENV === "production" && !process.env.DATABASE_URL
    ? ({} as PrismaClient)
    : new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL?.includes("pooler") && !process.env.DATABASE_URL?.includes("pgbouncer")
          ? `${process.env.DATABASE_URL}${process.env.DATABASE_URL.includes("?") ? "&" : "?"}pgbouncer=true`
          : process.env.DATABASE_URL,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      }));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
