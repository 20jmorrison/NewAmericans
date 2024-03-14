import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTransactions } from '../components/Transactions/TransactionFetching';

const StudentOrders = ({ route }) => {
  const { student } = route.params;
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStudentTransactions = async () => {
      try {
        const studentID = student.StudentID;
        const studentTransactions = await fetchTransactions(studentID);
        setTransactions(studentTransactions);
      } catch (error) {
        console.error('Error fetching student transactions:', error);
      }
    };

    fetchStudentTransactions();
  }, [student]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePress = (transaction) => {
    // Navigate to a different page and pass student and transaction information
    navigation.navigate('StudentOrdersItems', { student: student, transaction: transaction });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{student.first_name} {student.last_name}</Text>
      {/* Render the fetched transactions */}
      {transactions.map(transaction => (
        <TouchableOpacity
          key={transaction.TransactionID}
          style={styles.dateContainer}
          onPress={() => handlePress(transaction)}
        >
          <Text style={styles.dateText}>{formatDate(transaction.DateCreated)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    alignSelf: 'flex-start',
    borderColor: '#F3D014',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  dateText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default StudentOrders;
