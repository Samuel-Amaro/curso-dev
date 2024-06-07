import { it, expect, beforeAll } from 'vitest';
import database from '../../../../../src/lib/server/database';
import orchestrator from '../../../../orchestrator';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query('drop schema public cascade; create schema public;');
})

it('testa retorno 200 para GET /api/v1/migrations', async () => {
	const response = await fetch('http://localhost:5173/api/v1/migrations');
	expect(response.status).toBe(200);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const responseBody: any[] = await response.json();

	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
});
