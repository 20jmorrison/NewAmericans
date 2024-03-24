import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSuperuser } from '../components/Admins/FetchingSuperuser';

const Superuser = () => {
  const [superuserPasscode, setSuperuserPasscode] = useState('');
  const [fetchedPasscode, setFetchedPasscode] = useState('');
  const navigation = useNavigation();

  const handleCheckPasscode = () => {
    if (superuserPasscode == fetchedPasscode) {
      setSuperuserPasscode('');
      navigation.navigate('PasswordProtectedScreen');
    } else {
      console.log('Incorrect passcode');
      console.log(fetchedPasscode);
      console.log(superuserPasscode);
    }
  };

  const handleDonePress = () => {
    console.log('Done pressed');
    Keyboard.dismiss();
  };

  useEffect(() => {
    const getRealPasscode = async () => {
      try {
        const superuser = await fetchSuperuser();
        setFetchedPasscode(superuser[0].passcode);
      } catch (error) {
        console.error('Error fetching real passcode:', error);
      }
    };

    getRealPasscode();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Passcode</Text>
      <TextInput
        style={styles.input}
        placeholder="****"
        value={superuserPasscode}
        onChangeText={(text) => setSuperuserPasscode(text)}
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleCheckPasscode}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    width: 200, // Adjust the width as needed
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Superuser;
