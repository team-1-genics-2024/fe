import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(4, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one number"),
});
export type SignUpFormData = z.infer<typeof signUpSchema>;
