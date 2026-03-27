import { StyleSheet } from "react-native";

export const historicCard = StyleSheet.create({
  historicCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#E5DCDC",
    gap: 6,
  },
  hospitalName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#171111",
  },
  donator: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#876464",
  },
  date: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#171111",
    transform: [{ rotate: "90deg" }],
  },
});
