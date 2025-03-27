import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import CustomPressableCard from "../../CustomPressableCard";

const ExpertCard = ({ expert }) => {
  return (
    <View style={styles.cardContainer}>
      <CustomPressableCard onPress={() => console.log('Expert pressed:', expert.id)}>
        <View style={styles.card}>
          <Image 
            source={{ uri: expert.avatar }}
            style={styles.expertImage}
            defaultSource={require('../../../assets/images/expert-placeholder.png')}
          />
          <Text style={styles.expertName}>{expert.name}</Text>
          <Text style={styles.specialty}>{expert.specialty}</Text>
        </View>
      </CustomPressableCard>
    </View>
  );
};

const ExpertList = ({ data = [] }) => {
  console.log('ExpertList received data:', data); // Debug log

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No experts available</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Our Experts</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpertCard expert={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 20,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  listTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  cardContainer: {
    backgroundColor: "#fff",
    width: 150,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#615EFC",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    justifyContent: "center", 
    alignItems: "center", 
    padding: 15
  },
  expertImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
    resizeMode: "cover",
  },
  expertName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  specialty: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  }
});

export default ExpertList;