import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/drizzle/schema.server.ts',
  out: './app/drizzle/migrations',
  dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
});
