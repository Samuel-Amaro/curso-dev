import { json } from "@sveltejs/kit";
import database from "../../../../../infra/database"

export async function GET() {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result.rows)
  return json({message: "Olá, curso.dev."})
}