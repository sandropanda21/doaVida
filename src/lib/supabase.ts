import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type UserRole = 'donor' | 'recipient'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone: string
  blood_type: string | null
  role: UserRole
  province: string | null
  municipality: string | null
  birth_date: string | null
  gender: string | null
  avatar_url: string | null
  created_at: string
}

export interface BloodRequest {
  id: string
  patient_name: string
  blood_type: string
  bags_quantity: number
  province: string
  municipality: string | null
  hospital: string
  contact_phone: string
  description: string
  status: 'pending' | 'fulfilled' | 'cancelled'
  urgency: 'high' | 'medium' | 'low'
  user_id: string
  document_url: string | null
  created_at: string
}

export const BLOOD_TYPES = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
]

export const PROVINCES = [
  { label: 'Benguela', value: 'Benguela' },
  { label: 'Bié', value: 'Bié' },
  { label: 'Cabinda', value: 'Cabinda' },
  { label: 'Cuando Cubango', value: 'Cuando Cubango' },
  { label: 'Cuanza Norte', value: 'Cuanza Norte' },
  { label: 'Cuanza Sul', value: 'Cuanza Sul' },
  { label: 'Cunene', value: 'Cunene' },
  { label: 'Huambo', value: 'Huambo' },
  { label: 'Huíla', value: 'Huíla' },
  { label: 'Luanda', value: 'Luanda' },
  { label: 'Lunda Norte', value: 'Lunda Norte' },
  { label: 'Lunda Sul', value: 'Lunda Sul' },
  { label: 'Malanje', value: 'Malanje' },
  { label: 'Moxico', value: 'Moxico' },
  { label: 'Namibe', value: 'Namibe' },
  { label: 'Uíge', value: 'Uíge' },
  { label: 'Zaire', value: 'Zaire' },
]

/**
 * Uploads a file to Supabase Storage
 * @param bucket - The bucket name
 * @param path - The path inside the bucket
 * @param file - The file (Blob/File)
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(bucket: string, path: string, file: any) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true
  })

  if (error) {
    throw error
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return publicUrl
}
