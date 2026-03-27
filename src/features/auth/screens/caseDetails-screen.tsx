import { ScrollView, Text, View } from 'react-native';
// import MapView from 'react-native-maps';
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
          {/* <MapView /> */}
        </View>
      </ScrollView>
    </>
  )
}