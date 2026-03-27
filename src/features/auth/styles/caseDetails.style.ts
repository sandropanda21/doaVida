import { StyleSheet } from "react-native";

export const caseDetails = StyleSheet.create({
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
    width: 350,
    borderRadius: 12,
  },
});
