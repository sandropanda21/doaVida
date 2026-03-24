import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f6f6",
  },
  container: {
    flex: 1,
    marginTop: 24
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e53734",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileBtn: {
    padding: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  liveBadge: {
    backgroundColor: "#fde8e8",
    color: "#e53734",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  cardImage: {
    height: 160,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
  },
  urgentBadge: {
    backgroundColor: "#e53734",
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  bloodText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  cardContent: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  infoText: {
    color: "#876464",
    fontSize: 14,
  },

  progressBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: "#555",
  },
  progressCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#e53734",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#e53734",
  },

  donateButton: {
    flexDirection: "row",
    backgroundColor: "#e53734",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  donateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  bottomBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  mapButton: {
    backgroundColor: "#e53734",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mapIconBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
  },
  mapTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  mapSubtitle: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },
});