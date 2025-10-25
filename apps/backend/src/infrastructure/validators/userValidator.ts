import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .min(1, '名前は必須です')
        .max(255, '名前は255文字以内で入力してください'),
    email: z
        .string()
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            '有効なメールアドレスを入力してください',
        )
        .max(255, 'メールアドレスは255文字以内で入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
    role: z
        .string()
        .min(1, '権限は必須です')
        .max(50, '権限は50文字以内で入力してください')
        .optional()
        .default('user'),
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(1, '名前は必須です')
        .max(255, '名前は255文字以内で入力してください')
        .optional(),
    email: z
        .string()
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            '有効なメールアドレスを入力してください',
        )
        .max(255, 'メールアドレスは255文字以内で入力してください')
        .optional(),
    password: z
        .string()
        .min(8, 'パスワードは8文字以上で入力してください')
        .optional(),
    role: z
        .string()
        .min(1, '権限は必須です')
        .max(50, '権限は50文字以内で入力してください')
        .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
