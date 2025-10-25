import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from '../../db/schema';

export interface AuthenticateUserInput {
    email: string;
    password: string;
}

export class AuthenticateUserUseCase {
    constructor(private db: PostgresJsDatabase) {}

    async execute(input: AuthenticateUserInput) {
        try {
            // Find user by email
            const [user] = await this.db
                .select()
                .from(users)
                .where(eq(users.email, input.email))
                .limit(1);

            if (!user) {
                return {
                    success: false,
                    error: 'メールアドレスまたはパスワードが正しくありません',
                };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(
                input.password,
                user.password,
            );

            if (!isPasswordValid) {
                return {
                    success: false,
                    error: 'メールアドレスまたはパスワードが正しくありません',
                };
            }

            const { password: _password, ...userWithoutPassword } = user;

            return {
                success: true,
                data: userWithoutPassword,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : '認証に失敗しました',
            };
        }
    }
}
