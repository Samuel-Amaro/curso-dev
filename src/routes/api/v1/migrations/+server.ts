import { json, type RequestHandler } from '@sveltejs/kit';
import migrate from 'node-pg-migrate';
import { join } from 'node:path';
import database from '$lib/server/database';

const defaultMigrationOptions = {
	dryRun: true,
	migrationsTable: 'pgmigrations',
	dir: join('infra', 'migrations'),
	direction: 'up',
	verbose: true
};

/**
 * Ira Ler as migrations pendentes e executar no modo Dry Run
 * @returns
 */
export const GET: RequestHandler = async () => {
	const dbClient = await database.getNewClient()
	//@ts-ignore
	const runner = migrate['default'];
	const pendingMigrations = await runner({...defaultMigrationOptions, dbClient});
	await dbClient.end()
	return json(pendingMigrations);
};

/**
 * Ira Ler as migrations migradas(já executas) no Modo Live Run
 * @returns
 */
export const POST: RequestHandler = async () => {
	const dbClient = await database.getNewClient()
	//@ts-ignore
	const runner = migrate['default'];
	const migratedMigrations = await runner({ ...defaultMigrationOptions, dryRun: false, dbClient});
	await dbClient.end()
	if (migratedMigrations.length > 0) return json(migratedMigrations, { status: 201 });
	return json(migratedMigrations);
};
