import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Admins = () => {
  const [superuserPasscode, setSuperuserPasscode] = useState('');
  const navigation = useNavigation();

  const handleCheckPasscode = () => {
    const predefinedPasscode = '1234';
    if (superuserPasscode === predefinedPasscode) {
      setSuperuserPasscode('');
      navigation.navigate('PasswordProtectedScreen');
    } else {
      console.log('Incorrect passcode');
    }
  };

  const handleDonePress = () => {
    console.log('Done pressed');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Passcode</Text>
      <TextInput
        style={styles.input}
        placeholder="****"
        value={superuserPasscode}
        onChangeText={(text) => setSuperuserPasscode(text)}
        secureTextEntry={true}
        keyboardType='numeric'
      />
      <Button title="Submit" onPress={handleCheckPasscode} color="black" />
      <TouchableOpacity style={styles.button} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '50%',
    textAlign: 'center',
  },
});

export default Admins;
