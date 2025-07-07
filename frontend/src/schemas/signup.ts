import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .strict();

export type SignupSchema = z.infer<typeof signupSchema>;
