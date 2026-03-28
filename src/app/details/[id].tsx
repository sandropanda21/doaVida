import { router, useLocalSearchParams } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ArrowLeft, CircleCheck, ClipboardList, Dot, Phone, UserRound } from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useBloodRequestById } from '../../hooks/blood/useBloodRequestById';
import { caseDetails } from '../../features/auth/styles/caseDetails.style';
import { Button } from '../../components/button/Button';

export default function CaseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { request, loading, error } = useBloodRequestById(id);

  if (loading) {
    return (
      <View style={caseDetails.container}>
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !request) {
    return (
      <View style={caseDetails.container}>
        <Text>Pedido não encontrado ou erro ao carregar.</Text>
      </View>
    );
  }

  return (
    <>
    <View style={caseDetails.header}>
        <Pressable
          onPress={() => router.back()}
          style={caseDetails.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft color="#171111" size={28} />
        </Pressable>

        <Text style={caseDetails.headerTitle}>Detalhes do Pedido</Text>
      </View>
    <ScrollView style={caseDetails.container}>
      <View style={caseDetails.hospitalInfoContainer}>
        <View style={caseDetails.hospitalNameAndBloodType}>
          <Text style={caseDetails.hospitalName}>
            {request.hospital || 'Hosp. Materno Infantil Augusto Ngangula'}
          </Text>
          <View style={caseDetails.bloodInfoBox}>
            <Text style={caseDetails.bloodLabel}>Tipo</Text>
            <Text style={[caseDetails.bloodLabel, { fontSize: 18 }]}>
              {request.blood_type}
            </Text>
          </View>
        </View>
        <Text style={caseDetails.hospitalAddress}>
          Rua Ndunduma, nº 37, Município de Luanda
        </Text>
      </View>

      <View style={caseDetails.mapContainer}>
        <Image
          source={require("../../assets/images/Map.png")}
          style={caseDetails.map}
          height={200}
          width={320}
          borderRadius={12}
        />
      </View>

      <View style={caseDetails.sectionContainer}>
        <View style={caseDetails.sectionHeader}>
          <UserRound color={"#E53734"} />
          <Text style={caseDetails.sectionLabel}>Paciente e Família</Text>
        </View>
        <View style={caseDetails.sectionDetailedContainer}>
          <View style={caseDetails.namesContainer}>
            <View style={caseDetails.iconCircle}>
              <MaterialIcons name="family-restroom" size={24} color="#E53734" />
            </View>
            <View style={caseDetails.names}>
              <Text style={caseDetails.patientName}>{request.patient_name}</Text>
              <Text style={caseDetails.orderCreator}>
                Contacto: {request.contact_phone}
              </Text>
            </View>
          </View>

          <View style={caseDetails.caseResumeContainer}>
            <Text style={caseDetails.caseResume}>
              {request.description || 'Sem descrição disponível.'}
            </Text>
          </View>
        </View>
      </View>

      {/* Requisitos Obrigatórios (mantidos estáticos como você tinha) */}
      <View style={caseDetails.sectionContainer}>
        <View style={caseDetails.sectionHeader}>
          <ClipboardList color={"#E53734"} />
          <Text style={caseDetails.sectionLabel}>Requisitos Obrigatórios</Text>
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
        <Button title="Confirmar Disponibilidade" icon={<CircleCheck color={"#fff"} />} />
        <Button
          title="Ligar Agora"
          icon={<Phone color={"#E53734"} />}
          variant="outline"
          // onPress={() => Linking.openURL(`tel:${request.contact_phone}`)} ← pode adicionar depois
        />
      </View>
    </ScrollView>
    </>
  );
}