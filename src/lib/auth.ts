import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "../db/schema";

export const auth = (db: D1Database) => betterAuth({
    database: drizzleAdapter(drizzle(db, { schema }), {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true
    },
    // Aquí podrías añadir más opciones luego
});