// Order.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const data = [
  { id: 1, name: 'View All', image: require('../assets/cart.png') },
  { id: 2, name: 'Clothes', image: require('../assets/clothes.png') },
  { id: 3, name: 'Toiletries', image: require('../assets/toiletries.png') },
  { id: 4, name: 'Hair Supplies', image: require('../assets/hair.png') },
  { id: 5, name: 'Cleaning', image: require('../assets/cleaning.png') },
  { id: 6, name: 'Baby Supplies', image: require('../assets/baby.png') },
  { id: 7, name: 'School', image: require('../assets/school.png') },
  { id: 8, name: 'Food', image: require('../assets/food.png') },
  { id: 9, name: 'Other', image: require('../assets/other.png') },
];

const Item = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <Image source={item.image} style={styles.itemImage} />
    <Text style={styles.itemText}>{item.name}</Text>
  </TouchableOpacity>
);

const Order = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 2,
    borderColor: '#F3D014',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 100,
    marginTop: 15,
    resizeMode: 'contain',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
  },
});

export default Order;
