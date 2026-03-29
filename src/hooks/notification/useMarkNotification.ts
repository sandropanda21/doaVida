import { useState } from "react";
import { supabase } from "../../lib/supabase";

export function useMarkNotification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markError, setMarkError] = useState<string | null>(null);

  const markAsRead = async (notificationId: string) => {
    try {
      setIsSubmitting(true);
      setMarkError(null);

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId);

      if (error) throw error;

      return { success: true };
    } catch (err: any) {
      setMarkError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const markAllAsRead = async (userId: string) => {
    try {
      setIsSubmitting(true);
      setMarkError(null);

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);

      if (error) throw error;

      return { success: true };
    } catch (err: any) {
      setMarkError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    markAsRead,
    markAllAsRead,
    isSubmitting,
    markError,
  };
}
