import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#f1f1f1",
      paddingTop: 24,
      paddingInline: 16,
      paddingBottom: 20
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: "#E53734",
      marginTop: 16,
      marginBottom: 8
    },
    banner: {
      justifyContent: "center",
      alignItems: "center",
      width: 330,
      height: 180,
      padding: 30,
      paddingInline: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#d36d6b",
      backgroundColor: "#f58987",
      marginTop: 24,
      marginBottom: 24
    },
    bannerText: {
      fontSize: 16,
      fontWeight: "semibold",
      color: "#E53734",
      textAlign: "center"
    },
    inputContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      columnGap: 8,
      rowGap: 16,
    },
    input: {
      gap: 8
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "medium",
      color: "#171111"
    },
    passwordInput: {
      height: 56,
      width: 325,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
      backgroundColor: "#f1f1f1"
    }, 
    emailInput: {
      height: 56,
      width: 325,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    regularText: {
      fontSize: 16,
      fontWeight: "regular",
      fontFamily: "Inter",
      color: "#171111"
    },
    smText: {
      fontSize: 14,
      fontWeight: "medium",
      color: "#E53734",
    },
    logInButton: {
      backgroundColor: "#E53734",
      borderRadius: 12,
      width: 320,
      height: 56,
      marginTop: 24,
      marginBottom: 24
    },
    logInButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    },
    orContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 6
    },
    orLine: {
      width: 145,
      height: 1,
      backgroundColor: "#876464"
    },
    orText: {
      fontSize: 12,
      fontWeight: "semibold",
      color: "#876464"
    },
    signUpButton: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E53734",
      width: 320,
      height: 56,
      marginTop: 24,
      marginBottom: 24
    },
    signUpButtonText: {
      color: "#E53734",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    }
})
export default styles