import pg from 'pg';

async function query(queryObject: any) {
	const client = await getNewClient();
	try {
		const result = await client.query(queryObject);
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
	}
}

async function getNewClient() {
	const client = new pg.Client({
		host: import.meta.env.POSTGRES_HOST,
		port: parseInt(import.meta.env.POSTGRES_PORT as string),
		user: import.meta.env.POSTGRES_USER,
		database: import.meta.env.POSTGRES_DB,
		password: import.meta.env.POSTGRES_PASSWORD as string,
		ssl: import.meta.env.MODE === 'production' ? true : false
	});

	await client.connect()
	return client
}

export default {
	query,
	getNewClient
};
