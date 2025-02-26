import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";

export default function AddEventButton({ navigation }) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (item) => {
    console.log(`${item} selected`);
    if (item === "growth-tracker") {
    } else if (item === "symptoms") {
      navigation.navigate("Symptoms");
    }
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="contained"
            onPress={openMenu}
            style={styles.button}
            labelStyle={styles.textButton}
          >
            + Add new event
          </Button>
        }
      >
        <Menu.Item
          onPress={() => handleSelect("growth-tracker")}
          title="Growth tracker"
        />
        <Divider />
        <Menu.Item onPress={() => handleSelect("symptoms")} title="Symptoms" />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#615EFC",
    borderRadius: 20,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    width: 150,
  },
});
