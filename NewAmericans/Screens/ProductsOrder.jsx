import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchProducts } from '../components/Products/ProductFetching';

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

  // Now you have access to the categoryId passed from the previous screen
  return (
    <View>
      <Text>Category ID: {categoryId}</Text>
      {/* Render your content based on the fetched products */}
      {items.map(item => (
        <Text key={item.ProductID}>{item.ProductName}</Text>
      ))}
    </View>
  );
};

export default ProductsOrder;
