import { Stack, usePathname, useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { AuthProvider, useAuth } from "../context/AuthContext"


function AuthNavigator() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading) {
            const isAuthGroup = pathname.includes('(auth)') || pathname === '/login' || pathname === '/register'

            if (user) {
                if (isAuthGroup || pathname === '/') {
                    router.replace('/(tabs)/home')
                }
            } else {
                if (!isAuthGroup && pathname !== '/') {
                    router.replace('/(auth)/login')
                }
            }
        }
    }, [user, loading, pathname])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                <ActivityIndicator size="large" color="#E53734" />
            </View>
        )
    }

    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />
            <Stack.Screen name="(tabs)/home" />
            <Stack.Screen name="(tabs)/requests" />
            <Stack.Screen name="(tabs)/new-request" />
            <Stack.Screen name="(tabs)/profile" />
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <>
            <AuthProvider>
                <AuthNavigator />
            </AuthProvider>
        </>
    )
}
