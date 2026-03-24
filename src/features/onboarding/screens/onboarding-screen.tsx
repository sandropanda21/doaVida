import { useRef, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { router } from "expo-router";
import { Button } from "../../../components/button/Button";
import { onboardingSlides } from "../constants/onboarding-data";
import { OnboardingSlide } from "../components/onboarding-slide";
import { PaginationDots } from "../components/pagination-dots";
import { LocalStorageService } from "../../../lib/storage";

const { width } = Dimensions.get("window");

export function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListReference = useRef<FlatList>(null);

  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  const handleNextSlide = () => {
    const nextIndex = currentIndex + 1;

    flatListReference.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setCurrentIndex(nextIndex);
  };

  const handleCreateAccount = async () => {
    await LocalStorageService.setItem("onboardingSeen", "true");
    router.replace("/(auth)/register");
  };

  const handleLogin = async () => {
    await LocalStorageService.setItem("onboardingSeen", "true");
    router.replace("/(auth)/login");
  };

  const handleSkip = async () => {
    await LocalStorageService.setItem("onboardingSeen", "true");
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      
      {currentIndex === 1 && (
        <Button
          title="Pular"
          variant="ghost"
          onPress={handleSkip}
          style={{ alignSelf: "flex-end", margin: 16 }}
        />
      )}

      <FlatList
        ref={flatListReference}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingSlide {...item} />
          </View>
        )}
      />

      <PaginationDots
        total={onboardingSlides.length}
        currentIndex={currentIndex}
      />

      <View style={{ paddingHorizontal: 24, paddingBottom: 40, gap: 12 }}>
        
        {!isLastSlide && (
          <Button
            title="Continuar"
            onPress={handleNextSlide}
          />
        )}

        {isLastSlide && (
          <>
            <Button
              title="Criar conta"
              variant="primary"
              onPress={handleCreateAccount}
            />

            <Button
              title="Entrar"
              variant="outline"
              onPress={handleLogin}
            />
          </>
        )}

      </View>
    </View>
  );
}