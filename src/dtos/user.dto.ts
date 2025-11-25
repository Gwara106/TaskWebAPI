import { z } from 'zod';
export const CreateUserDto = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
    age: z.number().optional(),
});

export const UpdateUserDto = z.object({
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
    age: z.number().optional(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;