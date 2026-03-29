import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { NotificationDBType } from "../../components/notification/notificationType";

type SendNotificationParams = {
  userId: string;
  type: NotificationDBType;
  relatedId?: string;
};

export function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const buildContent = (
    type: NotificationDBType,
    bloodType?: string,
    donorCount?: number
  ): { title: string; message: string } => {
    switch (type) {
      case "new_volunteer":
        return {
          title: "Doador Encontrado",
          message: `O seu pedido foi aceite por ${donorCount ?? 1} doador${(donorCount ?? 1) !== 1 ? "es" : ""}.`,
        };
      case "compatible_request":
        return {
          title: "Pedido de Sangue",
          message: `Precisa-se de sangue do tipo ${bloodType ?? "—"}. A sua doação pode salvar vidas.`,
        };
    }
  };

  const sendNotification = async (
    params: SendNotificationParams & { bloodType?: string; donorCount?: number }
  ) => {
    try {
      setIsSending(true);
      setSendError(null);

      const { title, message } = buildContent(
        params.type,
        params.bloodType,
        params.donorCount
      );

      const { error } = await supabase.from("notifications").insert([
        {
          user_id: params.userId,
          title,
          message,
          type: params.type,
          related_id: params.relatedId ?? null,
          is_read: false,
        },
      ]);

      if (error) throw error;

      return { success: true };
    } catch (err: any) {
      setSendError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendNotification,
    isSending,
    sendError,
  };
}
