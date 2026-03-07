import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LocalStorageService } from "../lib/storage";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrapApplication(): Promise<void> {
      try {
        const onboardingSeen = await LocalStorageService.getItem("onboardingSeen");

        if (onboardingSeen === "true") {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(onboarding)");
        }
      } finally {
        setIsLoading(false);
      }
    }

    bootstrapApplication();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#FE724D" />
      </View>
    );
  }

  return null;
}