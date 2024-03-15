import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { fetchStudents } from '../components/Students/StudentFetching';

const Families = () => {
  const [students, setStudents] = useState([]);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [newStudentFirstName, setNewStudentFirstName] = useState('');
  const [newStudentLastName, setNewStudentLastName] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const studentsData = await fetchStudents();
        setStudents(studentsData);
        setFilteredStudents(studentsData); // Initialize filtered students with all students
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    
    fetchStudentData();
  }, []);

  const handlePress = (student) => {
    navigation.navigate('StudentOrders', { student })
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
        if (a.first_name && b.first_name) {
          return a.first_name.localeCompare(b.first_name);
        }
      } else if (sortBy === 'lastName') {
        if (a.last_name && b.last_name) {
          return a.last_name.localeCompare(b.last_name);
        }
      }
      return 0;
    });
    setStudents(sortedStudents);
    setFilteredStudents(sortedStudents); // Update filtered students
    setIsSortModalVisible(false);
  };

  // Filter students based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = students.filter(student =>
      student.first_name.toLowerCase().includes(query.toLowerCase()) ||
      student.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddStudentModalVisible}
        onRequestClose={() => setIsAddStudentModalVisible(false)}
      >
        {/* Modal content */}
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

      {/* Modal for sorting */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSortModalVisible}
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        {/* Modal content */}
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

      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* ScrollView for displaying students */}
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Add Student" onPress={() => setIsAddStudentModalVisible(true)} />
          <Button title="Sort" onPress={() => setIsSortModalVisible(true)} />
        </View>
        {/* Mapping over filtered students and displaying them */}
        {filteredStudents.map((student) => (
          <TouchableOpacity key={student.id} onPress={() => handlePress(student)}>
            <View style={styles.card}>
              <Text style={styles.firstName}>{student.first_name}  </Text>
              <Text style={styles.lastName}>{student.last_name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
  searchBarContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  firstName: {
    fontSize: 15,
  },
  lastName: {
    fontSize: 15,
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

export default Families;
