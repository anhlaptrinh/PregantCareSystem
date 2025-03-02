// screens/CalendarScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import SymptomsList from "../../components/Calendar/SymptomsList";
import GrowthChartList from "../../components/Calendar/GrowthChartList";
import { Provider } from "react-native-paper";
import AddEventButton from "../../components/Calendar/AddEventButton";
import Divider from "../../components/Divider";

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const markedDates = {
    "2024-10-02": { marked: true, dotColor: "#4FC3F7" },
    "2022-03-15": { marked: true, dotColor: "#81C784" },
    "2022-03-16": { marked: true, dotColor: "#81C784" },
    "2022-03-17": { marked: true, dotColor: "#81C784" },
  };

  // Mock data cho Symptoms và Growth Chart
  const symptomsData = [
    { id: "1", name: "Headache", description: "Something about symptoms" },
    { id: "2", name: "Nausea", description: "Something about symptoms" },
  ];

  const growthChartData = { height: 150, weight: 45 };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelectedDate = (date) => {
    const parsedDate = new Date(date.dateString);
    setSelectedDate(parsedDate);
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Calendar</Text>
        <Calendar
          style={styles.calendar}
          markingType={"period"}
          markedDates={markedDates}
          onDayPress={(date) => {
            handleSelectedDate(date);
          }}
        />

        {/* Hiển thị ngày đã chọn */}
        <View style={styles.selectedDateContainer}>
          <View>
            <Text style={styles.left}>{selectedDate.getDate()}</Text>
          </View>
          <View>
            <Text style={styles.top}>{weekdays[selectedDate.getDay()]}</Text>
            <Text style={styles.bottom}>
              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
          </View>
        </View>

        <AddEventButton navigation={navigation} />
        <Divider />
        <SymptomsList data={symptomsData} />
        <GrowthChartList data={growthChartData} />
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },
  calendar: {
    margin: 10,
    borderRadius: 10,
  },
  selectedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  left: {
    fontSize: 32,
    marginRight: 10,
    fontWeight: "500",
  },
  top: {
    marginBottom: 2,
  },
  bottom: {
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
