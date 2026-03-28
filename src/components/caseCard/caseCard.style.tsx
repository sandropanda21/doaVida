import { StyleSheet } from 'react-native';

export const caseCard = StyleSheet.create({
  container: {
    flex: 1
  },
  caseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingBottom: 16,
  },
  hospitalImage: {
    height: 150,
    width: '100%',
    paddingTop: 85,
    paddingBottom: 16,
  },
  bloodInfo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    marginLeft: 16,
  },
  caseInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderEndEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171111',
    marginBottom: 4,
  },
  addressInfo: {
    fontSize: 14,
    color: '#876464',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});
