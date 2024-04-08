import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import createCSV from '../components/Admins/CreateCSV';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const FilteredReports = ({ route }) => {
  const { filteredData } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleExport = async () => {
    try {
      // Create CSV data
      const csvData = createCSV(filteredData);
      
      // Create file in cache directory
      console.log(FileSystem.documentDirectory);
      const fileUri = FileSystem.documentDirectory + 'exported_report.csv';
      await FileSystem.writeAsStringAsync(fileUri, csvData);

      // Share the CSV file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error exporting CSV:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Filtered</Text>
          <TouchableOpacity onPress={handleExport} style={styles.button}>
            <Text style={styles.buttonText}>Export Report</Text>
          </TouchableOpacity>
          {filteredData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text>{item.Student_FirstName} {item.Student_LastName}: {item.ProductName} ({item.Quantity}) </Text>
              <Text>{formatDate(item.DateCreated)}</Text>
              <Text>Admin: {item.Admin_FirstName} {item.Admin_LastName}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Button title="Export to CSV" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  dataContainer: {
    flexGrow: 1,
    marginBottom: 50,
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
  button: {
    backgroundColor: '#F3D014',
    padding: 10,
    borderRadius: 5,
  },
});

export default FilteredReports;
