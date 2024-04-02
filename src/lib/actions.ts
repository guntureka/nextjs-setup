"use server";

import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/lib/form-schemas";

/**
 * Logs in a user with the provided values.
 *
 * @param values - The values to be used for login.
 * @returns An object with either an error message or a success message.
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const parsedValues = LoginSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Something went wrong!" };
  }

  return { success: "Welcome back!" };
};

/**
 * Registers a user with the provided values.
 * @param values - The values to be registered.
 * @returns An object with either an error message or a success message.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const parsedValues = RegisterSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: "Something went wrong!" };
  }

  return { success: "Registration successfully!" };
};
