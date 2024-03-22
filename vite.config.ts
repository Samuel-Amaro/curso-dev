import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: true
		//vite não escutando todos os endereços por padrão
		//https://yanneves.medium.com/sveltekit-on-github-codespaces-port-forwarding-returns-502-bad-gateway-43a4c7c7348e
		//https://pt.vitejs.dev/config/server-options
	},
	e
	define: {
		'import.meta.env.POSTGRES_PASSWORD': JSON.stringify(process.env.POSTGRES_PASSWORD as string),
		'import.meta.env.POSTGRES_HOST': JSON.stringify(process.env.POSTGRES_HOST),
		'import.meta.env.POSTGRES_PORT': JSON.stringify(process.env.POSTGRES_PORT),
		'import.meta.env.POSTGRES_USER': JSON.stringify(process.env.POSTGRES_USER),
		'import.meta.env.POSTGRES_DB': JSON.stringify(process.env.POSTGRES_DB),
		'import.meta.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL)
	}
});
