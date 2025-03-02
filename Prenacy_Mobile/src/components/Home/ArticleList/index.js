import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import CustomPressableCard from "../../CustomPressableCard";

const articles = [
  {
    id: 1,
    image: require("../../../assets/images/article.jpg"),
    title: "Article 1",
    description:
      "Write something about article 1 mething aboutcewqecdưqdwqdưqdwqdqwdqwdqwdqwdqwdưqdwqwqecwcewqecwqcưqdcqwartdưqdwqdwqdưqicle 1 mething about article 1",
    datePublish: "2025-02-23",
  },
  {
    id: 2,
    image: require("../../../assets/images/article.jpg"),
    title: "Article 1",
    description: "Write something about article 2",
    datePublish: "2025-02-22",
  },
];

const ArticleCard = ({ article }) => {
  return (
    <View style={styles.cardContainer}>
      <CustomPressableCard>
        <View style={styles.card}>
          {/* Phần hình ảnh */}
          <Image
            source={article.image}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Phần thông tin */}
          <View style={styles.info}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.date}>{article.datePublish}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {article.description}
            </Text>
          </View>
        </View>
      </CustomPressableCard>
    </View>
  );
};

export default function ArticleList() {
  const renderItem = ({ item }) => <ArticleCard article={item} />;

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      horizontal
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#fff",
    maxWidth: 300,
    width: 300,
    height: 350,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 16,

    // Shadow cho iOS
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // Elevation cho Android
    elevation: 5,
  },
  card: {
    height: 347,
  },
  image: {
    width: "100%",
    height: 200,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
});
