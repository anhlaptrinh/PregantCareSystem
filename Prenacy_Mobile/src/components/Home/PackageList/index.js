import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomPressableCard from "../../CustomPressableCard";

const PackageCard = ({ packageItem }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => console.log('Package pressed:', packageItem.id)}>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.price} numberOfLines={1}>
              ${packageItem.price}
            </Text>
            <Text style={styles.name}>{packageItem.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {packageItem.description || 'No description available'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const PackageList = ({ data = [] }) => {
  console.log('PackageList received data:', data); // Debug log

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No packages available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => <PackageCard packageItem={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Packages</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    padding: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  cardContainer: {
    backgroundColor: "#615EFC",
    width: 200,
    minHeight: 150,
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 16,
    shadowColor: "#615EFC",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  card: {
    height: '100%',
  },
  info: {
    padding: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
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

export default PackageList;