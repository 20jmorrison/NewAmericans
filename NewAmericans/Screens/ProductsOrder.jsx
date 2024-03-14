import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchProducts } from '../components/Products/ProductFetching';

const ProductsOrder = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts(categoryId);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text>Products Order Screen</Text>
      <Text>Category ID: {categoryId}</Text>
      <Text>Products:</Text>
      <View>
        {products.map(product => (
          <Text key={product.id}>{product.name}</Text>
        ))}
      </View>
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
