import { useState } from 'react';
import { Alert } from 'react-native';
import { LoginFormData } from '../../features/auth/schemas/login.schema';
import { SignUpFormData } from '../../features/auth/schemas/sign-up.schema';
import { supabase } from '../../lib/supabase';

export function useAuthActions() {
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    console.log(data);
    try {
      let result;

      const isEmail = data.identifier.includes('@');

      if (isEmail) {
        result = await supabase.auth.signInWithPassword({
          email: data.identifier,
          password: data.password,
        });
      } else {
        Alert.alert(
          'Aviso',
          'Login com telefone via SMS ainda não implementado.'
        );
        return;
      }

      if (result.error) throw result.error;

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
            gender: data.gender,
            birth_date: data.birthDate,
            blood_type: data.bloodType,
            province: data.province,
            municipality: data.municipality,
          },
        },
      });

      if (error) throw error;

      Alert.alert(
        'Conta criada!',
        'Verifique o seu email para confirmar o registo.'
      );
    } catch (error: any) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Erro', error.message);
  };

  return {
    login,
    signUp,
    signOut,
    loading,
  };
}
