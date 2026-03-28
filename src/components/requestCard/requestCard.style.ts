import { StyleSheet } from "react-native";

export const requestCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  badgeAtivo: { backgroundColor: "#FFE9E9" },
  textAtivo: { color: "#E53734" },

  badgeEmRevisao: { backgroundColor: "#FFF4E5" },
  textEmRevisao: { color: "#D97706" },

  badgeConcluido: { backgroundColor: "#E6F7EE" },
  textConcluido: { color: "#16A34A" },

  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  bloodCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  circleAtivo: { backgroundColor: "#FFE9E9" },
  circleEmRevisao: { backgroundColor: "#FFF4E5" },
  circleConcluido: { backgroundColor: "#E6F7EE" },

  bloodType: {
    fontSize: 13,
    fontWeight: "700",
  },
  bloodAtivo: { color: "#E53734" },
  bloodEmRevisao: { color: "#D97706" },
  bloodConcluido: { color: "#16A34A" },

  patientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171111",
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addressText: {
    fontSize: 13,
    color: "#876464",
  },
});
