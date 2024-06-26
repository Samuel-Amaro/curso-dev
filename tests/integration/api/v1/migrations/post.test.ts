import { it, expect, beforeAll } from 'vitest';
import database from '../../../../../src/lib/server/database';
import orchestrator from '../../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await database.query('drop schema public cascade; create schema public;');
});

it('testa retorno 200 para POST /api/v1/migrations', async () => {
	const response1 = await fetch('http://localhost:5173/api/v1/migrations', {
		method: 'POST'
	});
	expect(response1.status).toBe(201);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const responseBody1: any[] = await response1.json();

	expect(Array.isArray(responseBody1)).toBe(true);
	expect(responseBody1.length).toBeGreaterThan(0);

	const response2 = await fetch('http://localhost:5173/api/v1/migrations', {
		method: 'POST'
	});
	expect(response2.status).toBe(200);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const responseBody2: any[] = await response2.json();

	expect(Array.isArray(responseBody2)).toBe(true);
	expect(responseBody2.length).toBe(0);
});
