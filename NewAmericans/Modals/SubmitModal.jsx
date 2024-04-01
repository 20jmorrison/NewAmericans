import React, { useState, useEffect,} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { fetchStudents } from '../components/Students/StudentFetching';
import { fetchAdminData } from '../components/Admins/FetchingAdmins';
import { SubmitOrder } from '../components/Orders/SubmitOrder';

const SubmitModal = ({ visible, onClose, cartItemsWithQuantity }) => {
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [studentDropdownVisible, setStudentDropdownVisible] = useState(false);
    const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
    const [studentSearchText, setStudentSearchText] = useState('');
    const [adminSearchText, setAdminSearchText] = useState('');

    useEffect(() => {
        // Fetch student data when component mounts
        fetchStudents().then(data => setStudents(data));

        // Fetch admin data when component mounts
        fetchAdminData().then(data => setAdmins(data));
    }, []);

    // Filter students based on search text
    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(studentSearchText.toLowerCase()) ||
        student.last_name.toLowerCase().includes(studentSearchText.toLowerCase())
    );

    // Filter admins based on search text
    const filteredAdmins = admins.filter(admin =>
        admin.first_name.toLowerCase().includes(adminSearchText.toLowerCase()) ||
        admin.last_name.toLowerCase().includes(adminSearchText.toLowerCase())
    );

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
    
    

    return (
        <Modal visible={visible} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                <Text style={styles.modalHeaderText}>Submit Order Confirmation</Text>
                    
                    {/* Student dropdown */}
                    <TouchableOpacity style={[styles.button, styles.showButton]} onPress={() => setStudentDropdownVisible(!studentDropdownVisible)}>
                        <Text style={styles.buttonText}>Students</Text>
                    </TouchableOpacity>
                    {studentDropdownVisible && (
                        <View>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Students"
                                value={studentSearchText}
                                onChangeText={text => setStudentSearchText(text)}
                            />
                            <ScrollView style={styles.scrollView}>
                                {filteredStudents.map(student => (
                                    <TouchableOpacity
                                        key={student.id}
                                        style={styles.itemButton}
                                        onPress={() => {
                                            setSelectedStudent(student);
                                            setStudentDropdownVisible(false);
                                        }}
                                    >
                                        <Text>{student.first_name} {student.last_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Admin dropdown */}
                    <TouchableOpacity style={[styles.button, styles.showButton]} onPress={() => setAdminDropdownVisible(!adminDropdownVisible)}>
                        <Text style={styles.buttonText}>Admins</Text>
                    </TouchableOpacity>
                    {adminDropdownVisible && (
                        <View>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Admins"
                                value={adminSearchText}
                                onChangeText={text => setAdminSearchText(text)}
                            />
                            <ScrollView style={styles.scrollView}>
                                {filteredAdmins.map(admin => (
                                    <TouchableOpacity
                                        key={admin.id}
                                        style={styles.itemButton}
                                        onPress={() => {
                                            setSelectedAdmin(admin);
                                            setAdminDropdownVisible(false);
                                        }}
                                    >
                                        <Text>{admin.first_name} {admin.last_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Selected Student */}
                    {selectedStudent && (
                        <Text>Student: {selectedStudent.first_name} {selectedStudent.last_name}</Text>
                    )}

                    {/* Selected Admin */}
                    {selectedAdmin && (
                        <Text>Admin: {selectedAdmin.first_name} {selectedAdmin.last_name}</Text>
                    )}

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
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: 300,
        maxHeight: 400,
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
        color: 'black', // Add this line to ensure text visibility

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
