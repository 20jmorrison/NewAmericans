// Families.js
import React from 'react';
import { View, Text } from 'react-native';
import StudentList from '../components/Students/StudentFetching';  //Import Component

const Families = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Families Screen</Text>
            <StudentList/>
    </View>
  );
};

export default Families;
