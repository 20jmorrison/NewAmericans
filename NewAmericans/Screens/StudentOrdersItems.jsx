import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchTransactionsWithDate } from '../components/Transactions/TransactionFetchingWIthDate';

const StudentOrdersItems = ({ route }) => {
  const { student, transaction } = route.params;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchStudentTransactions = async () => {
      try {
        const studentID = student.StudentID;
        const date = transaction.DateCreated;
        const studentTransactions = await fetchTransactionsWithDate(studentID, date);
        setTransactions(studentTransactions);
        console.log('Fetched transactions:', studentTransactions); // Logging the fetched transactions
      } catch (error) {
        console.error('Error fetching student transactions:', error);
      }
    };
  
    fetchStudentTransactions();
  }, [student, transaction]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Combine student's first and last name with the formatted date
  const headerText = `${student.first_name} ${student.last_name}: ${formatDate(transaction.DateCreated)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      {/* Render the fetched transactions */}
      {transactions.map(transaction => (
        <Text key={transaction.TransactionID}>
          Transaction ID: {transaction.TransactionID}, Amount: {transaction.Amount}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StudentOrdersItems;
