import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tile}>Welcome back</Text>

      {/* Nút điều hướng */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>View Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  tile: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
