import { Stack, usePathname, useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { AuthProvider, useAuth } from "../src/context/AuthContext"

function AuthNavigator() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading) {
            const isAuthGroup = pathname.includes('(auth)') || pathname === '/signIn' || pathname === '/signUp'

            if (user) {
                if (isAuthGroup || pathname === '/') {
                    router.replace('/(tabs)/home')
                }
            } else {
                if (!isAuthGroup && pathname !== '/') {
                    router.replace('/signIn')
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
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signIn" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="new-request" options={{ headerShown: false }} />
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <AuthNavigator />
        </AuthProvider>
    )
}
