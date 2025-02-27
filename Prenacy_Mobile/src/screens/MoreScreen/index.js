import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MoreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/article.jpg")} // Replace with your background image
          style={styles.headerBg}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Ionicons name="camera" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/app-icon.png")} // Replace with actual user image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.profileCamera}>
          <Ionicons name="camera" size={20} color="gray" />
        </TouchableOpacity>
        <Text style={styles.profileName}>Kathryn Murphy</Text>
        <Text style={styles.profileUsername}>@Kathrynm</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <MenuItem icon="create-outline" label="Edit Profile" />
        <MenuItem icon="bar-chart-outline" label="Chart and Report" />
        <MenuItem icon="heart-outline" label="Period and Ovulation" />
        <MenuItem icon="lock-closed-outline" label="Access Code" />
        <MenuItem icon="notifications-outline" label="Reminder" />
        <MenuItem icon="help-circle-outline" label="Help" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="gray" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Reusable menu item component
const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={22} color="black" />
    <Text style={styles.menuText}>{label}</Text>
    <Ionicons name="chevron-forward-outline" size={18} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "relative",
    alignItems: "center",
  },
  headerBg: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cameraIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  profileCamera: {
    position: "absolute",
    top: 60,
    right: 120,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileUsername: {
    fontSize: 14,
    color: "gray",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  logoutText: {
    fontSize: 16,
    color: "gray",
    marginLeft: 5,
  },
});

