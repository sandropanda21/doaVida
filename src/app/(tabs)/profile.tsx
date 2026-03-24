<<<<<<< HEAD:app/(tabs)/profile.tsx
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import Dropdown from 'react-native-input-select'
import { useAuth } from "../../src/context/AuthContext"
import { BLOOD_TYPES, PROVINCES, uploadFile } from "../../src/lib/supabase"

export default function Profile() {
    const { profile, signOut, updateProfile, user } = useAuth()
    const [uploading, setUploading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [bloodType, setBloodType] = useState<string | undefined>()
    const [province, setProvince] = useState<string | undefined>()
    const router = useRouter()

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "")
            setPhone(profile.phone || "")
            setBloodType(profile.blood_type || undefined)
            setProvince(profile.province || undefined)
        }
    }, [profile])

    async function handleSignOut() {
        await signOut()
        router.replace('/signIn')
    }

    async function handleSave() {
        try {
            setUploading(true)
            await updateProfile({
                full_name: fullName,
                phone: phone,
                blood_type: bloodType || null,
                province: province || null
            })
            Alert.alert("Sucesso", "Perfil atualizado com sucesso!")
            setIsEditing(false)
        } catch (error: any) {
            Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil. Verifique a sua ligação.")
        } finally {
            setUploading(false)
        }
    }

    async function handlePickImage() {
        if (!user) return

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })

        if (!result.canceled && result.assets[0].uri) {
            try {
                setUploading(true)
                const uri = result.assets[0].uri
                const response = await fetch(uri)
                const blob = await response.blob()
                const fileExt = uri.split('.').pop()
                const fileName = `${user.id}-${Date.now()}.${fileExt}`
                const filePath = `avatars/${fileName}`

                const publicUrl = await uploadFile('avatars', filePath, blob)
                await updateProfile({ avatar_url: publicUrl })
                Alert.alert("Sucesso", "Foto de perfil atualizada!")
            } catch (error: any) {
                let errorMessage = "Erro ao carregar a imagem."
                if (error.message?.includes("storage")) {
                    errorMessage = "Erro no servidor de armazenamento. Tente novamente mais tarde."
                }
                Alert.alert("Erro", errorMessage)
            } finally {
                setUploading(false)
            }
        }
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1', paddingTop: 24, paddingInline: 16 }}>
                <StatusBar backgroundColor={"#E53734"} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#171111' }}>
                        Perfil
                    </Text>
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        <Text style={{ color: '#E53734', fontWeight: 'bold' }}>
                            {isEditing ? 'Cancelar' : 'Editar Perfil'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <TouchableOpacity onPress={handlePickImage} disabled={uploading}>
                            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#E53734', justifyContent: 'center', alignItems: 'center', marginBottom: 12, overflow: 'hidden' }}>
                                {profile?.avatar_url ? (
                                    <Image source={{ uri: profile.avatar_url }} style={{ width: 100, height: 100 }} />
                                ) : (
                                    <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold' }}>
                                        {profile?.full_name?.charAt(0) || 'U'}
                                    </Text>
                                )}
                                {uploading && (
                                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator color="#fff" />
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handlePickImage} disabled={uploading}>
                            <Text style={{ color: '#E53734', fontWeight: 'bold', marginBottom: 12 }}>
                                {uploading ? 'A carregar...' : 'Alterar Foto'}
                            </Text>
                        </TouchableOpacity>

                        {isEditing ? (
                            <TextInput
                                style={{ fontSize: 20, fontWeight: 'bold', color: '#171111', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#E53734', width: '80%' }}
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Nome Completo"
                            />
                        ) : (
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#171111' }}>
                                {profile?.full_name || 'Usuário'}
                            </Text>
                        )}
                        <Text style={{ fontSize: 14, color: '#876464', marginTop: 4 }}>
                            {profile?.email}
                        </Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#E53734', marginBottom: 16 }}>
                        Informações Pessoais
                    </Text>

                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 12, color: '#876464', marginBottom: 4 }}>Telefone</Text>
                        {isEditing ? (
                            <TextInput
                                style={{ fontSize: 16, color: '#171111', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', paddingVertical: 4 }}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={{ fontSize: 16, color: '#171111' }}>{profile?.phone || 'Não informado'}</Text>
                        )}
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        {isEditing ? (
                            <Dropdown
                                label="Tipo Sanguíneo"
                                placeholder="Selecione"
                                options={BLOOD_TYPES}
                                selectedValue={bloodType}
                                onValueChange={(value) => setBloodType(value as string | undefined)}
                                primaryColor={'#E53734'}
                            />
                        ) : (
                            <>
                                <Text style={{ fontSize: 12, color: '#876464', marginBottom: 4 }}>Tipo Sanguíneo</Text>
                                <Text style={{ fontSize: 16, color: '#171111' }}>{profile?.blood_type || 'Não informado'}</Text>
                            </>
                        )}
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        {isEditing ? (
                            <Dropdown
                                label="Província"
                                placeholder="Selecione"
                                options={PROVINCES}
                                selectedValue={province}
                                onValueChange={(value) => setProvince(value as string | undefined)}
                                primaryColor={'#E53734'}
                            />
                        ) : (
                            <>
                                <Text style={{ fontSize: 12, color: '#876464', marginBottom: 4 }}>Província</Text>
                                <Text style={{ fontSize: 16, color: '#171111' }}>{profile?.province || 'Não informado'}</Text>
                            </>
                        )}
                    </View>

                    {isEditing && (
                        <TouchableOpacity
                            style={{ backgroundColor: '#E53734', borderRadius: 12, padding: 16, marginTop: 16 }}
                            onPress={handleSave}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                                    Salvar Alterações
                                </Text>
                            )}
                        </TouchableOpacity>
                    )}
                </View>

                {!isEditing && (
                    <TouchableOpacity
                        style={{ backgroundColor: '#f1f1f1', borderRadius: 12, padding: 16, marginTop: 24, marginBottom: 60, borderWidth: 1, borderColor: '#E53734' }}
                        onPress={handleSignOut}
                    >
                        <Text style={{ color: '#E53734', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                            Terminar Sessão
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </>
    )
}
=======
import { View, Text } from "react-native";

export default function ProfileScreen() {
    return (
        <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Profile Screen</Text>
            </View>
        </>
    )
}
>>>>>>> 0262965ba9ddecfd3f437962d55b03de512a3f35:src/app/(tabs)/profile.tsx
