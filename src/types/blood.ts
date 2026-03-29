export interface BloodRequest {
  id: string;
  patient_name: string;
  blood_type: string;
  bags_quantity: number;
  province: string;
  municipality: string | null;
  hospital: string;
  contact_phone: string;
  description: string;
  status: 'active' | 'pending' | 'fulfilled';
  urgency: 'high' | 'medium' | 'low';
  user_id: string;
  document_url: string | null;
  created_at: string;
}
