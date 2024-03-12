// Families.js
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
//import StudentList from '../components/Students/StudentFetching';  //Import Component

const Families = () => {
  const [students, setStudents] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Grace', lastName: 'Kim' },
    { id: 4, firstName: 'Jared', lastName: 'Morrison' },
    { id: 5, firstName: 'Ben', lastName: 'Levine' },
  ]);

  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [newStudentFirstName, setNewStudentFirstName] = useState('');
  const [newStudentLastName, setNewStudentLastName] = useState('');
  const [sortBy, setSortBy] = useState(null);

  const navigation = useNavigation();

  const handlePress = (studentName) => {
    navigation.navigate('StudentOrders', { studentName })
  };

  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      firstName: newStudentFirstName,
      lastName: newStudentLastName,
    };
    setStudents((prevStudents) => [...prevStudents, newStudent]);    
    setIsAddStudentModalVisible(false);
    setNewStudentFirstName('');
    setNewStudentLastName('');
  };

  const sortStudents = () => {
    const sortedStudents = [...students].sort((a, b) => {
      if (sortBy === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortBy === 'lastName') {
        return a.lastName.localeCompare(b.lastName);
      }
    });
    setStudents(sortedStudents);
    setIsSortModalVisible(false);
  };

  useEffect(() => {
    if (sortBy) {
      sortStudents();
    }
  }, [sortBy]);
  
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddStudentModalVisible}
        onRequestClose={() => setIsAddStudentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Add New Student</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={newStudentFirstName}
              onChangeText={(text) => setNewStudentFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={newStudentLastName}
              onChangeText={(text) => setNewStudentLastName(text)}
            />
            <Button title="Add Student" onPress={handleAddStudent} />
            <Button title="Close" onPress={() => setIsAddStudentModalVisible(false)} />
          </View>
        </View>
      </Modal>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSortModalVisible}
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { setSortBy('firstName'); sortStudents(); }}>
              <Text style={styles.dropdownOption}>Sort by First Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSortBy('lastName'); sortStudents(); }}>
              <Text style={styles.dropdownOption}>Sort by Last Name</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setIsSortModalVisible(false)} />
          </View>
        </View>
      </Modal>
      
    <View style={styles.separator} /> 
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Add Student" onPress={() => setIsAddStudentModalVisible(true)} />
          <Button title="Sort" onPress={() => setIsSortModalVisible(true)} />
        </View>
        {students.map((student, index) => (
          <TouchableOpacity key={student.id} onPress={() => handlePress(student.firstName)}>
            <View style={styles.card}>
              <Text style={styles.firstName}>{student.firstName}</Text>
              <Text style={styles.lastName}>{student.lastName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}


export default Families;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  firstName: {
    fontSize: 25,
    width: 90, 
  },
  lastName: {
    fontSize: 25,
    left: 100, 
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
    alignItems: 'center',
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
  dropdownOption: {
    fontSize: 20,
    color: 'blue',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row', 
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});