import type { AppType } from 'backend/src';
import { hc } from 'hono/client';

export const client = hc<AppType>(
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
);
