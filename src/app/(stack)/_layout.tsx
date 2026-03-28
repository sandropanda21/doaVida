import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Notification } from "../../components/notification/notificationType";
import { notifications as initialNotifications } from "../../components/notification/mockNotifications";

// Contexto simples para partilhar o estado entre o layout e o screen.
// Se já usas Zustand / Context global, move o estado para lá em vez disso.
import { createContext, useContext } from "react";

type NotificationsContextType = {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
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
        useState<Notification[]>(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleMarkAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            <Stack>
                <Stack.Screen
                    name="(stack)/notifications"
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
