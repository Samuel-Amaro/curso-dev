import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
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
		define: {
			'import.meta.env.POSTGRES_PASSWORD': JSON.stringify(env.POSTGRES_PASSWORD as string),
			'import.meta.env.POSTGRES_HOST': JSON.stringify(env.POSTGRES_HOST),
			'import.meta.env.POSTGRES_PORT': JSON.stringify(env.POSTGRES_PORT),
			'import.meta.env.POSTGRES_USER': JSON.stringify(env.POSTGRES_USER),
			'import.meta.env.POSTGRES_DB': JSON.stringify(env.POSTGRES_DB),
			'import.meta.env.DATABASE_URL': JSON.stringify(env.DATABASE_URL)
		}
	};
});
