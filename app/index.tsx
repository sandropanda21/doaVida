import { useRouter } from "expo-router"
import React from "react"
import { StatusBar, Text, TouchableOpacity, View } from "react-native"

export default function Landing() {
    const router = useRouter()

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <StatusBar backgroundColor={"#E53734"} />

            <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#E53734', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ color: '#fff', fontSize: 48, fontWeight: 'bold' }}>DV</Text>
            </View>

            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#E53734', marginBottom: 8 }}>
                DoaVida
            </Text>

            <Text style={{ fontSize: 16, color: '#876464', textAlign: 'center', marginBottom: 48, paddingHorizontal: 20 }}>
                Conectando doadores e quem mais precisa em Angola. Sua doação pode salvar uma vida hoje.
            </Text>

            <TouchableOpacity
                style={{ backgroundColor: '#E53734', borderRadius: 12, width: '100%', height: 56, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => router.push('/signIn')}
            >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Começar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 24 }}
                onPress={() => router.push('/signUp')}
            >
                <Text style={{ color: '#E53734', fontSize: 16, fontWeight: '600' }}>Criar conta agora</Text>
            </TouchableOpacity>
        </View>
    )
}
