import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/Cart/CartProvider';
import SubmitModal from '../Modals/SubmitModal'; // Import SubmitModal

const CartScreen = () => {
    const { cartItems, clearCart, removeFromCart } = useCart(); // Import removeFromCart from CartProvider
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    const handleClearCart = () => {
        clearCart(); 
    };

    const handleSubmitOrder = () => {
        console.log(cartItems);
        setModalVisible(true); // Open modal when submitting order
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId); 
    };

    // Map cart items to JSX elements
    const cartItemComponents = cartItems.map(item => (
        <View key={item.ProductID} style={[styles.itemContainer, { borderColor: '#F3D014', borderWidth: 2 }]}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.ProductName}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveItem(item.ProductID)}>
                <Ionicons name="trash-bin-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    ));

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <ScrollView>
                {cartItemComponents}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleClearCart}>
                    <Text style={styles.buttonText}>Clear Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmitOrder}>
                    <Text style={styles.buttonText}>Submit Order</Text>
                </TouchableOpacity>
            </View>
            {/* Reserved space above the tab navigator */}
            <View style={styles.reservedSpace}></View>

            {/* Modal for order submission */}
            <SubmitModal visible={modalVisible} onClose={() => setModalVisible(false)} orderItems={cartItems} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8, // Add border radius for rounded corners
        padding: 10, // Add padding to create space between border and content
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 14,
        color: 'gray',
    },
    deleteButton: {
        backgroundColor: '#F3D014',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#F3D014',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    reservedSpace: {
        height: 80, // Adjust the height as needed
    },
});
export default CartScreen;
