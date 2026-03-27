import { Tabs } from "expo-router";
import { CirclePlus, Home, UserRound } from "lucide-react-native";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#E53734"
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "Doa Vida",
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="createOrder"
        options={{
          title: "Criar Pedido",
          tabBarIcon: ({ color, size }) => (
            <CirclePlus color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="caseDetails"
        options={{
          title: "Detalhes do Pedido",
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}