import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch student names
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://50.187.63.220:3306/StudentData');
      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
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
      <Text>Student Names:</Text>
      {students.map((student, index) => (
        <Text key={index}>{student.name}</Text>
      ))}
    </View>
  );
};

export default StudentList;
