import React from "react"
import { Text, TextInput, TouchableOpacity, ScrollView, View, StatusBar } from "react-native"
import {Image} from "expo-image"
import styles from "./styles"

const MapImage = require("../src/assets/images/map.png")

export default function Index() {
    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"black"}/>
                <View style={{marginBottom: 16}}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.hospitalName}>
                            Hospital Central de Luanda
                        </Text>
                        <View style={styles.bloodGroupContainer}>
                            <Text style={styles.bloodGroupLabel}>Tipo</Text>
                            <Text style={styles.bloodGroupValue}>O+</Text>
                        </View>
                    </View>
                    <Text style={styles.caseLocation}>
                        Luanda, Angola
                    </Text>
                </View>
                <View>
                    <Image source={MapImage} style={{ width: "100%", height: 200, borderRadius: 12 }} />
                    <Text style={styles.localInfoTitle}>
                        Informações do Local
                    </Text>
                    <View style={styles.localInfoContainer}>
                        <View>
                            <Text style={styles.localInfoSubtitle}>
                                Endereço
                            </Text>
                            <Text style={styles.caseLocation}>
                                Rua Amílcar Cabral, Luanda - Angola (Banco de Sangue, 2º andar)
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.localInfoSubtitle}>
                                Horário para Doação
                            </Text>
                            <Text style={styles.caseLocation}>
                                Segunda a Sábado: 07:30 - 16:00
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.localInfoTitle}>
                        Requisitos para Doação
                    </Text>
                    <View style={[styles.localInfoContainer, {justifyContent: "center", }]}>
                        <Text style={styles.localInfoSubtitle}>
                            Não estar em jejum absoluto
                        </Text>
                        <Text style={styles.localInfoSubtitle}>
                            Pesar mais de 50KG
                        </Text>
                        <Text style={styles.localInfoSubtitle}>
                            Trazer documento de identificação com foto
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.confirmAvailabilityButton}>
                    <Text style={styles.confirmAvailabilityButtonText}>
                        Confirmar Disponibilidade
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callNowButton}>
                    <Text style={styles.callNowButtonText}>
                        Ligar Agora
                    </Text>
                </TouchableOpacity>
            </ScrollView>    
        </>
    )
}