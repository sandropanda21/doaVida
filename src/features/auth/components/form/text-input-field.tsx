import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

type TextInputFieldProps<T extends FieldValues> = TextInputProps & {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  error?: FieldError;
  isPassword?: boolean;
};

export function TextInputField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  secureTextEntry,
  placeholder,
  isPassword = false,
  ...rest
}: TextInputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword ? !showPassword : secureTextEntry;

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: error ? 'red' : '#E0E0E0',
              borderRadius: 10,
              backgroundColor: '#FFF',
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 56,
                paddingHorizontal: 12,
              }}
              placeholder={placeholder}
              secureTextEntry={isSecure}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              {...rest}
            />

            {isPassword && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingHorizontal: 12 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#555" />
                ) : (
                  <Eye size={20} color="#555" />
                )}
              </TouchableOpacity>
            )}
          </View>
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