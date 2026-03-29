import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../../context/AuthContext';
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
  const { user } = useAuth();
  const [selectedBloodType, setSelectedBloodType] = useState<string>('');
  const { requests, loading, fetchRequests } = useBloodRequests();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRequests(); // Chama a função do teu hook que busca os dados no Supabase
    setRefreshing(false);
  }, [fetchRequests]);

  const filteredRequests = requests.filter((r) => {
    const isNotMine = r.user_id !== user?.id;
    const matchesBloodType = selectedBloodType ? r.blood_type === selectedBloodType : true;
    
    return isNotMine && matchesBloodType;
  });

  return (
    <ScrollView
      style={homeStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#E53734']} // Cor do spinner no Android
          tintColor={'#E53734'} // Cor do spinner no iOS
        />
      }
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
  );
}
