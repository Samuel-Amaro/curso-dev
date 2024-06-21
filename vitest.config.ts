import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default defineConfig({
	test: {
		env: loadEnv('', process.cwd(), ''),
		testTimeout: 60000
	}
});
