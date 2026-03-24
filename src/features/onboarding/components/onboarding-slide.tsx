import { View, Text, Image } from "react-native";
import type { OnboardingItems } from "../constants/interfaces";

export function OnboardingSlide({
  title,
  description,
  image,
}: OnboardingItems) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        justifyContent: "center",
      }}
    >
      <Image
        source={image}
        style={{
          width: 240,
          height: 240,
          marginBottom: 40,
          resizeMode: "contain",
        }}
      />

      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          textAlign: "center",
          opacity: 0.7,
        }}
      >
        {description}
      </Text>
    </View>
  );
}