import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Image
} from "react-native";
import Header from "../../components/Home/Header";
import { FontAwesome } from "@expo/vector-icons";
import { API_CONFIG } from "../../config/api";

const ArticleCard = ({ article }) => (
  <TouchableOpacity 
    style={styles.articleCard}
    onPress={() => console.log('Article pressed:', article.id)}
  >
    <Image 
      source={{ uri: article.thumbnail }}
      style={styles.articleImage}
      defaultSource={require('../../assets/images/article-placeholder.png')}
    />
    <View style={styles.articleContent}>
      <Text style={styles.articleTitle} numberOfLines={2}>
        {article.title}
      </Text>
      <Text style={styles.articlePreview} numberOfLines={3}>
        {article.content}
      </Text>
      <Text style={styles.articleDate}>
        {article.createdAt || 'No date'}
      </Text>
    </View>
  </TouchableOpacity>
);

const CommunityItem = ({ community }) => (
  <TouchableOpacity 
    style={styles.communityItem}
    onPress={() => console.log('Community pressed:', community.id)}
  >
    <FontAwesome 
      name={community.icon || "users"} 
      size={20} 
      style={styles.communityIcon} 
    />
    <View style={styles.communityInfo}>
      <Text style={styles.communityName}>{community.name}</Text>
      <Text style={styles.communityMembers}>
        {community.memberCount || 0} members
      </Text>
      <Text style={styles.communityDescription} numberOfLines={2}>
        {community.description || 'No description available'}
      </Text>
    </View>
    <FontAwesome name="angle-right" size={20} color="#999" />
  </TouchableOpacity>
);

function CommunityScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    articles: [],
    groups: []
  });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('🔍 Fetching community data...');
      
      // Add timeout to fetch calls
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
  
      const [articlesRes, groupsRes] = await Promise.all([
        fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.ARTICLES}`,
          { signal: controller.signal }
        ),
        fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GROUPS.ALL}`,
          { signal: controller.signal }
        )
      ]);
  
      clearTimeout(timeout);
  
      console.log('📡 Response Status:', {
        articles: articlesRes.status,
        groups: groupsRes.status
      });
  
      // Check each response individually
      if (!articlesRes.ok) {
        throw new Error(`Articles API error: ${articlesRes.status}`);
      }
      if (!groupsRes.ok) {
        throw new Error(`Groups API error: ${groupsRes.status}`);
      }
  
      // Parse responses
      let articles, groups;
      try {
        [articles, groups] = await Promise.all([
          articlesRes.json(),
          groupsRes.json()
        ]);
      } catch (parseError) {
        console.error('❌ Parse Error:', parseError);
        throw new Error('Failed to parse API response');
      }
  
      // Validate data structure
      if (!Array.isArray(articles) || !Array.isArray(groups)) {
        throw new Error('Invalid data format received from API');
      }
  
      console.log('✅ Fetched:', {
        articles: articles.length,
        groups: groups.length
      });
      
      setData({ articles, groups });
      setError(null);
  
    } catch (error) {
      console.error('❌ Error:', error);
      
      let errorMessage = 'Failed to load community data';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('API error')) {
        errorMessage = error.message;
      }
  
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleSearch = () => {
    console.log('🔍 Search pressed');
    // TODO: Implement search functionality
  };

  const handleFilter = () => {
    console.log('🔧 Filter pressed');
    // TODO: Implement filter functionality
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#615EFC" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header 
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <Text style={styles.screenTitle}>Community</Text>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Articles</Text>
            <FlatList
              data={data.articles}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ArticleCard article={item} />}
              contentContainerStyle={styles.articlesList}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No articles available</Text>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Join a Community</Text>
            {data.groups.length > 0 ? (
              data.groups.map((group) => (
                <CommunityItem key={group.id} community={group} />
              ))
            ) : (
              <Text style={styles.emptyText}>No communities available</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff"
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    padding: 15
  },
  screenTitle: { 
    fontSize: 28, 
    fontWeight: "600", 
    textAlign: "center", 
    marginVertical: 15 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginBottom: 15,
    color: "#333"
  },
  articleCard: { 
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  articleImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover'
  },
  articleContent: {
    padding: 12
  },
  articleTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8,
    color: "#333"
  },
  articlePreview: { 
    fontSize: 14, 
    color: "#666",
    marginBottom: 8 
  },
  articleDate: {
    fontSize: 12,
    color: "#999"
  },
  articlesList: {
    paddingVertical: 10
  },
  communityItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  communityIcon: { 
    marginRight: 15, 
    color: "#615EFC",
    width: 24
  },
  communityInfo: {
    flex: 1
  },
  communityName: { 
    fontSize: 16, 
    fontWeight: "500",
    marginBottom: 4,
    color: "#333"
  },
  communityMembers: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4
  },
  communityDescription: {
    fontSize: 13,
    color: "#666"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 15,
    fontSize: 14,
    fontStyle: 'italic'
  }
});

export default CommunityScreen;