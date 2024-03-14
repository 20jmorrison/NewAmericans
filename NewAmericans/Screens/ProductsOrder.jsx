import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchProducts } from '../components/Products/ProductFetching';

const Item = ({ item }) => {

  return (
    <TouchableOpacity style={styles.itemContainer}>

      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.ProductName} &#40;{item.ProductQuantity}&#41;</Text>
        </View>
      </View>
    </TouchableOpacity>

  );
};

const ProductsOrder = ({ route }) => {
  const { categoryId } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products based on the categoryId
        const productsData = await fetchProducts(categoryId);
        setItems(productsData);
      } catch (error) {
        console.error('Error fetching productsData:', error);
      }
    };

    fetchData();
  }, [categoryId]); // Add categoryId to the dependency array so useEffect will run whenever categoryId changes

  return (
    <ScrollView contentContainerStyle={[styles.container, styles.scrollViewContent]}>
      {items.map(item => (
        <Item key={item.ProductID} item={item} />
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

export default ProductsOrder;
