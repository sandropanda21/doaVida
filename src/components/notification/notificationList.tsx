import { FlatList } from "react-native";
import NotificationItem from "./notificationItem";
import { Notification } from "./notificationType";

type Props = {
  data: Notification[];
  onPress: (item: Notification) => void;
};

export default function NotificationList({ data, onPress }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationItem item={item} onPress={onPress} />
      )}
    />
  );
}
