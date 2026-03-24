import { useRouter } from "expo-router"
import React, { useState } from "react"
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAuth } from "../src/context/AuthContext"

const styles = {
    container: {
        flex: 1,
        flexDirection: "column" as const,
        backgroundColor: "#f1f1f1",
        paddingTop: 24,
        paddingInline: 16,
        paddingBottom: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        color: "#E53734",
        marginTop: 16,
        marginBottom: 8
    },
    banner: {
        justifyContent: "center" as const,
        alignItems: "center" as const,
        width: 330,
        height: 180,
        padding: 30,
        paddingInline: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#d36d6b",
        backgroundColor: "#f58987",
        marginTop: 24,
        marginBottom: 24
    },
    bannerText: {
        fontSize: 16,
        fontWeight: "600" as const,
        color: "#E53734",
        textAlign: "center" as const
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
    inputLabel: {
        fontSize: 14,
        fontWeight: "500" as const,
        color: "#171111"
    },
    passwordInput: {
        height: 56,
        width: 325,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: "#f1f1f1"
    },
    emailInput: {
        height: 56,
        width: 325,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
    regularText: {
        fontSize: 16,
        fontWeight: "normal" as const,
        fontFamily: "Inter" as const,
        color: "#171111"
    },
    smText: {
        fontSize: 14,
        fontWeight: "500" as const,
        color: "#E53734",
    },
    logInButton: {
        backgroundColor: "#E53734",
        borderRadius: 12,
        width: 320,
        height: 56,
        marginTop: 24,
        marginBottom: 24
    },
    logInButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        lineHeight: 56
    },
    orContainer: {
        justifyContent: "center" as const,
        alignItems: "center" as const,
        flexDirection: "row" as const,
        gap: 6
    },
    orLine: {
        width: 145,
        height: 1,
        backgroundColor: "#876464"
    },
    orText: {
        fontSize: 12,
        fontWeight: "600" as const,
        color: "#876464"
    },
    signUpButton: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E53734",
        width: 320,
        height: 56,
        marginTop: 24,
        marginBottom: 24
    },
    signUpButtonText: {
        color: "#E53734",
        fontSize: 16,
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        lineHeight: 56
    }
}

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const router = useRouter()

    const getErrorMessage = (message: string) => {
        if (message.includes("Invalid login credentials")) return "E-mail ou palavra-passe incorretos."
        if (message.includes("Email not confirmed")) return "Por favor, confirme o seu e-mail antes de entrar."
        if (message.includes("rate limit exceeded")) return "Muitas tentativas. Por favor, aguarde alguns minutos."
        return message
    }

    async function handleSignIn() {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos")
            return
        }

        setLoading(true)
        const { error } = await signIn(email, password)
        setLoading(false)

        if (error) {
            Alert.alert("Erro ao entrar", getErrorMessage(error.message))
        } else {
            router.replace("/(tabs)/home")
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"#E53734"} />
                <Text style={styles.headerTitle}>DoaVida</Text>
                <View>
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>
                            Conectando doadores e recetores em Angola
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                keyboardType="email-address"
                                placeholder="email@gmail.com"
                                style={styles.emailInput}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Palavra-Passe</Text>
                            <TextInput
                                placeholder="**************"
                                secureTextEntry={true}
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <Text style={styles.smText}>
                            Esqueci a palavra-passe?
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.logInButton}
                            onPress={handleSignIn}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.logInButtonText}>Entrar</Text>
                            )}
                        </TouchableOpacity>
                        <View style={styles.orContainer}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>ou</Text>
                            <View style={styles.orLine} />
                        </View>
                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={() => router.push("/signUp")}
                        >
                            <Text style={styles.signUpButtonText}>Criar Conta</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={[styles.orText, { textAlign: "center" as const, width: 300, marginBottom: 60 }]}>
                                Ao entrar, aceita os nossos Termos de Serviço e Política de Privacidade.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
