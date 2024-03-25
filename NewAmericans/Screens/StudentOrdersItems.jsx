import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';



const StudentOrdersItems = ({ route }) => {
  const { student, transaction } = route.params;

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Combine student's first and last name with the formatted date
  const headerText = `${student.first_name} ${student.last_name}: ${formatDate(transaction.DateCreated)}`;
  console.log(transaction)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      {/* Other content of the screen */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align children at the top
    alignItems: 'center', // Center children horizontally
    paddingTop: 20, // Add top padding for space from the top
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
  },
});

export default StudentOrdersItems;
