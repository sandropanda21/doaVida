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
      marginTop: 24,
      marginBottom: 24
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#171111"
    },
    headerDescription: {
      fontSize: 16,
      fontWeight: "regular",
      color: "#6b6b6b",
      textAlign: "justify",
    },
    inputContainer: {
      gap: 12
    },
    input: {
      gap: 8
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "medium",
      color: "#171111"
    },
    inputField: {
      height: 56,
      width: 320,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
      backgroundColor: "#f1f1f1"
    }, 
    sendRequestButton: {
      backgroundColor: "#E53734",
      borderRadius: 12,
      width: 320,
      height: 56,
      marginTop: 24,
      marginBottom: 60
    },
    sendRequestButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    },
})
export default styles