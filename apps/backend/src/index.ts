import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './db/connection';
import { createUserRoutes } from './presentation/routes/userRoutes';

const app = new Hono<{ Bindings: Env }>();

app.use(
    '*',
    cors({
        origin: '*',
    }),
);
const appWithRoutes = app.route('/api', createUserRoutes());

export type AppType = typeof appWithRoutes;

export default app;
