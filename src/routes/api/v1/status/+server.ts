import { json } from '@sveltejs/kit';
import database from '$lib/server/database';
import { env } from '$env/dynamic/private';

/**
 * Ira devolver informações sobre a saude do nosso sistema
 * @returns
 */
export async function GET() {
	const updateAt = new Date().toISOString();
	const version = await database.query('SHOW server_version;');
	const max_connections = await database.query('SHOW max_connections');
	const opened_connections = await database.query({
		text: 'SELECT COUNT(*)::int AS oppened_connections FROM pg_stat_activity WHERE datname = $1;',
		values: [import.meta.env.POSTGRES_DB]
	});
	return json({
		updated_at: updateAt,
		dependencies: {
			database: {
				version: version.rows[0].server_version,
				max_connections: parseInt(max_connections.rows[0].max_connections),
				oppened_connections: opened_connections.rows[0].oppened_connections
			}
		}
	});
}
