import { FlatList } from "react-native";
import NotificationItem from "./notificationItem";
import { NotificationDB } from "./notificationType";

type Props = {
  data: NotificationDB[];
  onPress: (item: NotificationDB) => void;
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
