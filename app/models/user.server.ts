import { db } from '~/drizzle/client.server';
import { users } from '~/drizzle/schema.server';
import { eq } from 'drizzle-orm';

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export async function getUserById(env: Env, id: number) {
  return await db(env.DB).select().from(users).where(eq(users.id, id)).get();
}

export async function verifyLogin(
  env: Env,
  data: { email: string; password: string }
) {
  const user = await db(env.DB)
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .get();
  if (!user) return null;
  if (user.password !== data.password) return null;
  return user;
}
