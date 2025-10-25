import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from '../../db/schema';
import type { CreateUserInput } from '../../infrastructure/validators/userValidator';

export class CreateUserUseCase {
    constructor(private db: PostgresJsDatabase) {}

    async execute(input: CreateUserInput) {
        try {
            // Check if user with the same email already exists
            const existingUser = await this.db
                .select()
                .from(users)
                .where(eq(users.email, input.email))
                .limit(1);

            if (existingUser.length > 0) {
                throw new Error('このメールアドレスは既に使用されています');
            }

            // Hash password before saving
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(
                input.password,
                saltRounds,
            );

            // Create new user
            const [newUser] = await this.db
                .insert(users)
                .values({
                    name: input.name,
                    email: input.email,
                    password: hashedPassword,
                    role: input.role,
                })
                .returning();

            return {
                success: true,
                data: newUser,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'ユーザーの作成に失敗しました',
            };
        }
    }
}
