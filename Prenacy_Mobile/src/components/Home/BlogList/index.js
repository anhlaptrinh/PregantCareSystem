import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";

const BlogList = ({ data = [] }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 60) / 1;

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No posts available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { width: itemWidth }]}
      onPress={() => console.log('Blog pressed:', item.id)}
    >
      {item.thumbnail && (
        <Image 
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          defaultSource={require('../../../assets/images/blog-placeholder.png')}
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.name}>{item.author || 'Unknown Author'}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Posts in My Groups</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  card: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: "#615EFC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    color: "#615EFC",
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
  }
});

export default BlogList;