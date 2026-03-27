import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../../components/dropdown/dropdown.styles";
import CaseCard from "../components/caseCard/caseCard";
import { homeStyles } from "../styles/home.style";

const data = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
]
export default function HomeScreen() {
  const [pickBloodType, setPickBloodType] = useState<string | null>(null);
  return (
    <>
      <View style={homeStyles.container}>
        <Dropdown
          labelField={"label"}
          data={data}
          valueField={"value"}
          value={pickBloodType}
          onChange={item => setPickBloodType(item.value)}
          iconColor="#171111"
          style={styles.dropdown}
          placeholder="Tipo Sanguíneo"
        />
        <Text style={homeStyles.askText}>
          Pedidos Urgentes
        </Text>
        <ScrollView
          contentContainerStyle={homeStyles.casesList}
          showsVerticalScrollIndicator={false}
        >
          <View style={homeStyles.casesList}>
            <CaseCard
              patientName="João Santos"
              status="Urgente"
              bloodType="O+ Positivo"
            />
            <CaseCard
              patientName="Santos António"
              status="Urgente"
              bloodType="O+ Negativo"
            />
            <CaseCard
              patientName="Luciano Mendes"
              status="Rotina"
              bloodType="A+ Positivo"
            />
            <CaseCard
              patientName="Inês Augusto"
              status="Urgente"
              bloodType="AB+ Positivo"
            />
            <CaseCard
              patientName="José Maria"
              status="Urgente"
              bloodType="O+ Positivo"
            />
          </View>
        </ScrollView>
      </View>
    </>
  )
}
