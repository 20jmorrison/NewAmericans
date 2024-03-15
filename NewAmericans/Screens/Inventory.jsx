import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Pants', quantity: 10, category: 'Clothes' },
    { id: 2, item: 'Sweatshirt', quantity: 5, category: 'Clothes' },
    { id: 3, item: 'Socks', quantity: 8, category: 'Clothes' },
    { id: 4, item: 'Pasta', quantity: 15, category: 'Food' },
    { id: 5, item: 'Cereal', quantity: 5, category: 'Food' },
    { id: 6, item: 'Ramen', quantity: 4, category: 'Food' },
    { id: 7, item: 'Paper', quantity: 9, category: 'School Supplies' },
    { id: 8, item: 'Backpack', quantity: 3, category: 'School Supplies' },
    { id: 9, item: 'Pens', quantity: 20, category: 'School Supplies' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null);

  const handleEdit = (id) => {
    // Implement edit functionality here
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => filterByCategory(item)}>
      <Text style={styles.categoryItem}>{item}</Text>
    </TouchableOpacity>
  );

  const categories = ['All', ...Array.from(new Set(inventory.map(item => item.category)))];

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortModalVisible(false);
  };

  const sortInventory = () => {
    let sortedInventory = [...inventory];
    if (sortCriteria === 'alphabetical') {
      sortedInventory.sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortCriteria === 'quantityLowToHigh') {
      sortedInventory.sort((a, b) => a.quantity - b.quantity);
    } else if (sortCriteria === 'quantityHighToLow') {
      sortedInventory.sort((a, b) => b.quantity - a.quantity);
    }
    return sortedInventory;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setCategoryModalVisible(true)}>
        <Text style={styles.filterButtonText}>Filter by Category</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setCategoryModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
        <Text style={styles.sortButtonText}>Sort</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleSort('alphabetical')} style={styles.sortOption}>
              <Text style={styles.sortOptionText}>Sort Alphabetically</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('quantityLowToHigh')} style={styles.sortOption}>
              <Text style={styles.sortOptionText}>Sort by Quantity (Low to High)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('quantityHighToLow')} style={styles.sortOption}>
              <Text style={styles.sortOptionText}>Sort by Quantity (High to Low)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {sortInventory().map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.leftContent}>
              <Text style={styles.item}>{item.item}</Text>
            </View>
            <Text style={styles.quantity}>QT: {item.quantity}</Text>
            <TouchableOpacity style={styles.editButtonContainer} onPress={() => handleEdit(item.id)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 1,
  },
  filterButton: {
    backgroundColor: 'lightblue',
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
  categoryItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sortOptionText: {
    fontSize: 16,
  },
  card: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
  },
  editButtonContainer: {
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Inventory;
