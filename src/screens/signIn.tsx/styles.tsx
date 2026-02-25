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
    headerContainer: {
      flexDirection: "column",
      marginTop: 24,
      marginBottom: 8
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#E53734" 
    },
    headerSubtitle: {
      fontSize: 14,
      fontWeight: "normal",
      color: "#6B7280",
      marginBottom: 12 
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
    inputField: {
      height: 65,
      width: 160,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
      backgroundColor: "#f1f1f1"
    }, 
    inputLabel: {
      fontSize: 14,
      fontWeight: "medium",
      color: "#171111"
    },
    contactsSecurityContainer: {
      flexDirection: "column",
      marginTop: 24,
      marginBottom: 8,
    },
    contactsSecurityHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#E53734",
      marginBottom: 20
    },
    contactsSecurityInputField: {
      height: 56,
      width: 325,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    contactsSecurityInput: {
      flexDirection: "row",
      gap: 8,
    },
    regularText: {
      fontSize: 16,
      fontWeight: "regular",
      fontFamily: "Inter",
      color: "#171111"
    },
    uploadContainer: {
      gap: 12,
      marginBottom: 40
    },
    uploadPhotoCard: {
      justifyContent: "center",
      alignItems: "center",
      width: 320,
      height: 180,
      backgroundColor: "#f58987",
      borderColor: "#E53734",
      borderStyle: "dashed",
      borderRadius: 12,
      borderWidth: 2
    },
    servicesTermsContainer: {
      flexDirection: "row",
      gap: 8,
    },
    servicesTermsCheckbox: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 4,
      marginTop: 3,
      padding: 5
    },
    servicesTermsText: {
      fontSize: 14,
      fontWeight: "regular",
      color: "#171111",
      maxWidth: 280,
      textAlign: "justify"
    },
    createAccountButton: {
      backgroundColor: "#E53734",
      borderRadius: 12,
      width: 320,
      height: 56,
      marginTop: 24,
      marginBottom: 24
    },
    createAccountButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    }
})
export default styles