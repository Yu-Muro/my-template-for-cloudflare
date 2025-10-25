import type { Context } from 'hono';
import { createDatabaseClient, type Env } from '../../db/connection';
import { createUserSchema } from '../../infrastructure/validators/userValidator';
import { CreateUserUseCase } from '../../use-cases/user/CreateUserUseCase';
import { GetUsersUseCase } from '../../use-cases/user/GetUsersUseCase';

export async function getUsers(c: Context<{ Bindings: Env }>) {
    try {
        const db = createDatabaseClient(c.env);
        const useCase = new GetUsersUseCase(db);
        const result = await useCase.execute();

        if (!result.success) {
            return c.json({ error: result.error }, 500);
        }

        return c.json({ users: result.data });
    } catch {
        return c.json({ error: 'ユーザーの取得に失敗しました' }, 500);
    }
}

export async function createUser(c: Context<{ Bindings: Env }>) {
    try {
        const body = await c.req.json();
        const validation = createUserSchema.safeParse(body);

        if (!validation.success) {
            return c.json(
                {
                    error: 'バリデーションエラー',
                    details: validation.error.issues,
                },
                400,
            );
        }

        const db = createDatabaseClient(c.env);
        const useCase = new CreateUserUseCase(db);
        const result = await useCase.execute(validation.data);

        if (!result.success) {
            return c.json({ error: result.error }, 400);
        }

        return c.json({ user: result.data }, 201);
    } catch {
        return c.json({ error: 'ユーザーの作成に失敗しました' }, 500);
    }
}
