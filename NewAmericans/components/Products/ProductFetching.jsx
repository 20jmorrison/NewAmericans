import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
//import { fetchProducts } from '../path/to/fetchProducts'; 

const EditItemPage = ({ route }) => {
  const { productId } = route.params; 

  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  useEffect(() => {
    // Fetch the product details when the component mounts
    const getProductDetails = async () => {
      try {
        const product = await fetchProducts(productId);
        setProductName(product.productName); // Assuming the API returns a field called 'productName'
        setProductQuantity(product.productQuantity); // Assuming the API returns a field called 'productQuantity'
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductDetails();
  }, [productId]); // Fetch product details whenever productId changes

  const handleSaveChanges = () => {
    // Implement logic to save changes to the product
    // This could involve sending a request to the server to update the product details
    // You can use the productName and productQuantity state variables here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Product Quantity:</Text>
      <TextInput
        style={styles.input}
        value={productQuantity}
        onChangeText={setProductQuantity}
        placeholder="Enter product quantity"
        keyboardType="numeric"
      />

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditItemPage;
