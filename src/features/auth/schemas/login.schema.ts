import { z } from 'zod';

const angolaPhoneRegex = /^(\+244)?9\d{8}$/;

const isValidEmail = (value: string) => {
  return z.string().email().safeParse(value).success;
};

const isValidPhone = (value: string) => {
  return angolaPhoneRegex.test(value);
};

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Informe o email ou número de telefone')
    .refine(
      (value) => isValidEmail(value) || isValidPhone(value),
      'Informe um email ou telefone válido'
    ),

  password: z
    .string()
    .min(6, 'A palavra-passe deve ter pelo menos 6 caracteres')
    .max(100),
});

export type LoginFormData = z.infer<typeof loginSchema>;
