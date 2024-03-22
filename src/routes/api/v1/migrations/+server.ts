import { json } from "@sveltejs/kit";
import migrate  from "node-pg-migrate"
import { env } from "$env/dynamic/private";
import {join} from "node:path"

/**
 * Ira executar as migrations no modo Dry Run
 * @returns 
 */
export async function GET() {
  //@ts-ignore
  const runner = migrate['default']
  const migrations = await runner({
    databaseUrl: import.meta.env.DATABASE_URL as string,
    dryRun: true,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  })
  return json(migrations)
}

export async function POST() {
  //@ts-ignore
  const runner = migrate['default']
  const migrations = await runner({
    databaseUrl: import.meta.env.DATABASE_URL as string,
    dryRun: false,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  })
  return json(migrations)
}