import { it, expect } from 'vitest';

it('testa retorno 200 para POST /api/v1/migrations', async () => {
  const response = await fetch("http://localhost:5173/api/v1/migrations", {
    method: "POST"
  });
  expect(response.status).toBe(200)

  const responseBody: any[] = await response.json()

  expect(Array.isArray(responseBody)).toBe(true)
});
