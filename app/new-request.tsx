import * as ImagePicker from 'expo-image-picker'
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import Dropdown from 'react-native-input-select'
import { useAuth } from "../src/context/AuthContext"
import { useBloodRequests } from "../src/hooks/useBloodRequests"
import { BLOOD_TYPES, PROVINCES, uploadFile } from "../src/lib/supabase"

const styles = {
    container: {
        flex: 1,
        flexDirection: "column" as const,
        backgroundColor: "#f1f1f1",
        paddingTop: 24,
        paddingInline: 16,
        paddingBottom: 20
    },
    headerContainer: {
        marginTop: 24,
        marginBottom: 24
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold" as const,
        color: "#171111"
    },
    headerDescription: {
        fontSize: 16,
        fontWeight: "normal" as const,
        color: "#6b6b6b",
        textAlign: "justify" as const,
    },
    inputContainer: {
        gap: 12
    },
    input: {
        gap: 8
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500" as const,
        color: "#171111"
    },
    inputField: {
        height: 56,
        width: 320,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: "#f1f1f1"
    },
    sendRequestButton: {
        backgroundColor: "#E53734",
        borderRadius: 12,
        width: 320,
        height: 56,
        marginTop: 24,
        marginBottom: 60
    },
    sendRequestButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        lineHeight: 56
    },
}

export default function NewRequest() {
    const [patientName, setPatientName] = useState("")
    const [bloodType, setBloodType] = useState<string | undefined>()
    const [bagsQuantity, setBagsQuantity] = useState("")
    const [province, setProvince] = useState<string | undefined>()
    const [municipality, setMunicipality] = useState("")
    const [hospital, setHospital] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [description, setDescription] = useState("")
    const [urgency, setUrgency] = useState<'high' | 'medium' | 'low'>('medium')
    const [loading, setLoading] = useState(false)
    const [documentUri, setDocumentUri] = useState<string | null>(null)

    const { createRequest } = useBloodRequests()
    const { user } = useAuth()
    const router = useRouter()

    async function handlePickDocument() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.7,
        })

        if (!result.canceled && result.assets[0].uri) {
            setDocumentUri(result.assets[0].uri)
        }
    }

    async function handleSubmit() {
        if (!patientName || !bloodType || !bagsQuantity || !province || !hospital || !contactPhone) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios")
            return
        }

        if (!user) {
            Alert.alert("Erro", "Precisa estar autenticado para fazer um pedido")
            return
        }

        setLoading(true)

        try {
            let documentUrl = null
            if (documentUri) {
                const response = await fetch(documentUri)
                const blob = await response.blob()
                const fileExt = documentUri.split('.').pop()
                const fileName = `${user.id}-${Date.now()}.${fileExt}`
                const filePath = `documents/${fileName}`
                documentUrl = await uploadFile('documents', filePath, blob)
            }

            await createRequest({
                patient_name: patientName,
                blood_type: bloodType as string,
                bags_quantity: parseInt(bagsQuantity),
                province: province as string,
                municipality: municipality,
                hospital: hospital,
                contact_phone: contactPhone,
                description: description,
                urgency: urgency,
                document_url: documentUrl
            })
            Alert.alert("Sucesso", "Pedido criado com sucesso!")
            router.back()
        } catch (error: any) {
            let errorMessage = "Ocorreu um erro ao criar o pedido. Por favor, tente novamente."
            if (error.message?.includes("permission denied")) {
                errorMessage = "Erro de permissão. Certifique-se de que está autenticado corretamente."
            } else if (error.message?.includes("storage")) {
                errorMessage = "Erro ao carregar o documento. Verifique a sua ligação."
            }
            Alert.alert("Erro ao criar pedido", errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"#E53734"} />
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ color: '#E53734', marginBottom: 8 }}>← Voltar</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Novo Pedido de Sangue
                    </Text>
                    <Text style={styles.headerDescription}>
                        Preencha os detalhes para encontrar doadores compatíveis em Angola. A sua informação ajudará a salvar vidas.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>
                                Nome do Paciente *
                            </Text>
                            <TextInput
                                keyboardType="default"
                                placeholder="Ex.: Santos dos Anjos"
                                style={styles.inputField}
                                value={patientName}
                                onChangeText={setPatientName}
                            />
                        </View>

                        <View style={{ flexDirection: "row", gap: 16 }}>
                            <View style={styles.input}>
                                <Dropdown
                                    dropdownStyle={{ height: 56, width: 150, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, paddingVertical: 18, paddingHorizontal: 16, backgroundColor: "#f1f1f1" }}
                                    dropdownIconStyle={{ top: 60, left: 115 }}
                                    label="Grupo Sanguíneo"
                                    labelStyle={styles.inputLabel}
                                    placeholder="Selecione"
                                    options={BLOOD_TYPES}
                                    selectedValue={bloodType}
                                    onValueChange={(value) => setBloodType(value as string | undefined)}
                                    primaryColor={'green'}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>
                                    Qtd. de Bolsas *
                                </Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    placeholder="1"
                                    style={[styles.inputField, { width: 120, height: 56 }]}
                                    value={bagsQuantity}
                                    onChangeText={setBagsQuantity}
                                />
                            </View>
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Urgência</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                {(['high', 'medium', 'low'] as const).map((level) => (
                                    <TouchableOpacity
                                        key={level}
                                        onPress={() => setUrgency(level)}
                                        style={{
                                            flex: 1,
                                            padding: 12,
                                            borderRadius: 8,
                                            borderWidth: 1,
                                            borderColor: urgency === level ? '#E53734' : '#E5E7EB',
                                            backgroundColor: urgency === level ? '#f58987' : '#f1f1f1',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{
                                            color: urgency === level ? '#E53734' : '#171111',
                                            fontWeight: urgency === level ? 'bold' : 'normal'
                                        }}>
                                            {level === 'high' ? 'Alta' : level === 'medium' ? 'Média' : 'Baixa'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Dropdown
                                dropdownStyle={styles.inputField}
                                dropdownIconStyle={{ top: 60, left: 290 }}
                                label="Província"
                                labelStyle={styles.inputLabel}
                                placeholder="Selecione"
                                options={PROVINCES}
                                selectedValue={province}
                                onValueChange={(value) => setProvince(value as string | undefined)}
                                primaryColor={'green'}
                            />
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>
                                    Município
                                </Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Ex: Maianga"
                                    value={municipality}
                                    onChangeText={setMunicipality}
                                />
                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>
                                    Hospital ou Unidade Sanitária
                                </Text>
                                <TextInput
                                    keyboardType="default"
                                    placeholder="Ex.: Hospital Josina Machel"
                                    style={styles.inputField}
                                    value={hospital}
                                    onChangeText={setHospital}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>
                                    Contacto de Emergência *
                                </Text>
                                <TextInput
                                    keyboardType="phone-pad"
                                    placeholder="Ex.: 9XXXXXXXXX"
                                    style={styles.inputField}
                                    value={contactPhone}
                                    onChangeText={setContactPhone}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>
                                    Descrição da Situação
                                </Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    keyboardType="default"
                                    placeholder="Conte um pouco para sensibilizar doadores"
                                    style={styles.inputField}
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Comprovativo Médico (Opcional)</Text>
                                <TouchableOpacity
                                    onPress={handlePickDocument}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#E5E7EB',
                                        borderRadius: 8,
                                        padding: 16,
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        gap: 8
                                    }}
                                >
                                    {documentUri ? (
                                        <>
                                            <Image source={{ uri: documentUri }} style={{ width: 40, height: 40, borderRadius: 4 }} />
                                            <Text style={{ color: '#10B981', fontWeight: 'bold' }}>Documento Selecionado</Text>
                                        </>
                                    ) : (
                                        <Text style={{ color: '#6b6b6b' }}>Selecionar Imagem</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.sendRequestButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.sendRequestButtonText}>
                                Enviar Pedido
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}
