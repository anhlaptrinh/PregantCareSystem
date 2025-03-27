import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  View,
  ActivityIndicator,
  RefreshControl,
  Alert 
} from "react-native";
import Header from "../../components/Home/Header";
import PeriodInfo from "../../components/Home/PeriodInfo";
import CalendarSection from "../../components/Home/CalendarSection";
import BlogList from "../../components/Home/BlogList";
import ExpertList from "../../components/Home/ExpertList";
import PackageList from "../../components/Home/PackageList";
import ArticleList from "../../components/Home/ArticleList";

const BASE_URL = 'https://2baf-42-118-214-16.ngrok-free.app/api';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    posts: [],
    articles: [],
    experts: [],
    packages: []
  });

  const fetchAllData = async () => {
    try {
      const [postsRes, articlesRes, expertsRes, packagesRes] = await Promise.all([
        fetch(`${BASE_URL}/blogs/posts`),
        fetch(`${BASE_URL}/blogs/articles`),
        fetch(`${BASE_URL}/users/experts`),
        fetch(`${BASE_URL}/packages`)
      ]);

      const [posts, articles, experts, packages] = await Promise.all([
        postsRes.json(),
        articlesRes.json(),
        expertsRes.json(),
        packagesRes.json()
      ]);

      setData({ posts, articles, experts, packages });
      console.log('All data fetched successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllData().finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#615EFC" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={["#615EFC"]}
          />
        }
      >
        <Header />
        <PeriodInfo />
        <CalendarSection />
        <BlogList data={data.posts} />
        <ArticleList data={data.articles} />
        <ExpertList data={data.experts} />
        <PackageList data={data.packages} />
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});