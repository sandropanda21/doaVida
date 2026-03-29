import { z } from "zod";

const phoneRegex = /^(\+244)?9\d{8}$/;

const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "O nome completo deve ter pelo menos 2 caracteres")
      .max(100, "O nome completo é muito longo")
      .regex(nameRegex, "O nome contém caracteres inválidos"),

    gender: z.enum(["male", "female", "other"], {
      error: "Selecione um gênero válido",
    }),

    birthDate: z
      .string()
      .refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      }, "Data de nascimento inválida")
      .refine((date) => {
        const parsedDate = new Date(date);
        const today = new Date();

        const age = today.getFullYear() - parsedDate.getFullYear();

        return age >= 16;
      }, "É necessário ter pelo menos 16 anos"),

    phone: z.string().trim().regex(phoneRegex, "Número de telefone inválido"),

    email: z.string().trim().toLowerCase().email("E-mail inválido"),

    password: z
      .string()
      .min(8, "A palavra-passe deve ter pelo menos 8 caracteres")
      .max(100)
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

    confirmPassword: z.string(),

    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      message: "Selecione um grupo sanguíneo válido",
    }),

    province: z.string().trim().min(2, "Província inválida"),

    municipality: z.string().trim().min(2, "Município inválido"),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "As palavras-passe não coincidem",
      });
    }
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
