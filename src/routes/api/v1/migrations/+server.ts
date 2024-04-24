import { json, type RequestHandler } from '@sveltejs/kit';
import migrate from 'node-pg-migrate';
import { join } from 'node:path';
import database from '$lib/server/database';
import type { Client } from 'pg';

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
	let dbClient: Client | null = null;
	try {
		dbClient = await database.getNewClient()
		//@ts-ignore
		const runner = migrate['default'];
		const pendingMigrations = await runner({...defaultMigrationOptions, dbClient});
		return json(pendingMigrations);
	} catch (error) {
		console.error(error)
		throw error;
	}finally{
		if(dbClient)
			await dbClient.end()
	}
};

/**
 * Ira Ler as migrations migradas(já executas) no Modo Live Run
 * @returns
 */
export const POST: RequestHandler = async () => {
	let dbClient: Client | null = null
	try {
		dbClient = await database.getNewClient()
		//@ts-ignore
		const runner = migrate['default'];
		const migratedMigrations = await runner({ ...defaultMigrationOptions, dryRun: false, dbClient});
		if (migratedMigrations.length > 0) return json(migratedMigrations, { status: 201 });
		return json(migratedMigrations);
	} catch (error) {
		console.log(error)
		throw error;
	}finally {
		if(dbClient)
			await dbClient.end()
	}
	
};
