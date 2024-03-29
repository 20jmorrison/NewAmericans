import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts } from '../components/Products/ProductFetching';
import { useCart } from '../components/Cart/CartProvider';
import CartScreen from './CartScreen';

const Item = ({ item }) => {
  const { addToCart } = useCart(); 
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    console.log(item)
    addToCart(item);
    setShowModal(false); // Close the modal after adding to cart
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => setShowModal(true)}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.ProductName}</Text>
          <Text style={styles.quantityText}>Quantity: {item.ProductQuantity}</Text>
        </View>
      </View>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Add this item to cart?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddToCart}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const ProductsOrder = ({ route }) => {
  const navigation = useNavigation();
  const { categoryId } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

      <Button onPress={() => navigation.navigate('CartScreen')} title="Go to Cart Screen" />

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
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    aspectRatio: 1,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F3D014',
    borderRadius: 8,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
  },
  quantityText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 'auto',
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#F3D014',
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ProductsOrder;
