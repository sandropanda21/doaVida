import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../components/button/Button';
import { useAuthActions } from '../../../hooks/auth/useAuthActions';
import { SelectField } from '../components/form/select-field';
import { TextInputField } from '../components/form/text-input-field';
import { UploadBox } from '../components/upload/upload-box';

import { SignUpFormData, signUpSchema } from '../schemas/sign-up.schema';
import { signUpStyles } from '../styles/signup.style';

export function SignUpScreen() {
  const { signUp, loading } = useAuthActions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
  };

  const handleGoToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView
      style={signUpStyles.container}
      contentContainerStyle={signUpStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={signUpStyles.sectionTitle}>Dados Pessoais</Text>

      <Text style={signUpStyles.sectionDescription}>
        Preencha todas as informações solicitadas
      </Text>

      {/* Dados Pessoais */}
      <View style={signUpStyles.row}>
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='firstName'
            label='Primeiro Nome'
            placeholder='ex: João'
            error={errors.firstName}
          />
        </View>

        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='lastName'
            label='Sobrenome'
            placeholder='ex: Silva'
            error={errors.lastName}
          />
        </View>
      </View>

      <View style={signUpStyles.row}>
        <View style={signUpStyles.flexItem}>
          <SelectField
            control={control}
            name='gender'
            label='Gênero'
            placeholder='Selecione'
            options={[
              { label: 'Masculino', value: 'male' },
              { label: 'Feminino', value: 'female' },
              { label: 'Outro', value: 'other' },
            ]}
            error={errors.gender}
          />
        </View>

        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='birthDate'
            label='Data de Nascimento'
            placeholder='AAAA-MM-DD'
            error={errors.birthDate}
          />
        </View>
      </View>

      {/* Contacto e Segurança */}
      <View style={signUpStyles.sectionContainer}>
        <Text style={signUpStyles.sectionTitle}>Contacto e Segurança</Text>
        <TextInputField
          control={control}
          name='phone'
          label='Telefone'
          placeholder='+244 9XX XXX XXX'
          error={errors.phone}
        />
        <TextInputField
          control={control}
          name='email'
          label='E-mail'
          placeholder='exemplo@email.com'
          keyboardType='email-address'
          autoCapitalize='none'
          error={errors.email}
        />
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='password'
            label='Palavra-passe'
            placeholder='sua senha'
            error={errors.password}
          />
        </View>{' '}
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='confirmPassword'
            label='Confirmar palavra-passe'
            placeholder='confirme sua senha'
            error={errors.confirmPassword}
          />
        </View>
      </View>

      {/* Saúde e Localização */}
      <View style={signUpStyles.sectionContainer}>
        <Text style={signUpStyles.sectionTitle}>Saúde e Localização</Text>

        <View style={signUpStyles.row}>
          <View style={signUpStyles.flexItem}>
            <SelectField
              control={control}
              name='bloodType'
              label='Grupo Sanguíneo'
              placeholder='Selecione'
              options={[
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
                { label: 'B-', value: 'B-' },
                { label: 'AB+', value: 'AB+' },
                { label: 'AB-', value: 'AB-' },
                { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' },
              ]}
              error={errors.bloodType}
            />
          </View>

          <View style={signUpStyles.flexItem}>
            <SelectField
              control={control}
              name='province'
              label='Província'
              placeholder='Selecione'
              options={[{ label: 'Luanda', value: 'Luanda' }]}
              error={errors.province}
            />
          </View>
        </View>

        <SelectField
          control={control}
          name='municipality'
          label='Município'
          placeholder='Selecione primeiro a província'
          options={[
            { label: 'Viana', value: 'Viana' },
            { label: 'Belas', value: 'Belas' },
          ]}
          error={errors.municipality}
        />

        <UploadBox />
      </View>

      <View style={signUpStyles.termsTextContainer}>
        <Text style={signUpStyles.termsText}>
          Ao clicar em "Criar Conta", você concorda com nossos Termos de Serviço
          e Política de Privacidade.
        </Text>
      </View>

      <View style={signUpStyles.submitButtonContainer}>
        <Button
          title='Criar Conta'
          size='large'
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          loading={loading}
        />
      </View>

      <Text style={signUpStyles.loginText}>
        Já tens uma conta?{' '}
        <Text style={signUpStyles.loginLink} onPress={handleGoToLogin}>
          Iniciar Sessão
        </Text>
      </Text>
    </ScrollView>
  );
}
