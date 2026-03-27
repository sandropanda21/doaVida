export type UserRole = 'donor' | 'recipient';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  blood_type: string | null;
  role: UserRole;
  province: string | null;
  municipality: string | null;
  birth_date: string | null;
  gender: string | null;
  avatar_url: string | null;
  created_at: string;
}
