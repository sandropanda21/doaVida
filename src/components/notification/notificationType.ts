export type NotificationDBType = "new_volunteer" | "compatible_request";

export interface NotificationDB {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationDBType;
  related_id: string | null; // ID do pedido ou do voluntário
  is_read: boolean;
  created_at: string;        // ISO string vinda do Supabase
}
