// components/SymptomsList.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "../../Divider";

export default function SymptomsList({ data }) {
  return (
    <View>
      {data.map((item) => (
        <View key={item.id} style={styles.container}>
          <Text style={styles.sectionTitle}>Symptoms:</Text>
          <View style={styles.card}>
            <Text style={styles.text}>{item.name}</Text>
            <Divider />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#615EFC",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#615EFC",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  card: {
    paddingVertical: 10,
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 20,
  },
  description: {
    color: "#fff",
    marginHorizontal: 20,
  },
});
