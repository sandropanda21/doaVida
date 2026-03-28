import { Tabs } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';
import { CirclePlus, Home, UserRound, ClipboardList } from 'lucide-react-native';
import HeaderButton from '../../components/headerButton/headerButton';
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#E53734',
        headerRight: () => (
          <HeaderButton
            onPress={() => (
              navigate('notifications')
            )}
          />
        ),
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerTitle: 'Doa Vida',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='myRequests'
        options={{
          title: 'Meus Pedidos',
          headerTitle: 'Meus Pedidos',
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name='createOrder'
        options={{
          title: 'Criar Pedido',
          tabBarIcon: ({ color, size }) => (
            <CirclePlus color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
    </Tabs >
  );
}
