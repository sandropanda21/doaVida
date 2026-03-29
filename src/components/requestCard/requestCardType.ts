export type RequestStatus = "active" | "pending" | "fulfilled";

export interface BloodRequest {
  id: string;
  patient_name: string;
  blood_type: string;
  created_at: string;
  status: RequestStatus;
}
