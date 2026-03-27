import { useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export function UploadBox() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à galeria para continuar.");
      return;
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à câmera para continuar.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    Alert.alert("Escolher Imagem", "Selecione uma opção", [
      { text: "Tirar Foto", onPress: takePhoto },
      { text: "Escolher da Galeria", onPress: pickImage },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 14, marginBottom: 12, fontWeight: "500", lineHeight: 21 }}>
        Upload do Bilhete de Identidade (BI)
      </Text>

      <Pressable
        onPress={handlePress}
        style={{
          height: 180,
          borderWidth: 1,
          borderColor: "#E53935",
          borderStyle: "dashed",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#E53935",
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="camera" size={28} color="#fff" />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 16,
                  lineHeight: 24,
                  color: "#E53935",
                  fontWeight: "700",
                }}
              >
                Tire foto ou carregue
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 21,
                  color: "#6B7280",
                  opacity: 0.6,
                  fontWeight: "400",
                }}
              >
                PNG, JPG ou JPEG (máx. 5MB)
              </Text>
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
}