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
	}
});
