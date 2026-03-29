import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ error: "Insira o seu email" })
    .trim()
    .min(1, "O email é obrigatório")
    .email("Introduza um endereço de email válido"),

  password: z
    .string({ error: "Insira a sua palavra-passe" })
    .min(8, "A palavra-passe deve ter pelo menos 8 caracteres")
    .max(50),
});

export type LoginFormData = z.infer<typeof loginSchema>;
