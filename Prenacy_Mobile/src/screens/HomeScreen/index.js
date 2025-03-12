// src/screens/PeriodTrackingScreen.js
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Header from "../../components/Home/Header";
import PeriodInfo from "../../components/Home/PeriodInfo";
import CalendarSection from "../../components/Home/CalendarSection";
import BlogList from "../../components/Home/BlogList";
import ExpertList from "../../components/Home/ExpertList";
import PackageList from "../../components/Home/PackageList";
import ArticleList from "../../components/Home/ArticleList";

// Import các component con

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Header />
        <PeriodInfo />
        <CalendarSection />
        <BlogList />
        <ExpertList />
        <ArticleList />
        <PackageList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomCardContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});
