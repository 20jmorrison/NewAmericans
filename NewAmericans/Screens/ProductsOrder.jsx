import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductsOrder = ({ route }) => {
  const { categoryId } = route.params;

  // Now you have access to the categoryId passed from the previous screen
  return (
    <View>
      <Text>Category ID: {categoryId}</Text>
      {/* Render your content based on the categoryId */}
    </View>
  );
};

export default ProductsOrder;
