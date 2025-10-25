import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';

// Cloudflare WorkersのHyperdrive型をインポート
interface Hyperdrive {
    connectionString: string;
}

export interface Env {
    HYPERDRIVE: Hyperdrive;
}

export function createDatabaseClient(env: Env) {
    // Create a database client with postgres.js driver connected via Hyperdrive
    const sql = postgres(env.HYPERDRIVE.connectionString, {
        // Limit the connections for the Worker request to 5 due to Workers' limits on concurrent external connections
        max: 5,
        // If you are not using array types in your Postgres schema, disable `fetch_types` to avoid an additional round-trip (unnecessary latency)
        fetch_types: false,
    });

    // Create the Drizzle client with the postgres.js connection
    return drizzle(sql);
}

// Export the users table for use in other files
export { users };
