import { useState } from "react";
import { View, Text, Pressable, Modal, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../styles/select-fild.style";
import { SelectFieldProps } from "./type";

export function SelectField({ label, placeholder, options, onValueChange }: SelectFieldProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setModalVisible(false);
    onValueChange && onValueChange(value);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, marginBottom: 6, fontWeight: "500", lineHeight: 21 }}>{label}</Text>

      <Pressable
        onPress={() => setModalVisible(true)}
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
        <Text style={{ opacity: selectedValue ? 1 : 0.6 }}>
          {selectedValue || placeholder}
        </Text>
      </Pressable>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}