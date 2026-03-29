import { z } from "zod";

const phoneRegex = /^(\+244)?9\d{8}$/;
const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;

function isValidDate(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function isValidAge(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - year;

  const hasHadBirthdayThisYear =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) age--;

  return age >= 18 && age <= 100;
}

export const signUpSchema = z
  .object({
    name: z
      .string({ error: "Insira o seu nome completo" })
      .trim()
      .min(2, "O nome completo deve ter pelo menos 2 caracteres")
      .max(100, "O nome completo é muito longo")
      .regex(nameRegex, "O nome contém caracteres inválidos"),

    gender: z.enum(["male", "female", "other"], {
      error: "Selecione um gênero válido",
    }),

    birthDate: z
      .string({ error: "Insira a sua data de nascimento" })
      .regex(dateRegex, "Formato deve ser dd-mm-aaaa")
      .refine(isValidDate, "Data de nascimento inválida")
      .refine(isValidAge, "Deves ter no mínimo 18 anos"),

    phone: z.string({ error: "Insira o seu número de telefone" })
      .trim()
      .regex(phoneRegex, "Número de telefone inválido"),

    email: z.string({ error: "Insira o seu email" })
      .trim()
      .toLowerCase()
      .email("E-mail inválido"),

    password: z
      .string({ error: "Insira a sua palavra-passe" })
      .min(8, "A palavra-passe deve ter pelo menos 8 caracteres")
      .max(100)
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um caractere especial"),

    confirmPassword: z.string({ error: "Confirme a sua palavra-passe" }),

    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      message: "Selecione um grupo sanguíneo válido",
    }),

    province: z.string({ error: "Confirme a sua província" }).trim().min(2, "Província inválida"),

    municipality: z.string({ error: "Confirme o seu município" }).trim().min(2, "Município inválido"),
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
