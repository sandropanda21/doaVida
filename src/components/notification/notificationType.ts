export type NotificationType = "DONOR_FOUND" | "BLOOD_REQUEST";

export interface Notification {
  id: string;
  type: NotificationType;
  requestId: string;
  read: boolean;
  createdAt: string;
  bloodType?: string;
  donorCount?: number;
}
