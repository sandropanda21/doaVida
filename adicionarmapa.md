##expo install react-native-webview
##src/features/map/components/OSMMap.tsx
* import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function OSMMap() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>
        body { margin: 0; }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([-8.8383, 13.2344], 13); // Luanda

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([-8.8383, 13.2344]).addTo(map);
        marker.bindPopup("Hospital Geral de Luanda").openPopup();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});*
*import React from "react";
import { View } from "react-native";
import OSMMap from "../components/OSMMap";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <OSMMap />
    </View>
  );
}*