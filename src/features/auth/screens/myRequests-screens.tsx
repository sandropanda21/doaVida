import { StyleSheet, Text, View } from 'react-native';
import { mockRequests } from '../../../components/requestCard/mockRequests';
import RequestList from '../../../components/requestCard/requestList';

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
});

export default function MyRequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
      <RequestList data={mockRequests} />
    </View>
  );
}
