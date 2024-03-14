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
    <ScrollView contentContainerStyle={styles.container}>
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
  },
  itemContainer: {
    width: '50%',
    padding: 10,
  },
  innerContainer: {
    borderWidth: 2,
    borderColor: '#F3D014',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 80,
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
});

export default Order;
