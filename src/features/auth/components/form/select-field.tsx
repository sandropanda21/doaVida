import { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/select-field.style';
import { SelectFieldProps } from './type';

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  error,
  disabled = false,
}: SelectFieldProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Controller
       control={control as Control<T, any>}
      name={name}
      render={({ field: { onChange, value } }) => {

        const handleSelect = (selectedValue: string) => {
          onChange(selectedValue);
          setModalVisible(false);
        };

        const selectedLabel =
          options.find((opt) => opt.value === value)?.label || value;

        return (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>{label}</Text>

            <Pressable
              onPress={() => !disabled && setModalVisible(true)}
              style={[
                styles.selectButton,
                disabled && styles.disabled,
                error && styles.errorBorder,
              ]}
              disabled={disabled}
            >
              <Text
                style={[styles.selectText, !value && styles.placeholderText]}
              >
                {selectedLabel || placeholder}
              </Text>
            </Pressable>

            {error && <Text style={styles.errorText}>{error.message}</Text>}

            <Modal
              transparent
              animationType='fade'
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{label}</Text>

                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.optionItem,
                          value === item.value && styles.selectedOption,
                        ]}
                        onPress={() => handleSelect(item.value)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            value === item.value && styles.selectedOptionText,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </Pressable>
            </Modal>
          </View>
        );
      }}
    />
  );
}
