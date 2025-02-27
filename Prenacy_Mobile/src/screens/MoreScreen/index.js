import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Home/Header";

export default function MoreScreen() {
  const [babyName, setBabyName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.screenTitle}>More</Text>
      
      {/* Pregnancy Section */}
      <View style={styles.childrenContainer}>
        <Text style={styles.sectionTitle}>My Pregnancy</Text>
        <View style={styles.childCard}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.childImage}
          />
          <Text style={styles.caption}>Baby's Name</Text>
          <TextInput
            style={styles.input}
            value={babyName}
            placeholder="Enter baby's name"
            onChangeText={setBabyName}
          />
          <Text style={styles.caption}>Due Date</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.leftAlign]} value={dueDate} placeholder="Select due date" editable={false} />
            <Ionicons name="calendar-outline" size={24} color="black" />
          </View>
          <Text style={styles.caption}>Baby's Gender</Text>
          <TouchableOpacity onPress={() => setShowGenderPicker(true)} style={styles.inputRow}>
            <Text>{gender}</Text>
            <Ionicons name="chevron-down-outline" size={24} color="black" />
          </TouchableOpacity>
          <Modal
            visible={showGenderPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowGenderPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => { setGender("Boy"); setShowGenderPicker(false); }}>
                  <Text style={styles.modalItem}>Boy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setGender("Girl"); setShowGenderPicker(false); }}>
                  <Text style={styles.modalItem}>Girl</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setGender("Other"); setShowGenderPicker(false); }}>
                  <Text style={styles.modalItem}>I don't know yet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  screenTitle: { fontSize: 22, fontWeight: "600", textAlign: "center", marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  childrenContainer: { padding: 20, alignItems: "center" },
  childCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, width: "90%" },
  childImage: { width: 60, height: 60, alignSelf: "center", marginBottom: 10 },
  caption: { fontSize: 14, fontWeight: "bold", marginBottom: 5, textAlign: "left" },
  input: { borderWidth: 1, borderColor: "#EAEAEA", borderRadius: 5, padding: 10, fontSize: 16, marginBottom: 10, backgroundColor: "#F8F8F8" },
  leftAlign: { textAlign: "left" },
  inputRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#EAEAEA", borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#F8F8F8" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  modalItem: { fontSize: 18, padding: 10, textAlign: "center", width: "100%" },
  saveButton: { backgroundColor: "#615EFC", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" }
});
