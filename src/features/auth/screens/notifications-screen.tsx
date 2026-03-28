import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNotifications } from "../../../app/(stack)/_layout";
import NotificationList from "../../../components/notification/notificationList";
import { Notification } from "../../../components/notification/notificationType";

type FilterType = "all" | "unread";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tab: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#E53734",
  },
  tabText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#E53734",
    fontWeight: "700",
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E53734",
  },
});

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, setNotifications } = useNotifications();
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "all" ? notifications : notifications.filter((n) => !n.read);

  const handleNotificationPress = (item: Notification) => {
    // Marca como lida
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    // Navega para o detalhe do pedido
    router.push(`/details/${item.requestId}`);
  };

  return (
    <View style={styles.container}>
      {/* FILTROS */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, filter === "all" && styles.tabActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.tabText, filter === "all" && styles.tabTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, filter === "unread" && styles.tabActive]}
          onPress={() => setFilter("unread")}
        >
          <Text
            style={[styles.tabText, filter === "unread" && styles.tabTextActive]}
          >
            Não lidas
          </Text>
          {unreadCount > 0 && <View style={styles.unreadBadge} />}
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <NotificationList data={filtered} onPress={handleNotificationPress} />
    </View>
  );
}
