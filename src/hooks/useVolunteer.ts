import { useState } from "react";
import { supabase } from "../lib/supabase";

export function useVolunteer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerError, setVolunteerError] = useState<string | null>(null);

  const registerVolunteer = async (requestId: string, userId: string) => {
    try {
      setIsSubmitting(true);
      setVolunteerError(null);

      const { error } = await supabase.from("volunteers").insert([
        {
          request_id: requestId,
          donor_id: userId,
          status: "interested",
        },
      ]);

      if (error) {
        // Tratar erro de duplicidade (PGRST116 ou 23505 código Postgres)
        if (error.code === "23505") {
          throw new Error("Você já se voluntariou para este pedido.");
        }
        throw error;
      }

      return { success: true };
    } catch (err: any) {
      setVolunteerError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    registerVolunteer,
    isSubmitting,
    volunteerError,
  };
}
