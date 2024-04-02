import { z } from "zod";

/**
 * Represents the login form schema.
 */
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email required!",
  }),
  password: z.string().min(1, {
    message: "Password required!",
  }),
});

/**
 * Schema for user registration form.
 */
export const RegisterSchema = z
  .object({
    name: z.string().min(8, {
      message: "Name must be >= 8!",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be >= 8!",
    }),
    confirmPassword: z.string(),
  })
  .superRefine((arg, ctx) => {
    /**
     * Check if the password contains spaces.
     * If it does, add an issue to the context.
     */
    if (arg.password.includes(" ")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must not have spaces!",
        path: ["password"],
      });
    }

    /**
     * Check if the password and confirmPassword match.
     * If they don't, add an issue to the context.
     */
    if (arg.password !== arg.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password does not match!",
        path: ["confirmPassword"],
      });
    }
  });
