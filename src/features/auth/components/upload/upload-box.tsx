import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function UploadBox() {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 13, marginBottom: 6 }}>
        Upload do Bilhete de Identidade (BI)
      </Text>

      <Pressable
        style={{
          height: 120,
          borderWidth: 1,
          borderColor: "#E53935",
          borderStyle: "dashed",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Ionicons name="camera" size={28} color="#E53935" />

        <Text
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#E53935",
          }}
        >
          Tire foto ou carregue
        </Text>
      </Pressable>
    </View>
  );
}