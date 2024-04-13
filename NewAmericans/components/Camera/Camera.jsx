import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation
import { LogBox } from 'react-native';

const CameraComponent = ({ route }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null); // State to hold the captured image URI
  const cameraRef = useRef(null);
  const navigation = useNavigation(); // Initialize navigation
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // State to manage flash mode

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    (async () => {
      // Request permission to access media library
      await MediaLibrary.requestPermissionsAsync();
      // Request permission to access the device's camera
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  // Function to take a picture using the camera
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // Take a picture and get the image data
        const { uri } = await cameraRef.current.takePictureAsync({
          flashMode: flashMode // Pass the flash mode to takePictureAsync
        });
        // Set the captured image URI in state
        setImage(uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Function to save the captured image to the device's media library
  const saveImage = async () => {
    if (image) {
      try {
        // Save the image to the device's media library
        await MediaLibrary.createAssetAsync(image);
        // Navigate back to the previous screen
        navigation.goBack();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Function to retake the picture
  const retakePicture = () => {
    // Clear the captured image URI
    setImage(null);
  };

  if (hasCameraPermission === false) {
    // If camera permission is denied, display a message
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        // If no image is captured, display the camera preview
        <Camera style={styles.camera} ref={cameraRef} flashMode={flashMode}>
          <View style={styles.cameraButtonsContainer}>
            {/* Navigation go back button */}
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {/* Button to toggle between front and back camera */}
            <TouchableOpacity
              style={[styles.flashButton, flashMode === Camera.Constants.FlashMode.on && { backgroundColor: 'yellow' }]}
              onPress={() => {
                setFlashMode(
                  flashMode === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}>
              <Ionicons name="flash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        // If an image is captured, display the captured image preview
        <View style={styles.imagePreview}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.previewButtonsContainer}>
            {/* Button to save the captured image */}
            <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {/* Button to retake the picture */}
            <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!image && (
        // If no image is captured, display button to take a picture
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted to evenly distribute buttons
    alignItems: 'center',
    paddingHorizontal: 20, // Adjusted padding
    paddingTop: 20, // Adjusted padding
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    flex: 1,
  },
  previewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    width: '100%',
  },
  flashButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  takePictureButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  retakeButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  goBackButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CameraComponent;
