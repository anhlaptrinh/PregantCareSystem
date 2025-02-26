import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../../../screens/CalendarScreen";
import SymptomsScreen from "../../../screens/CalendarScreen/SymptomsScreen";

const Stack = createStackNavigator();

export default function CalendarTabs() {
  return (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
    </Stack.Navigator>
  );
}
