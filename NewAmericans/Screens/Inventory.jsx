import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import { fetchItems } from '../components/Categories/FetchingItems';
import { fetchCategories } from '../components/Categories/FetchingCategories';
import { postNewProduct } from '../components/Products/PostingProduct';
import { putProduct } from '../components/Products/PuttingProduct';
import { deleteProduct } from '../components/Products/DeleteProduct';
import CameraComponent from '../components/Camera/Camera';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [newItemName, setNewItemName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editedProductName, setEditedProductName] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const items = await fetchItems();
        setInventory(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }; 

    fetchItemData();
  }, [refreshDataTrigger]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setAllCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleCamera = () => {
    setCameraModalVisible(true);
  };

  const handleAddItem = async () => {
    // Implement error checking for categories or option to add a new category
    const newCategoryID = getCategoryIDByName(newCategory);

    const newItem = {
      ProductName: newItemName,
      ProductQuantity: newQuantity,
      CategoryID: newCategoryID,
    };

    postNewProduct(newItem);
    const updatedInventory = await fetchItems();
    setInventory(updatedInventory);
    setAddModalVisible(false);
    setRefreshDataTrigger(t => !t);
    setNewItemName('');
    setNewQuantity('');
    setNewCategory('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.filterButtonText}>Add New Item</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Item</Text>
              <View style={styles.inputRow}>
                <Text style={styles.modalTitle}>Name: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNewItemName(text)}
                  placeholder="Product Name"
                  placeholderTextColor="#808080"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.modalTitle}>Quantity: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNewQuantity(text)}
                  placeholder="Quantity"
                  placeholderTextColor="#808080"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}> 
                <Text style={styles.modalTitle}>Category: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNewCategory(text)}
                  placeholder="Category"
                  placeholderTextColor="#808080"
                />
              </View>
              <TouchableOpacity
                style={[styles.filterButton, styles.halfButton]}
                onPress={handleCamera}
              >
                <Text style={styles.filterButtonText}>Take Picture</Text>
              </TouchableOpacity>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={[styles.saveButton, styles.buttonLeft, styles.halfButton]}
                  onPress={handleAddItem}
                >
                  <Text style={styles.saveButtonText}>Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.closeButton, styles.buttonRight, styles.halfButton]}
                  onPress={() => {
                    setEditedItem({ ProductName: '', ProductQuantity: '', CategoryID: '' });
                    setAddModalVisible(false);
                  }}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={cameraModalVisible}
          onRequestClose={() => setCameraModalVisible(false)}
        >
          <CameraComponent closeModal={() => setCameraModalVisible(false)} />
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    flex: 1,
    marginLeft: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfButton: {
    flex: 0.5,
    marginRight: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  buttonLeft: {
    marginRight: 'auto',
  },
  buttonRight: {
    marginLeft: 'auto',
  },  
  filterButton: {
    backgroundColor: '#F3D014',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: '80%',
    maxHeight: '80%',
  },
});

export default Inventory;
