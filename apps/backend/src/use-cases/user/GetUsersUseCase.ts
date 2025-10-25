import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from '../../db/schema';

export class GetUsersUseCase {
    constructor(private db: PostgresJsDatabase) {}

    async execute() {
        try {
            const allUsers = await this.db.select().from(users);

            return {
                success: true,
                data: allUsers,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'ユーザーの取得に失敗しました',
            };
        }
    }
}
