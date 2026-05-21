import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { envSchema } from "../config/env/env.schema";
import { admins } from "../modules/auth/schema/admins.schema";
import { hashPassword } from "../modules/auth/utils/password.util";

const seedAdmin = async () => {
  const env = envSchema.parse(process.env);

  if (!env.ADMIN_SEED_EMAIL || !env.ADMIN_SEED_PASSWORD) {
    console.error(
      "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in your environment to seed an admin.",
    );
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.DB_SSL ? { rejectUnauthorized: false } : undefined,
    max: 1,
  });

  const db = drizzle(pool);
  const email = env.ADMIN_SEED_EMAIL.toLowerCase();
  const fullName = env.ADMIN_SEED_FULL_NAME ?? "System Administrator";
  const passwordHash = await hashPassword(env.ADMIN_SEED_PASSWORD);

  const existing = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log(`Admin already exists for ${email}`);
    await pool.end();
    return;
  }

  await db.insert(admins).values({
    fullName,
    email,
    passwordHash,
  });

  console.log(`Seeded admin account for ${email}`);
  await pool.end();
};

void seedAdmin().catch((error) => {
  console.error("Failed to seed admin", error);
  process.exit(1);
});
