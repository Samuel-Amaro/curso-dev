import { it, expect, beforeAll, describe } from 'vitest';
import database from '../../../../../src/lib/server/database';
import type { TypeAPIStatus } from '../../../../../src/types/apis';
import orchestrator from '../../../../orchestrator';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query('drop schema public cascade; create schema public;');
})

describe('DELETE /api/v1/migrations', () => {
  it('testa retorno 405 para DELETE /api/v1/migrations', async () => {
    const response = await fetch('http://localhost:5173/api/v1/migrations', {
      method: 'DELETE'
    });
    expect(response.status).toBe(405);
  });

  it('testa se não há conexões DB abertas com método HTTP diferente', async () => {
    const response = await fetch('http://localhost:5173/api/v1/status');
	  expect(response.status).toBe(200);
    const responseBody: TypeAPIStatus = await response.json();
    expect(responseBody.dependencies.database.oppened_connections).toEqual(1);

    const response1 = await fetch('http://localhost:5173/api/v1/migrations', {
		  method: 'DELETE'
	  });
	  expect(response1.status).toBe(405);
    
    const response2 = await fetch('http://localhost:5173/api/v1/migrations', {
		  method: 'DELETE'
	  });
	  expect(response2.status).toBe(405);

    const response3 = await fetch('http://localhost:5173/api/v1/migrations', {
		  method: 'DELETE'
	  });
	  expect(response3.status).toBe(405);


    const response4 = await fetch('http://localhost:5173/api/v1/status');
	  expect(response4.status).toBe(200);

    const responseBody4: TypeAPIStatus = await response4.json();
    expect(responseBody4.dependencies.database.oppened_connections).toEqual(1);
  })
})


