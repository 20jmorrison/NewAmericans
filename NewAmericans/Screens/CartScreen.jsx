import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/Cart/CartProvider';
import SubmitModal from '../Modals/SubmitModal';

const CartScreen = () => {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [cartItemsWithQuantity, setCartItemsWithQuantity] = useState([]);

    // Update cartItemsWithQuantity whenever cartItems changes
    useEffect(() => {
        // Map over cartItems to include Quantity property
        const updatedCartItemsWithQuantity = cartItems.map(item => ({
            ...item,
            Quantity: 1 // Default quantity
        }));
        setCartItemsWithQuantity(updatedCartItemsWithQuantity);
    }, []);

    useEffect(() => {
        // Map over cartItems to include Quantity property
        const updatedCartItemsWithQuantity = cartItems.map(item => ({
            ...item,
            Quantity: 1 // Default quantity
        }));
        setCartItemsWithQuantity(updatedCartItemsWithQuantity);
    }, [cartItems]);

    const handleClearCart = () => {
        clearCart();
    };

    const handleSubmitOrder = () => {
        setModalVisible(true);
    };

    const handleInputChange = (text, itemId) => {
        const updatedCartItemsWithQuantity = cartItemsWithQuantity.map(item => {
            if (item.ProductID === itemId) {
                // Convert text to a number and ensure it's between 1 and 10
                const originalItem = cartItems.find(item => item.ProductID === itemId);
                const available = originalItem.ProductQuantity;
                const quantity = parseInt(text);
                return {
                    ...item,
                    Quantity: quantity
                };
            }
            return item;
        });
        setCartItemsWithQuantity(updatedCartItemsWithQuantity);
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleDecreaseQuantity = (itemId) => {
        const item = cartItemsWithQuantity.find(item => item.ProductID === itemId);
        let currQuantity =  item ? item.Quantity : 0;
        let newQuantity = currQuantity > 1 ? currQuantity - 1 : 1; 
        handleInputChange(newQuantity, itemId);
        console.log(newQuantity);
    };

    const handleIncreaseQuantity = (itemId) => {
        const item = cartItemsWithQuantity.find(item => item.ProductID === itemId);
        const originalItem = cartItems.find(item => item.ProductID === itemId);
        const available = originalItem.ProductQuantity;
        let currQuantity =  item ? item.Quantity : 0;
        let newQuantity = currQuantity < available ? currQuantity + 1 : currQuantity; 
        handleInputChange(newQuantity, itemId);
        console.log(newQuantity);

    };
    
    const cartItemComponents = cartItemsWithQuantity.map(item => (
        <View key={item.ProductID} style={[styles.itemContainer, { borderColor: '#F3D014', borderWidth: 2 }]}>
            <View style={styles.itemInfo}>
                <View style={styles.itemText}>
                    <Text style={styles.itemName}>{item.ProductName}</Text>
                </View>
                <View style={styles.quantity}>
                    <TouchableOpacity style={styles.circularButton} onPress={() => handleDecreaseQuantity(item.ProductID)}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={String(item.Quantity)}
                        editable={false}
                    />
                    <TouchableOpacity style={styles.circularButton} onPress={() => handleIncreaseQuantity(item.ProductID)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
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
            <View style={styles.reservedSpace}></View>
            <SubmitModal visible={modalVisible} onClose={() => setModalVisible(false)} cartItemsWithQuantity={cartItemsWithQuantity} />
        </View>
    );
};

const styles = StyleSheet.create({
    itemText: {
        width: '40%',

    },
    quantity: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        alignItems: 'center',
    },
    circularButton: {
        backgroundColor: '#F3D014',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to vertically center the content

    },
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
        borderRadius: 8,
        padding: 10,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#FA4616',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
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
        height: 80,
    },
    input: {
        height: 40,
        width: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        textAlign: 'center',
    },
});

export default CartScreen;
