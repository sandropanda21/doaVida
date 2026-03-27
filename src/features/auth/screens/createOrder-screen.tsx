import { SendHorizontal } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../components/button/Button';
import { SelectField } from '../components/form/select-field';
import { TextInputField } from '../components/form/text-input-field';
import { createOrder } from '../styles/createOrder.style';
export default function CreateOrderScreen() {
  return (
    <>
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
            label='Nome do paciente'
            placeholder='João Silva'
            label='Nome do paciente'
            placeholder='João Silva'
            name={''}
          />
          <View style={createOrder.selectInputs}>
            <SelectField
              label='Tipo Sanguíneo'
              placeholder='Selecione'
              options={[
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
              ]}
              name={''}
            />
            <SelectField
              label='Tipo Sanguíneo'
              placeholder='Qtd, Bolsas de Sangue'
              options={[
                { label: '1 bolsa', value: '1' },
                { label: '2 bolsas', value: '2' },
                { label: '3 bolsas', value: '3' },
              ]}
              name={''}
            />
          </View>
          <TextInputField
            label='Contacto de Emergência'
            placeholder='923456789'
          />
          <TextInputField
            label='Descrição da Situação'
            placeholder='Conte um pouco sobre a necessidade para sensibilizar os doadores...'
            multiline
            numberOfLines={5}
          />
          <Button
            title='Enviar Pedido'
            size='medium'
            icon={<SendHorizontal color={'#fff'} />}
          />
        </View>
      </ScrollView>
    </>
  );
}
