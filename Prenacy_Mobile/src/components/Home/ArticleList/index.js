import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Alert 
} from "react-native";
import CustomPressableCard from "../../CustomPressableCard";
import { API_CONFIG } from "../../../config/api";

const ArticleCard = ({ article }) => {
  return (
    <View style={styles.cardContainer}>
      <CustomPressableCard onPress={() => console.log('Article pressed:', article.id)}>
        <View style={styles.card}>
          <Image
            source={{ uri: article.thumbnail }}
            style={styles.image}
            resizeMode="cover"
            defaultSource={require('../../../assets/images/article-placeholder.png')}
          />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
            <Text style={styles.date}>{article.createdAt || 'No date'}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {article.content}
            </Text>
          </View>
        </View>
      </CustomPressableCard>
    </View>
  );
};

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchArticles = async () => {
    try {
      console.log('📚 Fetching articles...');
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.ARTICLES}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ Fetched ${data.length} articles`);
      setArticles(data);
      setError(null);
    } catch (error) {
      console.error('❌ Error fetching articles:', error);
      setError('Failed to load articles');
      Alert.alert('Error', 'Failed to load articles');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#615EFC" />
      </View>
    );
  }

  if (error || !articles.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error || 'No articles available'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Latest Articles</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ArticleCard article={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    height: 347,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
    marginBottom: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default ArticleList;