import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Text, Chip, TextInput, Button } from "react-native-paper";

const SYMPTOMS_DATA = [
  { id: 1, name: "Back pain", icon: "human" },
  { id: 2, name: "Bloating", icon: "food" },
  { id: 3, name: "Sore breasts", icon: "heart" },
  { id: 4, name: "Contractions", icon: "alert" },
  { id: 5, name: "Constipation", icon: "emoticon-poop" },
  { id: 6, name: "Cramping", icon: "flash" },
  { id: 7, name: "Diarrhea", icon: "water" },
  { id: 8, name: "Dizziness", icon: "rotate-3d-variant" },
  { id: 9, name: "Exhaustion", icon: "sleep" },
  { id: 10, name: "Food aversions", icon: "food-off" },
  { id: 11, name: "Food cravings", icon: "food-apple" },
  { id: 12, name: "Frequent urination", icon: "cup-water" },
  { id: 13, name: "Headaches", icon: "head" },
  { id: 14, name: "Heartburn", icon: "fire" },
  { id: 15, name: "Itching", icon: "hand-back-left" },
  { id: 16, name: "Insomnia", icon: "weather-night" },
  { id: 17, name: "Morning sickness", icon: "weather-sunset-up" },
  { id: 18, name: "Pelvic pain", icon: "circle-outline" },
  { id: 19, name: "Spotting", icon: "blood-bag" },
  { id: 20, name: "Stuffy nose", icon: "emoticon-sick-outline" },
  { id: 21, name: "Swelling", icon: "emoticon-sad" },
  { id: 22, name: "Discharge", icon: "alert-box-outline" },
  { id: 23, name: "Other", icon: "dots-horizontal" },
];

export default function SymptomsScreen({ navigation }) {
  // Lưu trạng thái các triệu chứng được chọn
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  // Lưu nội dung mô tả chi tiết
  const [description, setDescription] = useState("");

  // Hàm xử lý khi bấm vào một Chip
  const handleSelectSymptom = (id) => {
    setSelectedSymptoms((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Nếu đã chọn rồi thì bỏ chọn
        return prevSelected.filter((symptomId) => symptomId !== id);
      } else {
        // Nếu chưa chọn thì thêm vào
        return [...prevSelected, id];
      }
    });
  };

  // Hàm xử lý khi bấm Save
  const handleSave = () => {
    console.log("Triệu chứng đã chọn:", selectedSymptoms);
    console.log("Mô tả chi tiết:", description);
    navigation.goBack();
    // ...Xử lý logic tùy ý, ví dụ gọi API
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        What are you feeling?
      </Text>

      {/* Khối các triệu chứng */}
      <View style={styles.symptomsContainer}>
        {SYMPTOMS_DATA.map((item) => {
          const isSelected = selectedSymptoms.includes(item.id);

          return (
            <Chip
              key={item.id}
              icon={item.icon}
              // Sử dụng 'selected' và style khác khi đã chọn
              selected={isSelected}
              style={[styles.chip, isSelected && styles.chipSelected]}
              textStyle={isSelected && styles.chipTextSelected}
              onPress={() => handleSelectSymptom(item.id)}
            >
              {item.name}
            </Chip>
          );
        })}
      </View>

      {/* TextInput để ghi mô tả */}
      <TextInput
        mode="outlined"
        label="Write down what's going on for you..."
        value={description}
        onChangeText={setDescription}
        style={styles.textInput}
        activeOutlineColor="#615EFC"
        multiline
      />

      {/* Nút Save */}
      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chip: {
    marginBottom: 8,
    marginRight: 4,
    backgroundColor: "#f2f2f2",
  },
  chipSelected: {
    backgroundColor: "#615EFC",
  },
  chipTextSelected: {
    color: "#fff",
  },
  textInput: {
    backgroundColor: "white",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#615EFC",
    marginBottom: 8,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 8,
    marginBottom: 24,
  },
});
