import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useBloodRequests } from "../../hooks/useBloodRequests";
import { BloodRequest } from "../../lib/supabase";
import styles from "./styles";

const HomeScreen = () => {
    const { requests, loading, fetchRequests } = useBloodRequests()
    const [refreshing, setRefreshing] = useState(false)
    const { profile } = useAuth()
    const router = useRouter()

    async function onRefresh() {
        setRefreshing(true)
        await fetchRequests()
        setRefreshing(false)
    }

    return (
        <View style={styles.safeArea}>
            <StatusBar backgroundColor={"#E53734"}/>
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK2ffAR31Ka8F_aG9dlfO6-xL7_O2pduW6efiQcPVqqY3WlSLOyGVAcTHGgsihT-AOXLcPyK3grAygz00qBlwSFCHF-K3WMJTXHG2XjmdHc6nLlpsV3RuQnSZYQiPm01725Q5ov7Hsc5BdbRVTWog4wQvutYW7yQZccjJ40Re2elNwXGsy5O0zK_6PUKoCQxbQvBJvfgBw0ShGcPXfD3dqlQJMmROerPBPhpCBJjodmG5lxNbRuxh4y_fUsl72_jEfuS73vrSl2JC_",
                        }}
                        style={styles.logo}
                    />
                    <Text style={styles.headerTitle}>DoaVida</Text>
                    <TouchableOpacity
                        style={styles.profileBtn}
                        onPress={() => router.push('/profile')}
                    >
                        <MaterialIcons name="account-circle" size={28} color="#171111" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 120 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#e53734']} />
                    }
                >
                    {loading && !refreshing ? (
                        <ActivityIndicator size="large" color="#e53734" style={{ marginTop: 40 }} />
                    ) : (
                        <>
                            {/* Section Title */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Pedidos Urgentes</Text>
                                <Text style={styles.liveBadge}>Ao Vivo</Text>
                            </View>

                            {/* Cards */}
                            {requests.length === 0 ? (
                                <View style={{ alignItems: 'center', padding: 40 }}>
                                    <Text style={{ color: '#876464', fontSize: 16 }}>Nenhum pedido urgente no momento</Text>
                                </View>
                            ) : (
                                requests.filter(r => r.status === 'pending').map((item: BloodRequest) => {
                                    const percent = 10; // Mocked for visual

                                    return (
                                        <View key={item.id} style={styles.card}>

                                            <ImageBackground
                                                source={{ uri: item.urgency === 'high' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBb6d9K9eGCfhs1XgSQ4Xq31O46AgoTH64RByTGsjoyICwBcRWoMUvIxApUJn3BvW-4eEBMqQmKtQIUIwMKys6m2v5GQvEZzZsNCf30hXVxQB8AbRyRaWDcCg78vGZTaeO8luW63lDc98TCTHJvbwRla3vvnaoxTnA34A0zkikSHCsNeCSUoq6-nTG-ncvjD3YedecKHPGRLQqLZmuK0iLyfNspHU31LWXiqnj0dBzcwHXe6TP2CJY3hmnblal1xkGQDVl5QjPovGw5" : "https://lh3.googleusercontent.com/aida-public/AB6AXuDrd1xeEXHcs8gllOlM8plwh8-zHN6lyZrZXe7VNg80qQZYYdW-dRdZpqCvjTeRN6605wGhqRFlmI7_sweUBaIpilMt8PGuDJBXNaHzJtfxT9C2emx5Wem1ViW6ydtBTyRaNxxdh0JDEwgy68NexP6IUnrbRgHAEcsCunlAVz3-dn_Bd3RroLjmrwcAm0Iz37gxjmqYSwpGulR3cKtJvPMQm-68midOz6bGYc7mRdKkXqqE7HoOLrppMhY3uCNeyXw4GOtJyOcCvAwb" }}
                                                style={styles.cardImage}
                                            >
                                                <View style={styles.overlay}>
                                                    {item.urgency === 'high' && (
                                                        <Text style={styles.urgentBadge}>
                                                            Altamente Urgente
                                                        </Text>
                                                    )}
                                                    <Text style={styles.bloodText}>{item.blood_type}</Text>
                                                </View>
                                            </ImageBackground>

                                            <View style={styles.cardContent}>
                                                <Text style={styles.name}>{item.patient_name}</Text>

                                                <View style={styles.infoRow}>
                                                    <MaterialIcons name="local-hospital" size={16} color="#876464" />
                                                    <Text style={styles.infoText}>{item.hospital}</Text>
                                                </View>

                                                <View style={styles.infoRow}>
                                                    <MaterialIcons name="location-on" size={16} color="#876464" />
                                                    <Text style={styles.infoText}>{item.municipality ? `${item.municipality}, ` : ''}{item.province}</Text>
                                                </View>

                                                {/* Progress */}
                                                <View style={styles.progressBox}>
                                                    <View style={styles.progressHeader}>
                                                        <Text style={styles.progressLabel}>
                                                            Progresso da Doação
                                                        </Text>
                                                        <Text style={styles.progressCount}>
                                                            0 de {item.bags_quantity} bolsas
                                                        </Text>
                                                    </View>

                                                    <View style={styles.progressBar}>
                                                        <View
                                                            style={[
                                                                styles.progressFill,
                                                                { width: `${percent}%` },
                                                            ]}
                                                        />
                                                    </View>
                                                </View>

                                                <TouchableOpacity style={styles.donateButton}>
                                                    <MaterialIcons name="favorite" size={18} color="#fff" />
                                                    <Text style={styles.donateText}>Quero Doar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                })
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;