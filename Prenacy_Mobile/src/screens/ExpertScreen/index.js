import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Home/Header";

const hotArticles = [
  { id: "1", title: "5 Essential Tips for a Healthy Pregnancy", image: require("../../assets/images/article.jpg") },
  { id: "2", title: "The Ultimate Guide to Prenatal Nutrition", image: require("../../assets/images/article.jpg") },
  { id: "3", title: "Preparing for Labor: What You Need to Know", image: require("../../assets/images/article.jpg") },
];

const recentArticles = [
  { id: "4", title: "How to Manage Pregnancy Symptoms Effectively", image: require("../../assets/images/article.jpg") },
  { id: "5", title: "The Importance of Exercise During Pregnancy", image: require("../../assets/images/article.jpg") },
  { id: "6", title: "Creating a Birth Plan: A Step-by-Step Guide", image: require("../../assets/images/article.jpg") },
];

const ArticleCard = ({ article }) => (
  <View style={styles.articleCard}>
    <Image source={article.image} style={styles.articleImage} />
    <Text style={styles.articleTitle}>{article.title}</Text>
  </View>
);

export default function ExpertScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.screenTitle}>Expert Advice</Text>

      {/* Hot Articles */}
      <Text style={styles.sectionTitle}>Hot</Text>
      <FlatList
        data={hotArticles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />

      {/* Recent Articles */}
      <Text style={styles.sectionTitle}>Recent</Text>
      <FlatList
        data={recentArticles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  screenTitle: { fontSize: 22, fontWeight: "600", textAlign: "center", marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  articleCard: { width: 150, marginRight: 10 },
  articleImage: { width: "100%", height: 100, borderRadius: 10 },
  articleTitle: { fontSize: 14, fontWeight: "500", marginTop: 5, textAlign: "center" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});
