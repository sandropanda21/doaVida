import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { NotificationDB } from "../../components/notification/notificationType";
import { notifications as initialNotifications } from "../../components/notification/mockNotifications";

import { createContext, useContext } from "react";

type NotificationsContextType = {
    notifications: NotificationDB[];
    setNotifications: React.Dispatch<React.SetStateAction<NotificationDB[]>>;
};

export const NotificationsContext = createContext<NotificationsContextType>({
    notifications: initialNotifications,
    setNotifications: () => { },
});

export function useNotifications() {
    return useContext(NotificationsContext);
}

export default function StackLayout() {
    const [notifications, setNotifications] =
        useState<NotificationDB[]>(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    const handleMarkAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            <Stack>
                <Stack.Screen
                    name="notifications"
                    options={{
                        title: "Notificações",
                        headerRight: () =>
                            unreadCount > 0 ? (
                                <TouchableOpacity onPress={handleMarkAllRead} style={{ marginRight: 16 }}>
                                    <Text style={{ color: "#E53734", fontWeight: "500", fontSize: 14 }}>
                                        Ler tudo
                                    </Text>
                                </TouchableOpacity>
                            ) : null,
                    }}
                />
            </Stack>
        </NotificationsContext.Provider>
    );
}
