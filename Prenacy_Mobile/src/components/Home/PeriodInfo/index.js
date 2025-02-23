// src/components/PeriodInfo.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PeriodInfo = () => {
  return (
    <View style={styles.periodInfoContainer}>
      <View style={styles.heartShape}>
        <Text style={styles.periodDayText}>Period:{"\n"}Day 10</Text>
        <Text style={styles.possiblePregnancyText}>
          Possible Pregnancy: 12,4%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  periodInfoContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heartShape: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#615EFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  periodDayText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  possiblePregnancyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default PeriodInfo;
