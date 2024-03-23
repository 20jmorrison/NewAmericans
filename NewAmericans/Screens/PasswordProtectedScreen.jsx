import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { fetchAdminData } from '../components/Admins/FetchingAdmins';
import { postNewAdmin } from '../components/Admins/PostingAdmin';
const Inventory = () => {
  const [admins, setAdmins] = useState([]);
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all admins
        const fetchedAdmins = await fetchAdminData();
        setAdmins(fetchedAdmins);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddAdmin = () => {
    const newAdmin = {
      AdminID: admins.length + 1,
      email: newEmail,
      password: newPassword,
      first_name: newFirstName,
      last_name: newLastName,
    };
    console.log('New Admin: ', newAdmin);
    postNewAdmin(newAdmin);
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
    setAdminModalVisible(false);
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewPassword('');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <TouchableOpacity style={styles.button} onPress={() => setAdminModalVisible(true)}>
          <Text style={styles.buttonText}>Add Admin</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={adminModalVisible}
          onRequestClose={() => setAdminModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Modal Text</Text>
              <TextInput
              style={styles.input}
              placeholder="First Name"
              value={newFirstName}
              onChangeText={(text) => setNewFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={newLastName}
              onChangeText={(text) => setNewLastName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newEmail}
              onChangeText={(text) => setNewEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
              <Button title="Add Admin" onPress={handleAddAdmin} color='black'/>
              <Button title="Close" onPress={() => setAdminModalVisible(false)} color='#FA4616' />
            </View>
          </View>
        </Modal>

        {admins.map((admin, index) => (
          <View key={index} style={styles.adminContainer}>
            <Text>{admin.first_name} {admin.last_name}</Text>
            <Text>{admin.email}</Text>
            {/* Add other admin properties here */}
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  adminContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  button: {
    backgroundColor: '#F3D014',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FA4616',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
});

export default Inventory;
