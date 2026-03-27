import { StyleSheet } from 'react-native';

export const caseCard = StyleSheet.create({
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
  caseStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#E53935',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: 130,
  },
  bloodInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
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
