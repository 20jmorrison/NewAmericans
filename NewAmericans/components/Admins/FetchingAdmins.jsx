import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Function to fetch admin data
const fetchAdminData = async () => {
  try {
    const response = await fetch('http://50.187.63.220:3306/AdminData');
    if (response.ok) {
      const data = await response.json();
      return data.admins;
    } else {
      console.error('Failed to fetch admin data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return [];
  }
};

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAdmins = await fetchAdminData();
      setAdmins(fetchedAdmins);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Admin Names:</Text>
      {admins.map((admin, index) => (
        <Text key={index}>{admin.name}</Text>
      ))}
    </View>
  );
};

export { AdminList as default, fetchAdminData };
