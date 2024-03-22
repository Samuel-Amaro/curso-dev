import { it, expect, vi, beforeEach } from 'vitest';
import database from '$lib/server/database';
import { env } from '$env/dynamic/private';
import dotenv from 'dotenv'

beforeEach(() => {
  //import.meta.env.NODE_ENV = 'development'
  vi.stubEnv('NODE_ENV', 'development')
  env.NODE_ENV = 'development'
  dotenv.config({path: '.env.development'})
})

it('testa retorno 200 para GET /api/v1/migrations', async () => {
  const response = await fetch("http://localhost:5173/api/v1/migrations");
  expect(response.status).toBe(200)

  const responseBody: any[] = await response.json()

  expect(Array.isArray(responseBody)).toBe(true)
  //expect(responseBody.length).toBeGreaterThan(0)

  //provar através do código que o processo do Jest de fato está rodando no ambiente test e também provar que as credenciais do Banco de Dados não estão sendo injetadas no process.env.
  //expect(process.env.NODE_ENV).toBe('test')
  //expect(process.env.POSTGRES_HOST).toBeUndefined()
  //expect(env.NODE_ENV).toBe('test')  
  //expect(process.env.POSTGRES_HOST).toBeUndefined()
  expect(process.env.NODE_ENV).toBe('development')
  expect(env.NODE_ENV).toBe('development')
  //expect(env.POSTGRES_HOST).toBe('localhost')
  expect(process.env.POSTGRES_HOST).toBe('localhost')
  await database.query("SELECT 1 + 1 AS result")
  //TODO: DESOBRIR MANEIRA DE RESOLVER O DESAFIO 2 DE COMO FAZER LER AS VARIAVEIS DE AMBIENTe
});
