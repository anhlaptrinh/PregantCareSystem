// src/components/Header.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = () => {
  const [user, setUser] = useState({
    name: "Leslie Alexander",
  });
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerWelcomeText}>Welcome</Text>
        <Text style={styles.headerNameText}>{user.name}</Text>
      </View>
      <TouchableOpacity style={styles.notificationIcon}>
        <Icon name="notifications-none" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  headerWelcomeText: {
    fontSize: 16,
    color: "#9A9A9A",
  },
  headerNameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    color: "#333",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});

export default Header;
