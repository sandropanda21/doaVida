import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationList from "../../../components/notification/notificationList";
import { NotificationDB } from "../../../components/notification/notificationType";
import { useMarkNotification } from "../../../hooks/notification/useMarkNotification";
import { useNotifications } from "../../../hooks/notification/useNotifications";

// Substitui pelo teu hook de sessão
import { useAuth } from "../../../context/AuthContext";

type FilterType = "all" | "unread";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    color: "#E53734",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 32,
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
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>("all");

  const { notifications, unreadCount, isLoading, fetchError } =
    useNotifications(user?.id ?? "");

  const { markAsRead } = useMarkNotification();

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => !n.is_read);

  const handlePress = async (item: NotificationDB) => {
    if (!item.is_read) {
      await markAsRead(item.id);
    }
    if (item.related_id) {
      router.push(`/details/${item.related_id}`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#E53734" />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Não foi possível carregar as notificações.{"\n"}{fetchError}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      <NotificationList data={filtered} onPress={handlePress} />
    </View>
  );
}
