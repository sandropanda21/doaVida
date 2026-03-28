import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CaseCard from '../../../components/caseCard/caseCard';
import styles from '../../../components/dropdown/dropdown.styles';
import { useBloodRequests } from '../../../hooks/blood/useBloodRequests';
import { homeStyles } from '../styles/home.style';

const bloodTypes = [
  { label: 'Todos', value: '' },
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedBloodType, setSelectedBloodType] = useState<string>('');
  const { requests, loading } = useBloodRequests();

  const filteredRequests = selectedBloodType
    ? requests.filter((r) => r.blood_type === selectedBloodType)
    : requests;

  return (
    <View style={homeStyles.container}>
      <Dropdown
        data={bloodTypes}
        labelField='label'
        valueField='value'
        value={selectedBloodType}
        onChange={(item) => setSelectedBloodType(item.value)}
        placeholder='Filtrar por Tipo Sanguíneo'
        style={styles.dropdown}
      />

      <Text style={homeStyles.askText}>
        Pedidos Urgentes {selectedBloodType && `(${selectedBloodType})`}
      </Text>

      <ScrollView
        contentContainerStyle={homeStyles.casesList}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text>Carregando pedidos...</Text>
        ) : filteredRequests.length === 0 ? (
          <Text>Nenhum pedido encontrado</Text>
        ) : (
          filteredRequests.map((request) => (
            <CaseCard
              key={request.id}
              patientName={request.patient_name}
              bloodType={`${request.blood_type} `}
              onPress={() => router.push(`/details/${request.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
