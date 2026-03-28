import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type TextInputFieldProps<T extends FieldValues> = TextInputProps & {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  error?: FieldError;
};

export function TextInputField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  secureTextEntry,
  placeholder,
  ...rest
}: TextInputFieldProps<T>) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 6,
          fontWeight: '500',
        }}
      >
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: error ? 'red' : '#E0E0E0',
              borderRadius: 10,
              paddingHorizontal: 12,
              backgroundColor: '#FFF',
            }}
            {...rest}
          />
        )}
      />

      {error && (
        <Text style={{ color: 'red', marginTop: 4, fontSize: 12 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
}
