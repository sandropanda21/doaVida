import { View, Text, Pressable } from "react-native";

type SelectFieldProps = {
  label: string;
  placeholder: string;
};

export function SelectField({ label, placeholder }: SelectFieldProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, marginBottom: 6 }}>{label}</Text>

      <Pressable
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          borderRadius: 8,
          justifyContent: "center",
          paddingHorizontal: 12,
          backgroundColor: "#FFF",
        }}
      >
        <Text style={{ opacity: 0.6 }}>{placeholder}</Text>
      </Pressable>
    </View>
  );
}