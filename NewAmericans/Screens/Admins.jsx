import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchSuperuser } from '../components/Admins/FetchingSuperuser';
import right_arrow from '../assets/right-arrow.png';
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
      <View style={styles.textArea}>
        <Text style={styles.headerText}>Admin Control</Text>
        <Text style={styles.subText}>Please enter master passkey to continue.</Text>
      </View>
      <View style={styles.submissionArea}>
        <TextInput
          style={styles.input}
          placeholder="****"
          value={superuserPasscode}
          onChangeText={(text) => setSuperuserPasscode(text)}
          keyboardType="numeric"
          secureTextEntry={true}
        />
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleCheckPasscode}>
            <Text style={styles.buttonText}>Submit</Text>
            <Image source={right_arrow} style={styles.right_arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    width: '100%',
    height: '50%',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingTop: '30%',
  },
  subText: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'Nunito-Regular',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingTop: '5%',
  },
  submissionArea: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  buttonArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3D014',
    marginRight: '5%',
    marginTop: '5%',
    borderRadius: 5,
    width: '25%',
    height: '100%',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right_arrow: {
    marginLeft: '15%',
    width: 24,
    height: 24,
  },
});

export default Superuser;
