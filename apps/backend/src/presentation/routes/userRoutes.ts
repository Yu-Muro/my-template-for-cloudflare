import { Hono } from 'hono';
import type { Env } from '../../db/connection';
import { createUser, getUsers } from '../controllers/userController';

export function createUserRoutes() {
    const app = new Hono<{ Bindings: Env }>();

    // GET /api/users - ユーザー一覧取得
    const users = app.get('/users', getUsers).post('/users', createUser);

    return users;
}
