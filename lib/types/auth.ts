import { z, ZodType } from "zod";

export type SigninFormData = {
  identifier: string;
  password: string;
};

export const SigninSchema: ZodType<SigninFormData> = z.object({
  identifier: z.string().min(2),
  password: z.string().min(6),
});

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type RegistrationPayload = RegistrationFormData & {
  username: string;
  active: boolean;
};

export const RegistrationSchema: ZodType<RegistrationFormData> = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string(),
    // .regex(/^(07d{8}|2547d{8})$/, "Invalid phone number"),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
  activated: boolean | null;
  name: string;
};

export type tokenType = string;
