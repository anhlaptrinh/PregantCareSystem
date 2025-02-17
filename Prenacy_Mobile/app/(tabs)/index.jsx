import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import pregnantLadyImg from "@/assets/images/pregnant-belly.png"
import { Link } from 'expo-router'

const newsData = [
  {
    id: '1',
    title: '10 Early Signs of Pregnancy',
    description: 'Recognize the early symptoms of pregnancy and what to expect in your first few weeks.',
    imageUrl: 'https://via.placeholder.com/80',
  },
  {
    id: '2',
    title: 'Nutrition Tips for Expecting Moms',
    description: 'A healthy diet is crucial for you and your baby. Here are essential nutrition tips for pregnancy.',
    imageUrl: 'https://via.placeholder.com/80',
  },
  {
    id: '3',
    title: 'Stages of Baby Development',
    description: 'Understand how your baby grows and develops each week during your pregnancy.',
    imageUrl: 'https://via.placeholder.com/80',
  },
]

const NewsItem = ({ title, description, imageUrl }) => (
  <View style={styles.newsItem}>
    <Image source={{ uri: imageUrl }} style={styles.newsImage} />
    <View style={styles.newsTextContainer}>
      <Text style={styles.newsTitle}>{title}</Text>
      <Text style={styles.newsDescription}>{description}</Text>
    </View>
  </View>
)

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={pregnantLadyImg} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.title}>PregnantCare</Text>
          <Link href="/tools" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Tools</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bodyText}>Welcome to PregnantCare, your trusted pregnancy companion.</Text>

        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsItem title={item.title} description={item.description} imageUrl={item.imageUrl} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.newsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '30%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  button: {
    marginTop: 12,
    height: 50,
    width: 140,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bodyText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  newsList: {
    paddingBottom: 12,
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  newsTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})