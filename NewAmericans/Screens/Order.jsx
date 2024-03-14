import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCategories } from '../components/Categories/FetchingCategories';

const categoryImages = {
  'View All': require('../assets/cart.png'),
  'Clothes': require('../assets/clothes.png'),
  'Toiletries': require('../assets/toiletries.png'),
  'Hair Supplies': require('../assets/hair.png'),
  'Cleaning Supplies': require('../assets/cleaning.png'),
  'Baby Supplies': require('../assets/baby.png'),
  'School Supplies': require('../assets/school.png'),
  'Food': require('../assets/food.png'),
  'Miscellaneous': require('../assets/other.png'),
};

const Item = ({ category }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductsOrder', { category});
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={categoryImages[category.category_name]} style={styles.itemImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{category.category_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Order = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
<ScrollView contentContainerStyle={[styles.container, styles.scrollViewContent]}>
  {categories.map((category, index) => (
    <Item key={index} category={category} />
  ))}
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between', // Add this to evenly distribute items horizontally
  },
  itemContainer: {
    width: '48%', // Adjust the width as needed to fit two items in a row
    aspectRatio: 1, // Ensure aspect ratio is 1:1
    padding: 10,
    marginBottom: 10, // Add some margin to separate the items
  },
  innerContainer: {
    borderWidth: 2,
    borderColor: '#F3D014',
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1, // Allow inner container to expand
  },
  imageContainer: {
    overflow: 'hidden',
    flex: 1, // Allow image to expand
  },
  itemImage: {
    width: '100%',
    height: '100%', // Adjust the height to fill the container
    marginTop: 5,
    resizeMode: 'contain',
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingBottom: 100, // Add padding to the bottom of the ScrollView
  },
});

export default Order;
