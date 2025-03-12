// components/GrowthChartList.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GrowthChartList({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Growth Chart:</Text>
      <View style={styles.card}>
        <View style={styles.growthInfo}>
          <Text style={styles.growthText}>Height: {data.height} cm</Text>
          <Text style={styles.growthText}>Weight: {data.weight} kg</Text>
        </View>
        <TouchableOpacity style={styles.seeButton}>
          <Text style={styles.seeButtonText}>See Growth Chart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#615EFC",
    marginBottom: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
    paddingHorizontal: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "white",
  },
  card: {
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  growthInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  growthText: {
    fontSize: 16,
    color: "white",
  },
  seeButton: {
    backgroundColor: "#615EFC",
    borderColor: "white",
    borderWidth: 4,
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  seeButtonText: {
    color: "white",
    fontSize: 14,
  },
});
