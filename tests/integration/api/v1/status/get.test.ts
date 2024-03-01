import { it, expect } from 'vitest';

it('testa retorno 200 para GET /api/v1/status', async () => {
  const response = await fetch("http://localhost:5173/api/v1/status");
  expect(response.status).toBe(200);
});

