// src/components/BlogList.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const BlogList = () => {
  // Cập nhật dữ liệu blog với title, content và name
  const blogs = [
    {
      id: "1",
      title: "5 Tips for your life",
      content:
        "Đây là nội dung tóm tắt của blog post 1. Bạn có thể thêm thông tin chi tiết ở đây.",
      name: "John",
    },
    {
      id: "2",
      title: "The Ultimate Guide to Shopping Spring",
      content:
        "Hướng dẫn chi tiết về mua sắm mùa xuân với nhiều mẹo và kinh nghiệm.",
      name: "Bob",
    },
    {
      id: "3",
      title: "Shopping on Budget",
      content:
        "Cách mua sắm hiệu quả và tiết kiệm ngay cả khi ngân sách eo hẹp.",
      name: "Tom",
    },
    {
      id: "4",
      title: "Shopping on Budget",
      content:
        "Cách mua sắm hiệu quả và tiết kiệm ngay cả khi ngân sách eo hẹp.",
      name: "Harry",
    },
    {
      id: "5",
      title: "Shopping on Budget",
      content:
        "Cách mua sắm hiệu quả và tiết kiệm ngay cả khi ngân sách eo hẹp.",
      name: "Henry",
    },
  ];

  // Tính toán chiều rộng item để hiển thị 1 cột (hoặc điều chỉnh theo nhu cầu)
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 60) / 1;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { width: itemWidth }]}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Posts in My Groups</Text>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default BlogList;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  card: {
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginRight: 12,
    marginBottom: 20,
    // Tạo hiệu ứng đổ bóng cho card
    shadowColor: "#615EFC",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
    elevation: 6,
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
    color: "#999",
    marginBottom: 8,
  },
});
