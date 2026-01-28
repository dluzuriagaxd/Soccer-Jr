/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        env: Env;
        cf: import("@cloudflare/workers-types").CfProperties;
        ctx: import("@cloudflare/workers-types").ExecutionContext;
        runtime: import("@astrojs/cloudflare").Runtime<Env>;
        isAdmin?: boolean;
    }
}

interface Env {
    DB: D1Database;
}