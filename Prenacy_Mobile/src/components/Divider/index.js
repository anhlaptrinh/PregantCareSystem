import React from "react";
import { StyleSheet, View } from "react-native";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
