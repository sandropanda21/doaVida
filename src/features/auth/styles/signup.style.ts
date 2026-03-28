import { StyleSheet } from "react-native";

export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 30,
  },

  contentContainer: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#D32F2F",
    marginBottom: 4,
    lineHeight: 30,
  },

  sectionDescription: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
    lineHeight: 20,
    fontWeight: "400",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  flexItem: {
    flex: 1,
    maxWidth: "100%",
  },

  sectionContainer: {
    marginTop: 24,
  },

  termsTextContainer: {
    marginTop: 32,
  },

  termsText: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.6,
    lineHeight: 20,
  },

  submitButtonContainer: {
    marginTop: 20,
  },

  loginText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    marginBottom: 30,
  },

  loginLink: {
    color: "#D32F2F",
    fontWeight: "600",
  },
});
