import { z } from 'zod';

export const createBloodRequestSchema = z.object({
  patient_name: z
    .string({ error: 'Digite o nome do paciente' })
    .trim()
    .min(3, 'O nome do paciente deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),

  blood_type: z
    .string({ error: 'Selecione o tipo sanguíneo' })
    .min(1, 'Selecione o tipo sanguíneo')
    .refine(
      (val) => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
      'Tipo sanguíneo inválido'
    ),

  bags_quantity: z
    .string({ error: 'Selecione a quantidade de bolsas' })
    .min(1, 'Selecione a quantidade'),

  contact_phone: z
    .string({ error: 'Digite o número de telefone' })
    .trim()
    .min(9, 'Número de telefone inválido')
    .regex(
      /^(\+244)?9\d{8}$/,
      'Formato de telefone inválido (ex: 923456789 ou +244923456789)'
    ),

  description: z
    .string()
    .trim()
    .max(500, 'A descrição não pode ter mais de 500 caracteres')
    .default(''),
});

export type CreateBloodRequestFormData = z.infer<
  typeof createBloodRequestSchema
>;
