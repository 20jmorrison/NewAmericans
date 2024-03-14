import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchItems } from '../components/Categories/FetchingItems';

const ProductsOrder = ({ route }) => {
  const { categoryId } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const itemsData = await fetchItems();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching itemsData:', error);
      }
    };

    fetchData();
  }, []);

  // Now you have access to the categoryId passed from the previous screen
  return (
    <View>
      <Text>Category ID: {categoryId}</Text>
      {/* Render your content based on the categoryId */}
    </View>
  );
};

export default ProductsOrder;
