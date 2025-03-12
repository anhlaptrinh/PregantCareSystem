import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";

const tools = [
  {
    label: "Due date Calculator",
    icon: require("../../assets/images/due-date.png"),
    backgroundColor: "#F8D7DA",
  },
  {
    label: "Ovulation Calculator",
    icon: require("../../assets/images/ovulation.png"),
    backgroundColor: "#FFF3CD",
  },
  {
    label: "Growth tracker chart",
    icon: require("../../assets/images/growth-tracker.png"),
    backgroundColor: "#D1ECF1",
  },
];

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 40; // Giảm đi padding hoặc margin nếu cần

export default function ToolScreen() {
  const renderToolItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && styles.cardPressed,
        ]}
      >
        <View
          style={[styles.toolItem, { backgroundColor: item.backgroundColor }]}
        >
          <Image
            source={item.icon}
            style={styles.toolIcon}
            resizeMode="contain"
          />
          <Text style={styles.toolLabel}>{item.label}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your tool</Text>
      <FlatList
        data={tools}
        renderItem={renderToolItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1} // Mỗi dòng chỉ có 1 item
        contentContainerStyle={styles.toolContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 20,
  },
  toolContainer: {
    alignItems: "center",
  },
  toolItem: {
    width: 300,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    // Shadow cho iOS
    overflow: "hidden",
    shadowColor: "#615EFC",
    shadowOpacity: 0.2,
    shadowOffset: { width: -10, height: 2 },
    shadowRadius: 8,
    // Elevation cho Android
    elevation: 6,
  },
  toolIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  toolLabel: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 20,
  },
  cardPressed: {
    borderColor: "#615EFC",
    borderWidth: 2,
    shadowColor: "transparent",
  },
});
