import { View, Text, TextInput, TextInputProps } from "react-native";

type TextInputFieldProps = TextInputProps & {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export function TextInputField({
  label,
  placeholder,
  secureTextEntry,
  ...rest
}: TextInputFieldProps) {
  return (
    <View style={{ marginBottom: 16,  }}>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 6,
          fontWeight: "500",
          lineHeight: 21,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          borderRadius: 10,
          paddingHorizontal: 12,
          backgroundColor: "#FFF",
        }}
        {...rest}
      />
    </View>
  );
}