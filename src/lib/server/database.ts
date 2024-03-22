import pg from "pg";
import { env } from "$env/dynamic/private";

async function query(queryObject: any) {
  console.log(process.env.POSTGRES_HOST)
  console.log(import.meta.env.POSTGRES_HOST)
  const client = new pg.Client({
    host: import.meta.env.POSTGRES_HOST,
    port: parseInt(import.meta.env.POSTGRES_PORT as string),
    user: import.meta.env.POSTGRES_USER,
    database: import.meta.env.POSTGRES_DB,
    password: import.meta.env.POSTGRES_PASSWORD as string,
    ssl: import.meta.env.NODE_ENV === 'development' ? false : true
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error
  } finally {
    await client.end();
  }
}

export default {
  query: query
};