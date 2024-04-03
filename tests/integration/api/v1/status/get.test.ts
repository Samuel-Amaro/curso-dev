import { it, expect } from 'vitest';
import type { TypeAPIStatus } from '../../../../../src/types/apis';

it('testa retorno 200 para GET /api/v1/status', async () => {
	const response = await fetch('http://localhost:5173/api/v1/status');
	expect(response.status).toBe(200);

	const responseBody: TypeAPIStatus = await response.json();
	expect(responseBody.updated_at).toBeDefined();

	const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
	expect(responseBody.updated_at).toEqual(parsedUpdateAt);

	expect(responseBody.dependencies.database.version).toBeDefined();
	expect(responseBody.dependencies.database.version).toEqual('16.0');

	expect(responseBody.dependencies.database.max_connections).toBeDefined();
	expect(responseBody.dependencies.database.max_connections).toEqual(100);

	expect(responseBody.dependencies.database.oppened_connections).toBeDefined();
	expect(responseBody.dependencies.database.oppened_connections).toEqual(1);
});
