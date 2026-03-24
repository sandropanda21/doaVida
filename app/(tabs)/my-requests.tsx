import { useRouter } from "expo-router"
import React, { useState } from "react"
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "../../src/context/AuthContext"
import { useBloodRequests } from "../../src/hooks/useBloodRequests"
import { BloodRequest } from "../../src/lib/supabase"

export default function MyRequests() {
    const { user } = useAuth()
    const { requests, loading, fetchRequests, updateRequest } = useBloodRequests(user?.id)
    const [refreshing, setRefreshing] = useState(false)
    const router = useRouter()

    async function onRefresh() {
        setRefreshing(true)
        await fetchRequests()
        setRefreshing(false)
    }

    async function cancelRequest(id: string) {
        Alert.alert(
            'Cancelar Pedido',
            'Tem certeza que deseja cancelar este pedido?',
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await updateRequest(id, { status: 'cancelled' })
                        } catch (error: any) {
                            Alert.alert("Erro", "Não foi possível cancelar o pedido: " + error.message)
                        }
                    }
                }
            ]
        )
    }

    function getStatusColor(status: string) {
        switch (status) {
            case 'pending': return '#F59E0B'
            case 'fulfilled': return '#10B981'
            case 'cancelled': return '#EF4444'
            default: return '#876464'
        }
    }

    function getStatusLabel(status: string) {
        switch (status) {
            case 'pending': return 'Pendente'
            case 'fulfilled': return 'Atendido'
            case 'cancelled': return 'Cancelado'
            default: return status
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
                <ActivityIndicator size="large" color="#E53734" />
            </View>
        )
    }

    return (
        <>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#f1f1f1', paddingTop: 24, paddingInline: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E53734']} />
                }
            >
                <StatusBar backgroundColor={"#E53734"} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#171111' }}>
                        Meus Pedidos
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/new-request')}>
                        <View style={{ backgroundColor: '#E53734', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Novo</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {requests.length === 0 ? (
                    <View style={{ alignItems: 'center', padding: 40 }}>
                        <Text style={{ color: '#876464', fontSize: 16 }}>Você ainda não tem pedidos</Text>
                        <TouchableOpacity
                            style={{ backgroundColor: '#E53734', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginTop: 16 }}
                            onPress={() => router.push('/new-request')}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Criar Primeiro Pedido</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ gap: 16, marginBottom: 50 }}>
                        {requests.map((request: BloodRequest) => (
                            <View key={request.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#E53734' }}>
                                            {request.blood_type}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: '#171111' }}>
                                            {request.patient_name}
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: getStatusColor(request.status), paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                                            {getStatusLabel(request.status)}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={{ fontSize: 14, color: '#876464', marginBottom: 4 }}>
                                    {request.hospital} - {request.province}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#876464', marginBottom: 4 }}>
                                    {request.bags_quantity} bolsa(s)
                                </Text>
                                <Text style={{ fontSize: 14, color: '#876464' }}>
                                    Contacto: {request.contact_phone}
                                </Text>

                                {request.status === 'pending' && (
                                    <TouchableOpacity
                                        style={{ backgroundColor: '#EF4444', padding: 12, borderRadius: 8, marginTop: 12 }}
                                        onPress={() => cancelRequest(request.id)}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                                            Cancelar Pedido
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </>
    )
}
