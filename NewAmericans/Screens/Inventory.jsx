import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import { fetchItems } from '../components/Categories/FetchingItems';
import { fetchCategories } from '../components/Categories/FetchingCategories';




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
  //const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
  //const [filteredCategories, setFilteredCategories] = useState([]);



  useEffect(() => {
    const fetchItemData = async () => {
      try {
        // Fetch all items
        const items = await fetchItems();
        setInventory(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItemData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await fetchCategories();
        setAllCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);



  const handleEdit = (item) => {
    setEditedItem(item);
    setEditModalVisible(true);
  };

  const handleSaveChanges = () => {
    // save edited item changes
    setEditModalVisible(false);
  };

  const handleAddItem = () => {
    // save new item
    setAddModalVisible(false);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };
  

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => filterByCategory(item.id)}>
      <Text style={styles.categoryItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const categories = [
    { name: 'All', id: 0 },
    ...allCategories.map(category => ({ name: category.category_name, id: category.CategoryID }))
  ];

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortModalVisible(false);
  };

  const sortInventory = () => {
    let filteredInventory = [...inventory];

    if (selectedCategory !== 'All' && selectedCategory !== 0) {
      filteredInventory = inventory.filter(item => item.CategoryID === selectedCategory);
    }
  
    let sortedInventory = [...filteredInventory];  
  
    if (sortCriteria === 'alphabetical') {
      sortedInventory.sort((a, b) => {
        const nameA = a.ProductName || ''; // Handle null or undefined values
        const nameB = b.ProductName || ''; // Handle null or undefined values
        return nameA.localeCompare(nameB);
      });
    } else if (sortCriteria === 'quantityLowToHigh') {
      sortedInventory.sort((a, b) => {
        const qtyA = a.ProductQuantity || 0; // Handle null or undefined values
        const qtyB = b.ProductQuantity || 0; // Handle null or undefined values
        return qtyA - qtyB;
      });
    } else if (sortCriteria === 'quantityHighToLow') {
      sortedInventory.sort((a, b) => {
        const qtyA = a.ProductQuantity || 0; // Handle null or undefined values
        const qtyB = b.ProductQuantity || 0; // Handle null or undefined values
        return qtyB - qtyA;
      });
    }
    return sortedInventory;
  };

  // Filter categories based on search query
  const handleSearch = (query) => {
    setSearchCategoryQuery(query);
    const filtered = categories.filter(categories =>
      categories.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.filterButtonText}>Add New Item</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.filterButton, styles.halfButton]}  onPress={() => setCategoryModalVisible(true)}>
            <Text style={styles.filterButtonText}>Filter by Category</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.filterButton, styles.halfButton]}  onPress={() => setSortModalVisible(true)}>
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>

      {/* Modal to select Category */}

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
                keyExtractor={(item) => item.id}
              />
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)} style={[styles.closeButton, styles.buttonRight]}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Modal for selecting sort option  */}
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
              <TouchableOpacity onPress={() => setSortModalVisible(false)} style={[styles.closeButton, styles.buttonRight]}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Add New Item Modal */}
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
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, ProductName: text })
                  }
                  placeholder="Product Name"
                  placeholderTextColor="#808080"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.modalTitle}>Quantity: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, ProductQuantity: Number(text) })
                  }
                  placeholder="Quantity"
                  placeholderTextColor="#808080"
                  keyboardType="numeric"
                />
              </View>
              {/* Category selection -- need to fix */}
              <View style={styles.inputRow}> 
                <Text style={styles.modalTitle}>Category: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, CategoryID: text })
                  }
                  placeholder="Category"
                  placeholderTextColor="#808080"
                />
              </View>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={[styles.saveButton, styles.buttonLeft]}
                  onPress={handleAddItem}
                >
                  <Text style={styles.saveButtonText}>Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.closeButton, styles.buttonRight]}
                  onPress={() => {
                    setEditedItem({ ProductName: '', ProductQuantity: '', CategoryID: '' });
                    setAddModalVisible(false)}}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Edit modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.inputRow}>
                <Text style={styles.modalTitle}>Name: </Text>
                <TextInput
                  style={styles.input}
                  value={editedItem.ProductName}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, ProductName: text })
                  }
                  placeholder="Name"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.modalTitle}>Quantity: </Text>
                <TextInput
                  style={styles.input}
                  value={String(editedItem.ProductQuantity)}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, ProductQuantity: Number(text) })
                  }
                  placeholder="Quantity"
                  keyboardType="numeric"
                />
              </View>
              {/* Category selection -- need to fix */}
              <View style={styles.inputRow}> 
                <Text style={styles.modalTitle}>Category: </Text>
                <TextInput
                  style={styles.input}
                  value={String(editedItem.CategoryID)}
                  onChangeText={(text) =>
                    setEditedItem({ ...editedItem, CategoryID: text })
                  }
                  placeholder="CategoryID"
                />
              </View>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={[styles.saveButton, styles.buttonLeft]}
                  onPress={handleSaveChanges}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.closeButton, styles.buttonRight]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      {/* Displaying Inventory  */}

        {sortInventory().map((item) => (
          <View key={item.ProductID} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.leftContent}>
                <Text style={styles.item}>{item.ProductName}</Text>
              </View>
              <Text style={styles.quantity}>QT: {item.ProductQuantity}</Text>
              <TouchableOpacity style={styles.editButtonContainer} onPress={() => handleEdit(item)}>
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
  categoryItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FA4616',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginRight: 'auto',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#F3D014',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortButton: {
    backgroundColor: '#F3D014',
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
    //borderBottomWidth: 1,
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
    backgroundColor: '#F3D014',
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
