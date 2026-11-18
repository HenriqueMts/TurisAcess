import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL não definido. Rode `npx neon@latest deploy` para popular o .env.local.",
  );
}

/** Cliente SQL da Neon (HTTP, serverless-friendly). Use como tagged template. */
export const sql = neon(connectionString);
