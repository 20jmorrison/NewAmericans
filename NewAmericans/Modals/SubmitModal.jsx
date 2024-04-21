import React, { useState, useEffect, } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { fetchStudents } from '../components/Students/StudentFetching';
import { fetchAdminData } from '../components/Admins/FetchingAdmins';
import { SubmitOrder } from '../components/Orders/SubmitOrder';
import SelectBox from 'react-native-multi-selectbox'


const SubmitModal = ({ visible, onClose, cartItemsWithQuantity }) => {
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [adminOptions, setAdminOptions] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedAdmin, setSelectedAdmin] = useState({});

    const [enteredPassword, setEnteredPassword] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all admins
                const fetchedAdmins = await fetchAdminData();
                const fetchedStudents = await fetchStudents();

                setAdmins(fetchedAdmins);
                setStudents(fetchedStudents);
            } catch (error) {
                console.error('Error fetching admins/students:', error);
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        // Map fetched data to options after admins and students states are updated
        const mappedAdmins = admins.map(admin => ({ item: admin.first_name + " " + admin.last_name, id: admin.AdminID }));
        const mappedStudents = students.map(student => ({ item: student.first_name + " " + student.last_name, id: student.StudentID }));
        setAdminOptions(mappedAdmins);
        setStudentOptions(mappedStudents);
    }, [admins, students]);

    const handleSubmit = async () => {
        if (!selectedStudent || !selectedAdmin) {
            // Alert the user if either selectedStudent or selectedAdmin is null
            Alert.alert('Please make sure to select both a student and an admin.');
            return;
        }
        console.log("Cart Items with Quantity:", cartItemsWithQuantity); // Log the cart items with quantity
        SubmitOrder(selectedAdmin, selectedStudent, cartItemsWithQuantity);
        onClose();
    };
    const handlePressOutside = () => {
        Keyboard.dismiss(); // Dismiss the keyboard when user presses outside of the input
    };
    return (
        
        <Modal visible={visible} transparent>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text style={styles.modalHeaderText}>Submit Order Confirmation</Text>
                    {/* Student dropdown */}
                    <View style={styles.selectBox}>

                        <SelectBox
                            constainerStyle={styles.selectBox}
                            label="Select Student"
                            options={studentOptions}
                            value={selectedStudent}
                            onChange={studentChange()}
                            hideInputFilter={false}
                        />
                    </View>

                    {/* Admin dropdown */}
                    <View style={styles.selectBox}>

                        <SelectBox
                            label="Select Admin"
                            options={adminOptions}
                            value={selectedAdmin}
                            onChange={adminChange()}
                            hideInputFilter={false}
                        />
                    </View>
                        <TextInput
                            style={styles.input}
                            placeholder="****"
                            value={enteredPassword}
                            onChangeText={(text) => setEnteredPassword(text)}
                            keyboardType="numeric"
                            secureTextEntry={true}
                        />

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <View style={styles.emptySpace}></View>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </Modal>

    );
    function studentChange() {
        return (val) => setSelectedStudent(val)
    }
    function adminChange() {
        return (val) => setSelectedAdmin(val)
    }
};

const styles = StyleSheet.create({
    selectBox: {
        //backgroundColor: 'red',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '85%',
        height: 'auto',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    button: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    buttonText: {
        fontSize: 14, // Adjust text size as needed
        color: 'black', // Set text color to black for better visibility

    },
    showButton: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 20, // Increase padding for larger buttons
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        marginBottom: 20, // Increase bottom margin for more space
    },

    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    scrollView: {
        maxHeight: 150, // Reduce max height for smaller dropdowns
        marginBottom: 10,
    },
    itemButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    emptySpace: {
        width: 10, // Adjust as needed for spacing
    },
    modalHeaderText: {
        marginBottom: 20, // Add some space between the header and other components
        fontSize: 18, // Adjust font size as needed
        fontWeight: 'bold', // Optionally set font weight
        textAlign: 'center',
    },
});

export default SubmitModal;
