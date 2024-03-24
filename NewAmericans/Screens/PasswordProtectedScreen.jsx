import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import { fetchAdminData } from '../components/Admins/FetchingAdmins';
import { postNewAdmin } from '../components/Admins/PostingAdmin';
import { putAdmin } from '../components/Admins/PuttingAdmin';
import edit from '../assets/edit.png';


const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [editAdminModalVisible, setEditAdminModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');


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

  const openEditAdmin = (admin) => {
    console.log("editing admin", admin.first_name);
    setSelectedAdmin(admin); // Set the selected admin
    setEditAdminModalVisible(true); // Open the edit admin modal
  }

  const handleEditAdmin = () => {
    // Construct the updated admin object with edited values
    const updatedAdmin = {
      ...selectedAdmin, // Keep other properties unchanged
      first_name: editedFirstName !== '' ? editedFirstName : selectedAdmin.first_name,
      last_name: editedLastName !== '' ? editedLastName : selectedAdmin.last_name,
      email: editedEmail !== '' ? editedEmail : selectedAdmin.email,
      password: editedPassword !== '' ? editedPassword : selectedAdmin.password,
    };

    // Update the admin in the state
    const updatedAdmins = admins.map((admin) =>
      admin.AdminID === selectedAdmin.AdminID ? updatedAdmin : admin
    );
    setAdmins(updatedAdmins);
    putAdmin(updatedAdmin);
    // Close the edit admin modal
    setEditAdminModalVisible(false);

    // Reset edited values to empty strings
    setEditedFirstName('');
    setEditedLastName('');
    setEditedEmail('');
    setEditedPassword('');

    // Optionally, you can also perform API call to update the admin data on the server
    // updateAdminData(updatedAdmin);
  }



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
              <Text>New Admin</Text>
              <TextInput
                style={styles.input}
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
              <Button title="Add Admin" onPress={handleAddAdmin} color='black' />
              <Button title="Close" onPress={() => setAdminModalVisible(false)} color='#FA4616' />
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={editAdminModalVisible}
          onRequestClose={() => setEditAdminModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Edit Admin</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                defaultValue={selectedAdmin.first_name}
                onChangeText={(text) => setEditedFirstName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                defaultValue={selectedAdmin.last_name}
                onChangeText={(text) => setEditedLastName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                defaultValue={selectedAdmin.email}
                onChangeText={(text) => setEditedEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                defaultValue={selectedAdmin && selectedAdmin.password ? selectedAdmin.password.toString() : ''}
                onChangeText={(text) => setEditedPassword(text)}
              />
              <Button title="Save" onPress={handleEditAdmin} color='black' />
              <Button title="Close" onPress={() => setEditAdminModalVisible(false)} color='#FA4616' />
            </View>
          </View>
        </Modal>

        {admins.map((admin, index) => (
          <View key={index} style={styles.adminContainer}>
            <View style={styles.adminTextContainer}>
              <Text>{admin.AdminID} {admin.last_name}</Text>
              <Text>{admin.email}</Text>
            </View>
            <TouchableOpacity onPress={() => openEditAdmin(admin)} style={styles.editIconContainer}>
              <Image source={edit} style={styles.editIcon} />
            </TouchableOpacity>

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
    flexDirection: 'row',
    alignItems: 'center',

  },
  adminTextContainer: {
    width: '80%',
    flexDirection: 'column',
  },
  editIconContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: "flex-end"
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
  editButton: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
});


export default Admins;
