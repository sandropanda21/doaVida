import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { SendHorizontal } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Button } from '../../../components/button/Button';
import { SelectField } from '../components/form/select-field';
import { TextInputField } from '../components/form/text-input-field';

import { useCreateBloodRequest } from '../../../hooks/blood/useCreateBloodRequest';
import {
  CreateBloodRequestFormData,
  createBloodRequestSchema,
} from '../../blood/schemas/create-blood-request.schema';
import { createOrder } from '../styles/createOrder.style';

export default function CreateOrderScreen() {
  const { createRequest, loading } = useCreateBloodRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBloodRequestFormData>({
    resolver: zodResolver(createBloodRequestSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateBloodRequestFormData) => {
    try {
      await createRequest({
        patient_name: data.patient_name,
        blood_type: data.blood_type,
        bags_quantity: parseInt(data.bags_quantity),
        contact_phone: data.contact_phone,
        description: data.description,
      });

      Alert.alert('Sucesso!', 'Pedido de sangue enviado com sucesso.');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar o pedido.');
    }
  };

  return (
    <ScrollView
      style={createOrder.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={createOrder.newAskText}>Novo Pedido de Sangue</Text>

      <Text style={createOrder.newAskLabel}>
        Preencha os detalhes para encontrar doadores compatíveis em Angola. A
        sua informação ajudará a salvar vidas.
      </Text>

      <View style={createOrder.formContainer}>
        <TextInputField
          control={control}
          name='patient_name'
          label='Nome do paciente'
          placeholder='João Silva'
          error={errors.patient_name}
        />

        <View style={createOrder.selectInputs}>
          <SelectField
            control={control}
            name='blood_type'
            label='Tipo Sanguíneo'
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
            error={errors.blood_type}
          />

          <SelectField
            control={control}
            name='bags_quantity'
            label='Quantidade de Bolsas'
            placeholder='Selecione'
            options={[
              { label: '1 bolsa', value: '1' },
              { label: '2 bolsas', value: '2' },
              { label: '3 bolsas', value: '3' },
              { label: '4 bolsas', value: '4' },
            ]}
            error={errors.bags_quantity}
          />
        </View>

        <TextInputField
          control={control}
          name='contact_phone'
          label='Contacto de Emergência'
          placeholder='923 456 789'
          keyboardType='phone-pad'
          error={errors.contact_phone}
        />

        <TextInputField
          control={control}
          name='description'
          label='Descrição da Situação'
          placeholder='Conte um pouco sobre a necessidade...'
          multiline
          numberOfLines={5}
          error={errors.description}
        />

        <Button
          title='Enviar Pedido'
          size='medium'
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          icon={<SendHorizontal color={'#fff'} />}
        />
      </View>
    </ScrollView>
  );
}
