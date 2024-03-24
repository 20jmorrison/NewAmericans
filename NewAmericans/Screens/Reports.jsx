// Reports.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { fetchReportData } from '../components/Reports/FetchingReportInfo';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        reportData.map((item, index) => (
          <Text key={index}>
            Student Name: {item.Student_FirstName} {item.Student_LastName}, {' '}
            Product: {item.ProductName}, {' '}
            Quantity: {item.Quantity}, {' '}
            Admin Name: {item.Admin_FirstName} {item.Admin_LastName}, {' '}
            Date Created: {item.DateCreated}
          </Text>
        ))
      )}
    </View>
  );
};

export default Reports;
