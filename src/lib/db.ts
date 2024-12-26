/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

// Define prisma as a global variable of type PrismaClient
declare global {
  var prisma: PrismaClient;
}

// Check NODE_ENV and initialize prisma accordingly
if (process.env.NODE_ENV === "production") {
  global.prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

// Export prisma as default
export default global.prisma;
