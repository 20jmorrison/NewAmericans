import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchReportData } from '../components/Reports/FetchingReportInfo';
import { fetchStudents } from '../components/Students/StudentFetching';
import { fetchAdminData } from '../components/Admins/FetchingAdmins';
import { filterReportDataByUserId } from '../components/Reports/ReportFilters/filterReportUser';
import { filterReportDataByAdminID } from '../components/Reports/ReportFilters/filterReportAdmin';
import { filterReportDataByYear } from '../components/Reports/ReportFilters/filterReportYear';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch report data when component mounts
    fetchReportData()
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching report data: ', error);
        setLoading(false);
      });

    // Fetch admin data
    fetchAdminData()
      .then(adminData => {
        setAdmins(adminData);
      })
      .catch(error => {
        console.error('Error fetching admin data: ', error);
      });

    // Fetch student data
    fetchStudents()
      .then(studentsData => {
        setStudents(studentsData);
      })
      .catch(error => {
        console.error('Error fetching student data: ', error);
      });
  }, []);

  // Function to test filtering by user ID
  const handleFilterByUser = () => {
    try {
      const filteredData = filterReportDataByUserId(reportData, selectedStudent);
      console.log('Filtered data by user:', filteredData);
      navigation.navigate('FilteredReports', {filteredData});
    } catch (error) {
      console.error('Error filtering data by user:', error);
    }
  };

  // Function to test filtering by admin ID
  const handleFilterByAdmin = () => {
    try {
      const filteredData = filterReportDataByAdminID(reportData, selectedAdmin);
      console.log('Filtered data by admin:', filteredData);
      navigation.navigate('FilteredReports', { filteredData});
    } catch (error) {
      console.error('Error filtering data by admin:', error);
    }
  };

  // Function to test filtering by year
  const handleFilterByYear = () => {
    try {
      const filteredData = filterReportDataByYear(reportData, 2024); // Change the year as needed
      console.log('Filtered data by year:', filteredData);
      navigation.navigate('FilteredReports', { filteredData});
    } catch (error) {
      console.error('Error filtering data by year:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={handleFilterByUser} style={styles.button}>
          <Text style={styles.buttonText}>Filter by User</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={selectedStudent}
          onValueChange={(itemValue, itemIndex) => setSelectedStudent(itemValue)}
        >
          <Picker.Item label="Select Student" value="" />
          {students.map(student => (
            <Picker.Item key={student.StudentID} label={`${student.first_name} ${student.last_name}`} value={student.StudentID} />
          ))}
        </Picker>
      </View>
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={handleFilterByAdmin} style={styles.button}>
          <Text style={styles.buttonText}>Filter by Admin</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={selectedAdmin}
          onValueChange={(itemValue, itemIndex) => setSelectedAdmin(itemValue)}
        >
          <Picker.Item label="Select Admin" value="" />
          {admins.map(admin => (
            <Picker.Item key={admin.AdminID} label={`${admin.first_name} ${admin.last_name}`} value={admin.AdminID} />
          ))}
        </Picker>
      </View>
      <View>
        <TouchableOpacity onPress={handleFilterByYear} style={styles.button}>
          <Text style={styles.buttonText}>Filter by Year</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: '#F3D014',
    padding:10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default Reports;
