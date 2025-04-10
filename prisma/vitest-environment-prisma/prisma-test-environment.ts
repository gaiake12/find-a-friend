import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { Environment } from "vitest";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environtment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      teardown() {
        prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

        prisma.$disconnect();
      },
    };
  },
};
