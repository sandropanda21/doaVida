import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import RequestList from '../../../components/requestCard/requestList';
import { useUserRequests } from '../../../hooks/useUserRequests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171111',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MyRequestsScreen() {
  const { userRequests, loading, error } = useUserRequests();
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E53734" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
      {userRequests.length > 0 ? (
        <RequestList data={userRequests} />
      ) : (
        <View style={styles.centered}>
          <Text>Você ainda não realizou nenhum pedido.</Text>
        </View>
      )}
    </View>
  );
}
