import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD:app/(tabs)/_layout.tsx
import { useAuth } from "../../src/context/AuthContext";

export default function TabLayout() {
  const { profile } = useAuth();

=======

export default function TabsLayout() {
>>>>>>> 0262965ba9ddecfd3f437962d55b03de512a3f35:src/app/(tabs)/_layout.tsx
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
<<<<<<< HEAD:app/(tabs)/_layout.tsx
        tabBarActiveTintColor: "#E53734",
        tabBarInactiveTintColor: "#876464",
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
=======
>>>>>>> 0262965ba9ddecfd3f437962d55b03de512a3f35:src/app/(tabs)/_layout.tsx
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
<<<<<<< HEAD:app/(tabs)/_layout.tsx
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
=======
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Explorar"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Pedidos"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
>>>>>>> 0262965ba9ddecfd3f437962d55b03de512a3f35:src/app/(tabs)/_layout.tsx
          ),
        }}
      />

<<<<<<< HEAD:app/(tabs)/_layout.tsx
        <Tabs.Screen
          name="my-requests"
          options={{
            title: "Meus Pedidos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
        
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
=======
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
>>>>>>> 0262965ba9ddecfd3f437962d55b03de512a3f35:src/app/(tabs)/_layout.tsx
          ),
        }}
      />
    </Tabs>
  );
}