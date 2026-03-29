import { Asterisk, CircleCheck } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationDB, NotificationDBType } from "./notificationType";

type Props = {
  item: NotificationDB;
  onPress: (item: NotificationDB) => void;
};

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

const TYPE_LABEL: Record<NotificationDBType, string> = {
  compatible_request: "Pedido de Sangue",
  new_volunteer: "Doador Encontrado",
};

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
  typeLabel: {
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
    paddingLeft: 34,
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
  const isUnread = !item.is_read;

  const renderIcon = () => {
    switch (item.type) {
      case "compatible_request":
        return <Asterisk color="#E53734" size={20} />;
      case "new_volunteer":
        return <CircleCheck color="#16A34A" size={20} />;
      default:
        return null;
    }
  };

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
            <Text style={styles.typeLabel}>{TYPE_LABEL[item.type]}</Text>
            <Text style={styles.time}>{formatRelativeTime(item.created_at)}</Text>
          </View>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>

      {isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}
