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
    headerInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
      marginBottom: 4
    },
    hospitalName: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#171111",
      width: 250,
    },
    caseLocation: {
      fontSize: 14,
      fontWeight: "medium",
      color: "#876464",
      width: 250
    },
    bloodGroupContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: 75,
      height: 70,
      borderRadius: 12,
      backgroundColor: "#E53734",
      padding: 12
    },
    bloodGroupLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#fff"
    },
    bloodGroupValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
      marginTop: 4
    },
    localInfoTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#171111",
      marginTop: 24,
      marginBottom: 16
    },
    localInfoContainer: {
      width: 330,
      height: 150,
      borderRadius: 12,
      backgroundColor: "#fff",
      padding: 16,
      gap: 16
    },
    localInfoSubtitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#171111",
    },
    localInfoRelative: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#171111",
    },
    confirmAvailabilityButton: {
      backgroundColor: "#E53734",
      borderRadius: 12,
      width: 320,
      height: 56,
      marginTop: 24,
    },
    confirmAvailabilityButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    },
    callNowButton: {
      backgroundColor: "#fff",
      borderRadius: 12,
      borderColor: "#E53734",
      borderWidth: 1,
      width: 320,
      height: 56,
      marginTop: 12,
      marginBottom: 60
    },
    callNowButtonText: {
      color: "#E53734",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 56
    },
})
export default styles