// HomeTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import các screen của bạn
import HomeScreen from "../../screens/HomeScreen";
import CommunityScreen from "../../screens/CommunityScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import ExpertScreen from "../../screens/ExpertScreen";
import MoreScreen from "../../screens/MoreScreen";
import ToolScreen from "../../screens/ToolScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Community":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Calendar":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Expert":
              iconName = focused ? "medkit" : "medkit-outline";
              break;
            case "Tool":
              iconName = focused ? "construct" : "construct-outline";
              break;
            case "More":
              iconName = focused
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline";
              break;
            default:
              iconName = "help-circle-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Tuỳ chọn màu cho icon
        tabBarActiveTintColor: "#615EFC",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Expert" component={ExpertScreen} />
      <Tab.Screen name="Tool" component={ToolScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
