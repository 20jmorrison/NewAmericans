import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentOrders = ({ route }) => {
  const { student } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Display orders for {student.first_name} {student.last_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 27,
    },
  });

export default StudentOrders;