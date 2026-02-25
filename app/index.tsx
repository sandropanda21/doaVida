import React from "react"
import { Text, TextInput, TouchableOpacity, ScrollView, View, StatusBar } from "react-native"
import styles from "./styles"

export default function Index() {
    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"black"} />
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
                            <TextInput keyboardType="email-address" placeholder="email@gmail.com" style={styles.emailInput} />
                        </View>
                        <View style={styles.input}>
                                <Text style={styles.inputLabel}>Palavra-Passe</Text>
                                <TextInput placeholder="**************" secureTextEntry={true} style={styles.passwordInput} />
                        </View>
                        <Text style={styles.smText}>
                            Esqueci a palavra-passe?
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.logInButton}>
                            <Text style={styles.logInButtonText}>Entrar</Text>
                        </TouchableOpacity>
                        <View style={styles.orContainer}>
                            <View style={styles.orLine}/>
                            <Text style={styles.orText}>ou</Text>
                            <View style={styles.orLine}/>
                        </View>
                        <TouchableOpacity style={styles.signUpButton}>
                            <Text style={styles.signUpButtonText}>Criar Conta</Text>
                        </TouchableOpacity>
                        <Text style={[styles.orText, {textAlign: "center", width: 300, marginBottom: 60}]}>
                            Ao entrar, aceita os nossos Termos de Serviço e Política de Privacidade.
                        </Text>
                    </View>
                </View>
            </ScrollView>    
        </>
    )
}