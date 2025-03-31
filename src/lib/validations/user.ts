import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
});

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string(),
  whatsapp_country_code: z.string().default('+55'),
  whatsapp_ddd: z.string().length(2, { message: 'DDD deve ter 2 dígitos' }),
  whatsapp_number: z.string().length(9, { message: 'Número deve ter 9 dígitos' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
});

export const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }).optional(),
  email: z.string().email({ message: 'Email inválido' }).optional(),
  whatsapp_country_code: z.string().optional(),
  whatsapp_ddd: z.string().length(2, { message: 'DDD deve ter 2 dígitos' }).optional(),
  whatsapp_number: z.string().length(9, { message: 'Número deve ter 9 dígitos' }).optional(),
  role: z.enum(['admin', 'parent', 'child']).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  newPassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword']
}); 