import React, {useState} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { useFonts } from 'expo-font';
import Knewave from '../assets/Fonts/Knewave/Knewave-Regular.ttf';
import profileIcon from '../Imgs/user_1077114.png'
// import * as ImagePicker from 'expo-image-picker'


const MainCategories = () => {
  const [imageUri, setImageUri] = useState(null)


  const [fontsLoaded] = useFonts({
    Knewave: Knewave        
  })

  if (!fontsLoaded) {
    return null; // Handle loading state
  }

  const pickImage = async () => {
    // Request permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Pick image from the gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If user did not cancel image picker, set the image URI
    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.TopBar}>
            <View style={styles.Logo}>
              <Image style={{ width: 50, height: 50 }}
                source={require('../Imgs/done_8476811.png')}
              />
              <Text style={styles.Logo_text}>
                  Easy Days
              </Text>
            </View>
            <View style={styles.Profile}>
                <Image
                    source={imageUri ? { uri: imageUri } : profileIcon}
                    style={styles.profileImage}
                />
                <Text style={{fontSize: 14}}>
                  User Name
                </Text>
            </View>
        </View>
        <View>

        </View>
    </View>
  )
}

export default MainCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    TopBar: {
        flexDirection: 'row',
        marginTop: '15%',
        justifyContent: 'space-between',
        // paddingHorizontal: 16, // Adjusts padding as needed
        // paddingVertical: 8,
    }
    ,
    Logo: {
      flexDirection: 'row',
      alignItems: 'center',

    }
    ,
    Profile: {
      alignItems: 'center'
    }
    ,
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    Logo_text: {
        fontFamily: 'Knewave',
        fontSize: 20,
        marginRight: '20%',
    }   

})