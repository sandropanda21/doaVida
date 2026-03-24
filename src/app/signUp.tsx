import { Checkbox } from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import Dropdown from 'react-native-input-select'
import { useAuth } from "../src/context/AuthContext"
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
        flexDirection: "column" as const,
        marginTop: 24,
        marginBottom: 8
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold" as const,
        color: "#E53734"
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: "normal" as const,
        color: "#6B7280",
        marginBottom: 12
    },
    inputContainer: {
        flexWrap: "wrap" as const,
        flexDirection: "row" as const,
        columnGap: 8,
        rowGap: 16,
    },
    input: {
        gap: 8
    },
    inputField: {
        height: 65,
        width: 160,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: "#f1f1f1"
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500" as const,
        color: "#171111"
    },
    contactsSecurityContainer: {
        flexDirection: "column" as const,
        marginTop: 24,
        marginBottom: 8,
    },
    contactsSecurityHeader: {
        fontSize: 20,
        fontWeight: "bold" as const,
        color: "#E53734",
        marginBottom: 20
    },
    contactsSecurityInputField: {
        height: 56,
        width: 325,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
    contactsSecurityInput: {
        flexDirection: "row" as const,
        gap: 8,
    },
    regularText: {
        fontSize: 16,
        fontWeight: "normal" as const,
        fontFamily: "Inter" as const,
        color: "#171111"
    },
    uploadContainer: {
        gap: 12,
        marginBottom: 40
    },
    uploadPhotoCard: {
        justifyContent: "center" as const,
        alignItems: "center" as const,
        width: 320,
        height: 180,
        backgroundColor: "#f58987",
        borderColor: "#E53734",
        borderStyle: "dashed" as const,
        borderRadius: 12,
        borderWidth: 2
    },
    servicesTermsContainer: {
        flexDirection: "row" as const,
        gap: 8,
    },
    servicesTermsCheckbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 4,
        marginTop: 3,
        padding: 5
    },
    servicesTermsText: {
        fontSize: 14,
        fontWeight: "normal" as const,
        color: "#171111",
        maxWidth: 280,
        textAlign: "justify" as const
    },
    createAccountButton: {
        backgroundColor: "#E53734",
        borderRadius: 12,
        width: 320,
        height: 56,
        marginTop: 24,
        marginBottom: 24
    },
    createAccountButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        lineHeight: 56
    }
}

export default function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState<string | undefined>()
    const [bloodType, setBloodType] = useState<string | undefined>()
    const [province, setProvince] = useState<string | undefined>()
    const [municipality, setMunicipality] = useState<string | undefined>()
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isChecked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatarUri, setAvatarUri] = useState<string | null>(null)

    const { signUp } = useAuth()
    const router = useRouter()

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })

        if (!result.canceled && result.assets[0].uri) {
            setAvatarUri(result.assets[0].uri)
        }
    }

    const getErrorMessage = (message: string) => {
        if (message.includes("User already registered")) return "Já existe uma conta com este e-mail."
        if (message.includes("rate limit exceeded")) return "Muitas tentativas. Por favor, aguarde alguns minutos."
        if (message.includes("Email not confirmed")) return "Por favor, confirme o seu e-mail antes de entrar."
        if (message.includes("Invalid login credentials")) return "E-mail ou palavra-passe incorretos."
        return message
    }

    const handleSignUp = async () => {
        if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios")
            return
        }

        if (password.length < 6) {
            Alert.alert("Erro", "A palavra-passe deve ter pelo menos 6 caracteres")
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As palavras-passe não coincidem")
            return
        }

        if (!isChecked) {
            Alert.alert("Erro", "Precisa aceitar os Termos de Serviço")
            return
        }

        setLoading(true)
        try {
            let avatarUrl = null
            if (avatarUri) {
                const response = await fetch(avatarUri)
                const blob = await response.blob()
                const fileExt = avatarUri.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `avatars/${fileName}`
                avatarUrl = await uploadFile('avatars', filePath, blob)
            }

            const { error } = await signUp(email, password, {
                full_name: `${firstName} ${lastName}`,
                phone,
                blood_type: bloodType || null,
                province,
                municipality,
                gender: gender || null,
                avatar_url: avatarUrl
            })

            if (error) {
                Alert.alert("Erro ao criar conta", getErrorMessage(error.message))
            } else {
                Alert.alert("Sucesso", "Conta criada com sucesso!")
                router.replace("/(tabs)/home")
            }
        } catch (error: any) {
            Alert.alert("Erro", "Ocorreu um erro inesperado: " + getErrorMessage(error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"#E53734"} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Criar Conta</Text>
                    <Text style={styles.headerSubtitle}>Preencha suas informações</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Primeiro Nome *</Text>
                        <TextInput
                            keyboardType="default"
                            placeholder="Ex.: João"
                            style={styles.inputField}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Apelido *</Text>
                        <TextInput
                            keyboardType="default"
                            placeholder="Ex.: Santos"
                            style={styles.inputField}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View >
                    <View style={styles.input}>
                        <Dropdown
                            dropdownStyle={styles.inputField}
                            dropdownIconStyle={{ top: 55, left: 130 }}
                            label="Género"
                            labelStyle={styles.headerSubtitle}
                            placeholder="Género"
                            options={[
                                { label: 'Masculino', value: 'M' },
                                { label: 'Femenino', value: 'F' },
                            ]}
                            selectedValue={gender}
                            onValueChange={(value) => setGender(value as string | undefined)}
                            primaryColor={'green'}
                        />
                    </View>
                </View>

                <View style={styles.contactsSecurityContainer}>
                    <Text style={styles.contactsSecurityHeader}>Contacto e Segurança</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Telefone *</Text>
                            <TextInput
                                keyboardType="phone-pad"
                                placeholder="9XX XXX XXX"
                                style={styles.contactsSecurityInputField}
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email *</Text>
                            <TextInput
                                keyboardType="email-address"
                                placeholder="email@gmail.com"
                                style={styles.contactsSecurityInputField}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.contactsSecurityInput}>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Palavra-Passe *</Text>
                                <TextInput
                                    placeholder="**************"
                                    secureTextEntry={true}
                                    style={styles.inputField}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Confirmar *</Text>
                                <TextInput
                                    placeholder="**************"
                                    secureTextEntry={true}
                                    style={styles.inputField}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View >
                        </View>
                    </View>
                </View>

                <View style={styles.contactsSecurityContainer}>
                    <Text style={styles.contactsSecurityHeader}>Saúde e Localização</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Dropdown
                                dropdownStyle={styles.contactsSecurityInputField}
                                dropdownIconStyle={{ top: 55, left: 295 }}
                                label="Grupo Sanguíneo"
                                labelStyle={styles.headerSubtitle}
                                placeholder="Tipo Sanguíneo"
                                options={BLOOD_TYPES}
                                selectedValue={bloodType}
                                onValueChange={(value) => setBloodType(value as string | undefined)}
                                primaryColor={'green'}
                            />
                        </View>
                        <View style={styles.input}>
                            <Dropdown
                                dropdownStyle={styles.contactsSecurityInputField}
                                dropdownIconStyle={{ top: 55, left: 295 }}
                                label="Província"
                                labelStyle={styles.headerSubtitle}
                                placeholder="Selecione"
                                options={PROVINCES}
                                selectedValue={province}
                                onValueChange={(value) => setProvince(value as string | undefined)}
                                primaryColor={'green'}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.uploadContainer}>
                    <View>
                        <View style={styles.servicesTermsContainer}>
                            <Checkbox
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? '#E53734' : undefined}
                                style={styles.servicesTermsCheckbox}
                            />
                            <Text style={styles.servicesTermsText}>
                                Ao clicar em "Criar Conta", você concorda com os nossos Termos de Serviço e Política de Privacidade.
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.createAccountButton, !isChecked && { opacity: 0.5 }]}
                                disabled={!isChecked || loading}
                                onPress={handleSignUp}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.createAccountButtonText}>Criar Conta</Text>
                                )}
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text style={[styles.regularText, { textAlign: "center" as const, marginBottom: 40 }]}>
                                        Já tem uma conta? <Text style={{ color: '#E53734' }}>Iniciar Sessão</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
