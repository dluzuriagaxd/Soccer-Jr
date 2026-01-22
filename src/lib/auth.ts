import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "../db/schema";

export const auth = (db: D1Database, secret?: string) => betterAuth({
    secret: secret,
    database: drizzleAdapter(drizzle(db, { schema }), {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "student",
                required: false,
            }
        }
    }
});