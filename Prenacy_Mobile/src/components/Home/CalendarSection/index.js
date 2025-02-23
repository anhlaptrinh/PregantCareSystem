// src/components/CalendarSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarSection = () => {
  const dates = ["27", "28", "29", "30", "31", "1", "2"];

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.monthHeader}>
        <Text style={styles.monthText}>March 2022</Text>
      </View>
      <View style={styles.dateRow}>
        {dates.map((date, index) => (
          <View key={index} style={styles.dateItem}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  monthHeader: {
    alignItems: "center",
    marginBottom: 12,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#615EFC",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default CalendarSection;
