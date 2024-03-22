import { z } from 'zod';

export const createUserSchema = z.object({
  usernane: z.string({
    required_error: "usernane is required",
    invalid_type_error: "usernane must be a string",
  }),
  email: z.string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  }).email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "password is required",
  }).min(6),
});

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  content: z.string({
    required_error: "content is required",
    invalid_type_error: "content must be a string",
  }),
});

// Type definition for the payload
export type CreateUserType = z.infer<typeof createUserSchema>;
export type CreateTaskType = z.infer<typeof createTaskSchema>;


