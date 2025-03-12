import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import CustomPressableCard from "../../CustomPressableCard";

const ExpertsData = [
  {
    id: "1",
    name: "Dr. John",
    image: require("../../../assets/images/Expert1.jpg"),
  },
  {
    id: "2",
    name: "Dr. Jane",
    image: require("../../../assets/images/Expert1.jpg"),
  },
  {
    id: "3",
    name: "Dr. Alex",
    image: require("../../../assets/images/Expert1.jpg"),
  },
];

const ExpertCard = ({ expert }) => {
  return (
    <View style={styles.cardContainer}>
      <CustomPressableCard>
        <View style={styles.card}>
          <Image source={expert.image} style={styles.expertImage} />
          <Text style={styles.expertName}>{expert.name}</Text>
        </View>
      </CustomPressableCard>
    </View>
  );
};

export default function ExpertList() {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Our Experts</Text>
      <FlatList
        data={ExpertsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpertCard expert={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 15,
    paddingLeft: 10,
    textAlign: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    width: 120,
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
    // Shadow cho iOS
    overflow: "hidden",
    shadowColor: "#615EFC",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Elevation cho Android
    elevation: 6,
  },
  card: { justifyContent: "center", alignItems: "center", padding: 10 },
  expertImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 30,
    resizeMode: "cover",
  },
  expertName: {
    fontSize: 14,
    fontWeight: "500",
  },
});
