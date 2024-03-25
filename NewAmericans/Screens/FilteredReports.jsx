import React from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';

const FilteredReports = ({ route }) => {
  const { filteredData } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };


  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Filtered</Text>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text>{item.Student_FirstName} {item.Student_LastName}: {item.ProductName} ({item.Quantity}) </Text>
            <Text>{formatDate(item.DateCreated)}</Text>
            <Text>Admin: {item.Admin_FirstName} {item.Admin_LastName}</Text>
          </View>
        ))}
      </View>
      <Button title="Export to CSV" onPress={exportToCSV} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dataContainer: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default FilteredReports;
