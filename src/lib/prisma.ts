// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
const g = global as unknown as { prisma?: PrismaClient };

export const prisma =
  g.prisma ?? new PrismaClient(/* { log: ['warn','error'] } */);

if (process.env.NODE_ENV !== "production") g.prisma = prisma;
