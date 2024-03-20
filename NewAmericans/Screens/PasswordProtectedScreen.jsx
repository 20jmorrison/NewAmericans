import React from 'react';
import { View, Text } from 'react-native';
import { fetch } from '../components/Students/StudentFetching';


const PasswordProtectedScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the PasswordProtectedScreen Screen</Text>
    </View>
  );
};

export default PasswordProtectedScreen;