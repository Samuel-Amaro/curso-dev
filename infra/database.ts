import pkg from "pg"
const {Client} = pkg

async function query(queryObject: any) {
  console.log(String(import.meta.env.POSTGRES_PASSWORD).toString())
  const client = new Client({
    host: process.env.HOST, //import.meta.env.HOST,
    port: parseInt(process.env.POSTGRES_PORT as string), //import.meta.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER, //import.meta.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB, //import.meta.env.POSTGRES_DB,
    password: String(process.env.POSTGRES_PASSWORD).toString() //import.meta.env.POSTGRES_PASSWORD
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query
};