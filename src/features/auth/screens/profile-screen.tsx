import { CalendarCheck, LogOut } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { Button } from '../../../components/button/Button';
import HistoricCard from '../../../components/historicCard/historicCard';
import { useAuth } from '../../../context/AuthContext';
import { useAuthActions } from '../../../hooks/auth/useAuthActions';
import { profileScreen } from '../styles/profile.style';

export default function ProfileScreen() {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const { signOut, Loading } = useAuthActions();
  const { user } = useAuth();
  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);
  return (
    <>
      <ScrollView
        style={profileScreen.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={profileScreen.imageContainer}>
          <View style={profileScreen.image} />
          <Text style={profileScreen.username}>
            {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
          </Text>
        </View>
        <View style={profileScreen.bloodTypeContainer}>
          <Text style={profileScreen.bloodTypeLabel}>Tipo Sanguíneo</Text>
          <Text style={profileScreen.bloodType}>
            {user?.user_metadata?.blood_type}
          </Text>
          <View style={profileScreen.bloodDonators}>
            <Text style={profileScreen.bloodDonators}>Doador Universal</Text>
          </View>
        </View>
        <View style={profileScreen.availabilityContainer}>
          <View>
            <Text style={profileScreen.availabilityText}>Disponibilidade</Text>
            <Text style={profileScreen.availabilityDescription}>
              Visível para pedidos de emergência
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E5DCDC', true: '#E53734' }}
            thumbColor={isAvailable ? '#E5DCDC' : '#E53734'}
            onValueChange={toggleSwitch}
            value={isAvailable}
          />
        </View>
        <View style={profileScreen.donationInformationContainer}>
          <View style={profileScreen.donationInformationLastDateLabel}>
            <CalendarCheck color={'#fff'} />
            <Text style={profileScreen.donationInformationLastDateLabel}>
              Última Doação
            </Text>
          </View>
          <Text style={profileScreen.donationInformationLastDate}>
            12 de Outubro, 2025
          </Text>
          <Text style={profileScreen.donationDateForNextDonor}>
            Próxima doação disponível em: <Text>24 dias</Text>
          </Text>
        </View>
        <View style={profileScreen.donationHistoricContainer}>
          <Text style={profileScreen.donationHistoricTitle}>
            Histórico de doações
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HistoricCard date={'23 Out 25'} />
          </ScrollView>
        </View>
        <View style={profileScreen.logOutButtonContainer}>
          <Button
            onPress={() => {
              signOut();
            }}
            title='Terminar Sessão'
            icon={<LogOut color={'#fff'} />}
          />
        </View>
      </ScrollView>
    </>
  );
}
