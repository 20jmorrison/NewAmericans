import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ProductsOrder = () => {
  const route = useRoute();
  const { categoryId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Products Order Screen</Text>
      <Text>Category ID: {categoryId}</Text> {/* Displaying the received category ID */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsOrder;
