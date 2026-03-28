import { StyleSheet } from "react-native";

export const caseDetails = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    // paddingVertical: 14,
    paddingTop: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#171111',
    marginLeft: 12,
  },

  container: {
    flex: 1,
    padding: 16,
  },
  hospitalInfoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  hospitalNameAndBloodType: {
    flexDirection: "row",
    gap: 8,
  },
  hospitalName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#171111",
    maxWidth: 245,
  },
  bloodInfoBox: {
    backgroundColor: "#E53734",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: 74,
  },
  bloodLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  hospitalAddress: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#876464",
  },
  mapContainer: {
    height: 200,
    width: 320,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  map: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 24,
    gap: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171111",
  },
  sectionDetailedContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffb2b0ff",
    padding: 4,
    borderRadius: "50%",
    height: 48,
    width: 48,
  },
  namesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  names: {
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#171111",
  },
  orderCreator: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#876464",
  },
  caseResumeContainer: {
    borderTopColor: "#dfeaffff",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  caseResume: {
    fontSize: 14,
    fontWeight: "regular",
    textAlign: "justify",
    color: "#876464",
  },
  mandatoryRequirement: {
    flexDirection: "row",
    alignItems: "center",
  },
  mandatoryRequirementText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#876464",
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 30
  },
});
