import pg from "pg";
import { env } from "$env/dynamic/private";

async function query(queryObject: any) {
  const client = new pg.Client({
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT as string),
    user: env.POSTGRES_USER,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD
  });
  await client.connect();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error)
  } finally {
    await client.end();
  }
}

export default {
  query: query
};