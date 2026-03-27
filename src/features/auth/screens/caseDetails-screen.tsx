// import MapView from 'expo-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CircleCheck, ClipboardList, Dot, Phone, UserRound } from 'lucide-react-native';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from '../../../components/button/Button';
import { caseDetails } from '../styles/caseDetails.style';
export default function CaseDetailsScreen() {
  return (
    <>
      <ScrollView style={caseDetails.container}>
        <View style={caseDetails.hospitalInfoContainer}>
          <View style={caseDetails.hospitalNameAndBloodType}>
            <Text style={caseDetails.hospitalName}>
              Hosp. Materno Infantil Augusto Ngangula
            </Text>
            <View style={caseDetails.bloodInfoBox}>
              <Text style={caseDetails.bloodLabel}>
                Tipo
              </Text>
              <Text style={[caseDetails.bloodLabel, { fontSize: 18 }]}>
                O+
              </Text>
            </View>
          </View>
          <Text style={caseDetails.hospitalAddress}>
            Rua Ndunduma, nº 37, Município de Luanda
          </Text>
        </View>
        <View style={caseDetails.mapContainer}>
          {/* <MapView style={caseDetails.map} /> */}
          <Image
            source={require("../../../assets/images/Map.png")}
            style={caseDetails.map}
            height={200}
            width={320}
            borderRadius={12}
          />
        </View>
        <View style={caseDetails.sectionContainer}>
          <View style={caseDetails.sectionHeader}>
            <UserRound color={"#E53734"} />
            <Text style={caseDetails.sectionLabel}>
              Paciente e Família
            </Text>
          </View>
          <View style={caseDetails.sectionDetailedContainer}>
            <View style={caseDetails.namesContainer}>
              <View style={caseDetails.iconCircle}>
                <MaterialIcons name="family-restroom" size={24} color="#E53734" />
              </View>
              <View style={caseDetails.names}>
                <Text style={caseDetails.patientName}>
                  João Santos
                </Text>
                <Text style={caseDetails.orderCreator}>
                  Contacto: António Santos
                </Text>
              </View>
            </View>
            <View style={caseDetails.caseResumeContainer} >
              <Text style={caseDetails.caseResume} >
                "A nossa família agradece imensamente a quem puder ajudar. A Maria precisa de cirurgia urgente."
              </Text>
            </View>
          </View>
        </View>
        <View style={caseDetails.sectionContainer}>
          <View style={caseDetails.sectionHeader}>
            <ClipboardList color={"#E53734"} />
            <Text style={caseDetails.sectionLabel}>
              Requisitos Obrigatórios
            </Text>
          </View>
          <View style={caseDetails.sectionDetailedContainer}>
            <View>
              <View style={caseDetails.mandatoryRequirement}>
                <Dot color={"#E53734"} size={30} />
                <Text style={caseDetails.mandatoryRequirementText}>Não estar em jejum absoluto</Text>
              </View>
              <View style={caseDetails.mandatoryRequirement}>
                <Dot color={"#E53734"} size={30} />
                <Text style={caseDetails.mandatoryRequirementText}>Pesar mais de 50kg</Text>
              </View>
              <View style={caseDetails.mandatoryRequirement}>
                <Dot color={"#E53734"} size={30} />
                <Text style={caseDetails.mandatoryRequirementText}>Trazer Bilhete de Identidade</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={caseDetails.buttonsContainer}>
          <Button title='Confirmar Disponilidade' icon={<CircleCheck color={"#fff"} />} />
          <Button title='Ligar Agora' icon={<Phone color={"#E53734"} />} variant='outline' />
        </View>
      </ScrollView>
    </>
  )
}