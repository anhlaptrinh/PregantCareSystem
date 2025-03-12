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

const packages = [
  {
    id: 1,
    name: "Gold",
    price: 100,
  },
  {
    id: 2,
    name: "Sliver",
    price: 200,
  },
];

const PackageCard = ({ packageItem }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.price} numberOfLines={1}>
              {packageItem.price} $
            </Text>
            <Text style={styles.name}>{packageItem.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function PackageList() {
  const renderItem = ({ item }) => <PackageCard packageItem={item} />;

  return (
    <View>
      <Text style={styles.title}>Membership packages</Text>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 15,
    paddingLeft: 15,
    textAlign: "center",
  },
  listContainer: {
    padding: 5,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#615EFC",
    width: 200,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 16,
    marginLeft: 1,
    // Shadow cho iOS
    shadowColor: "#615EFC",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Elevation cho Android
    elevation: 5,
  },
  info: {
    padding: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    fontSize: 14,
    marginTop: 4,
    color: "white",
  },
});
