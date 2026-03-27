import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../../../components/button/Button';
import { useAuthActions } from '../../../hooks/auth/useAuthActions';
import { TextInputField } from '../components/form/text-input-field';
import { LoginFormData, loginSchema } from '../schemas/login.schema';
import { loginStyles } from '../styles/login.style';

interface iconImage {
  image: ReturnType<typeof require>;
}

const imageIcons: iconImage[] = [
  {
    image: require('../../../assets/icons/Icon.png'),
  },
];

export function LoginScreen() {
  const { login, loading } = useAuthActions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };
  const handleCreateAccount = async () => {
    router.replace('/(auth)/register');
  };

  return (
    <>
      <ScrollView
        style={loginStyles.container}
        contentContainerStyle={loginStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.infoBox}>
          <Image
            source={imageIcons[0].image}
            style={{
              marginBottom: 16,
            }}
          />
          <Text style={loginStyles.infoText}>
            Conectando doadores e receptores em Angola
          </Text>
        </View>

        <View style={loginStyles.inputContainer}>
          <TextInputField
            control={control}
            label='Telemóvel ou Email'
            placeholder='Ex: +244 9XX XXX XXX'
            name={'identifier'}
            error={errors.identifier}
          />
        </View>

        <View style={loginStyles.inputContainer}>
          <TextInputField
            control={control}
            label='Palavra-passe'
            placeholder='Insira a sua palavra-passe'
            secureTextEntry
            name={'password'}
            error={errors.password}
          />
          <Text style={loginStyles.forgotPasswordText}>
            Esqueceu a palavra-passe?
          </Text>
        </View>

        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          title='Entrar'
          size='large'
        />

        <Text style={loginStyles.orText}>ou</Text>

        <View style={loginStyles.createAccountButtonContainer}>
          <Button
            disabled={loading}
            onPress={handleCreateAccount}
            title='Criar conta'
            variant='outline'
            size='large'
          />
        </View>

        <View style={loginStyles.termsTextContainer}>
          <Text style={loginStyles.termsText}>
            Ao entrar, aceita os nossos{' '}
            <Text style={loginStyles.primaryColor}>Termos de Serviço</Text> e{' '}
            <Text style={loginStyles.primaryColor}>
              Política de Privacidade
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
