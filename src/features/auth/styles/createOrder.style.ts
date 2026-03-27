import { StyleSheet } from "react-native";

export const createOrder = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  newAskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#171111",
  },
  newAskLabel: {
    fontSize: 12,
    fontWeight: "regular",
    color: "#17111",
    textAlign: "justify",
    maxWidth: 300,
  },
  formContainer: {
    paddingTop: 8,
    paddingBottom: 40,
    gap: 12,
  },
  selectInputs: {
    flexDirection: "row",
    gap: 8,
  },
});
