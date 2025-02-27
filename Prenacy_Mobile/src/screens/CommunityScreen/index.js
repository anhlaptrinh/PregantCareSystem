import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Home/Header";
import { FontAwesome } from "@expo/vector-icons";

const articles = [
  { id: "1", title: "Benefits of Pregnancy Yoga", preview: "Discover how yoga can help during pregnancy..." },
  { id: "2", title: "Mental Health During Pregnancy", preview: "Tips for managing stress and anxiety..." },
  { id: "3", title: "Choosing the Right Prenatal Vitamins", preview: "A guide to essential nutrients for you and your baby..." },
];

const communities = [
  { id: "1", name: "Pregnancy Support Group", icon: "users" },
  { id: "2", name: "New Moms Network", icon: "child" },
  { id: "3", name: "Healthy Eating for Moms", icon: "leaf" },
];

const ArticleCard = ({ article }) => (
  <View style={styles.articleCard}>
    <Text style={styles.articleTitle}>{article.title}</Text>
    <Text style={styles.articlePreview}>{article.preview}</Text>
  </View>
);

const CommunityItem = ({ community }) => (
  <View style={styles.communityItem}>
    <FontAwesome name={community.icon} size={20} style={styles.communityIcon} />
    <Text style={styles.communityName}>{community.name}</Text>
  </View>
);

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.screenTitle}>Community</Text>

      {/* Articles */}
      <Text style={styles.sectionTitle}>Trending Articles</Text>
      <FlatList
        data={articles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />

      {/* Communities */}
      <Text style={styles.sectionTitle}>Join a Community</Text>
      {communities.map((community) => (
        <CommunityItem key={community.id} community={community} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  screenTitle: { fontSize: 22, fontWeight: "600", textAlign: "center", marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  articleCard: { width: 200, padding: 10, backgroundColor: "#f5f5f5", borderRadius: 10, marginRight: 10 },
  articleTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  articlePreview: { fontSize: 12, color: "#666" },
  communityItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  communityIcon: { marginRight: 10, color: "#615EFC" },
  communityName: { fontSize: 16, fontWeight: "500" },
});
