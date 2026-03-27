import { SendHorizontal } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { Button } from "../../../components/button/Button"
import { SelectField } from "../components/form/select-field"
import { TextInputField } from "../components/form/text-input-field"
import { createOrder } from "../styles/createOrder.style"
export default function CreateOrderScreen() {
  return (
    <>
      <ScrollView style={createOrder.container}>
        <Text style={createOrder.newAskText}>
          Novo Pedido de Sangue
        </Text>
        <Text style={createOrder.newAskLabel}>
          Preencha os detalhes para encontrar doadores compatíveis em Angola. A sua informação ajudará a salvar vidas.
        </Text>
        <View style={createOrder.formContainer}>
          <TextInputField
            label="Nome do paciente"
            placeholder="João Silva"
          />
          <View style={createOrder.selectInputs}>
            <SelectField
              label="Tipo Sanguíneo"
              placeholder="Selecione"
              options={
                ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
              }
            />
            <SelectField
              label="Tipo Sanguíneo"
              placeholder="Qtd, Bolsas de Sangue"
              options={
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
              }
            />
          </View>
          <TextInputField
            label="Contacto de Emergência"
            placeholder="923456789"
          />
          <TextInputField
            label="Descrição da Situação"
            placeholder="Conte um pouco sobre a necessidade para sensibilizar os doadores..."
            multiline
            numberOfLines={5}
          />
          <Button
            title="Enviar Pedido"
            size="medium"
            icon={<SendHorizontal color={"#fff"} />}
          />
        </View>
      </ScrollView>
    </>
  )
}