import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function CustomPressableCard({ children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.cardPressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderColor: "white",
  },
  cardPressed: {
    borderColor: "#615EFC",
    borderWidth: 2,
    shadowColor: "transparent",
  },
});
