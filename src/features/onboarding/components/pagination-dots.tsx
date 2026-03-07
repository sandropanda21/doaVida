import { View } from "react-native";
import { PaginationDotsProps } from "../types/interfaces";

export function PaginationDots({
  total,
  currentIndex,
}: PaginationDotsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginVertical: 24,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex ? "#FE724D" : "#E0E0E0",
          }}
        />
      ))}
    </View>
  );
}