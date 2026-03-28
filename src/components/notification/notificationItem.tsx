import { Asterisk, CircleCheck } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Notification } from "./notificationType";

type Props = {
  item: Notification;
  onPress: (item: Notification) => void;
};

// Formata a data para "há X min / horas / dias"
function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora mesmo";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days} dia${days > 1 ? "s" : ""}`;
}

// Gera a mensagem dinamicamente com base no tipo e nos dados do pedido
function buildMessage(item: Notification): string {
  switch (item.type) {
    case "BLOOD_REQUEST":
      return `Precisa-se de sangue do tipo ${item.bloodType ?? "—"}. A sua doação pode salvar vidas.`;
    case "DONOR_FOUND":
      return `Doador encontrado. O seu pedido foi aceite por ${item.donorCount ?? 0} doador${(item.donorCount ?? 0) !== 1 ? "es" : ""}.`;
    default:
      return "";
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  unreadContainer: {
    backgroundColor: "#FFF5F5",
  },
  leftContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 4,
  },
  iconWrapper: {
    marginTop: 2,
  },
  textBlock: {
    flex: 1,
  },
  type: {
    fontWeight: "700",
    fontSize: 14,
    color: "#1A1A1A",
  },
  time: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 1,
  },
  message: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
    marginTop: 4,
    paddingLeft: 34, // alinha com o texto do header (ícone 20 + gap 10 + margin)
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E53734",
    marginTop: 6,
    flexShrink: 0,
  },
});

export default function NotificationItem({ item, onPress }: Props) {
  const isUnread = !item.read;

  const renderIcon = () => {
    switch (item.type) {
      case "BLOOD_REQUEST":
        return <Asterisk color="#E53734" size={20} />;
      case "DONOR_FOUND":
        return <CircleCheck color="#16A34A" size={20} />;
      default:
        return null;
    }
  };

  const typeLabel =
    item.type === "BLOOD_REQUEST" ? "Pedido de Sangue" : "Doador Encontrado";

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.unreadContainer]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.iconWrapper}>{renderIcon()}</View>
          <View style={styles.textBlock}>
            <Text style={styles.type}>{typeLabel}</Text>
            <Text style={styles.time}>{formatRelativeTime(item.createdAt)}</Text>
          </View>
        </View>

        {/* MENSAGEM DINÂMICA */}
        <Text style={styles.message}>{buildMessage(item)}</Text>
      </View>

      {/* DOT de não lida */}
      {isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}
