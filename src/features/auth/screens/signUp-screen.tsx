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
      <View style={signUpStyles.row}>
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='name'
            label='Nome completo'
            placeholder='João Silva'
            error={errors.name}
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
            keyboardType='decimal-pad'
          />
        </View>
      </View>
      <View style={signUpStyles.sectionContainer}>
        <Text style={signUpStyles.sectionTitle}>Contacto e Segurança</Text>
        <TextInputField
          control={control}
          name='phone'
          label='Telefone'
          placeholder='+244 9XX XXX XXX'
          error={errors.phone}
          keyboardType='phone-pad'
        />
        <TextInputField
          control={control}
          name='email'
          label='E-mail'
          placeholder='email@email.com'
          keyboardType='email-address'
          autoCapitalize='none'
          error={errors.email}
        />
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='password'
            label='Palavra-passe'
            placeholder='Palavra-passe com pelo menos 8 caracteres'
            error={errors.password}
            isPassword
            secureTextEntry
          />
        </View>
        <View style={signUpStyles.flexItem}>
          <TextInputField
            control={control}
            name='confirmPassword'
            label='Confirmar a Palavra-passe'
            placeholder='Confirme a sua Palavra-Passe'
            error={errors.confirmPassword}
            isPassword
            secureTextEntry
          />
        </View>
      </View>
      <View style={signUpStyles.sectionContainer}>
        <Text style={signUpStyles.sectionTitle}>Saúde e Localização</Text>
        <View style={signUpStyles.row}>
          <View style={[signUpStyles.flexItem,]}>
            <SelectField
              control={control}
              name='bloodType'
              label='Grupo Sanguíneo'
              placeholder='O+'
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

          <View style={[signUpStyles.flexItem, { maxWidth: 200 }]}>
            <SelectField
              control={control}
              name='province'
              label='Província'
              placeholder='Luanda'
              options={[{ label: 'Luanda', value: 'Luanda' }]}
              error={errors.province}
            />
          </View>
        </View>

        <SelectField
          control={control}
          name='municipality'
          label='Município'
          placeholder='Cacuaco'
          options={[
            { label: 'Viana', value: 'Viana' },
            { label: 'Belas', value: 'Belas' },
            { label: 'Cacuaco', value: 'Cacuaco' },
            { label: 'Talatona', value: 'Talatona' },
            { label: 'Icolo e Bengo', value: 'Icolo e Bengo' },
            { label: 'Quiçama', value: 'Quiçama' },
            { label: 'Cazenga', value: 'Cazenga' },
            { label: 'Luanda', value: 'Luanda' },
            { label: 'Kilamba Kiaxi', value: 'Kilamba Kiaxi' },
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
