import React, {useState} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import Knewave from '../assets/Fonts/Knewave/Knewave-Regular.ttf';
import profileIcon from '../Imgs/user_1077114.png'
// import * as ImagePicker from 'expo-image-picker'


const MainCategories = ({navigation}) => {
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
          <Text style={{marginTop: '10%',}}>
            Lorem ipsum dolor sit amet consectetur. In libero dolor fames nunc vitae quam ornare fermentum. 
          </Text>
        </View>


        <View style={styles.MainBox}>

          <View style={styles.TwoPairBox}>
                {/* Box 1: Focus */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('FocusMain')}
            >
              <Image source={require('../Imgs/Exams-bro.png')} style={styles.image} />
              <Text style={styles.boxText}>Focus</Text>
            </TouchableOpacity>

            {/* Box 2: Meditation */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('MeditationMain')}
            >
              <Image source={require('../Imgs/Peace of mind-rafiki.png')} style={styles.image} />
              <Text style={styles.boxText}>Meditation</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.TwoPairBox}>
              {/* Box 3: To do schedule */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('ToDoScheduleMain')}
            >
              <Image source={require('../Imgs/undraw_Accept_tasks_re_09mv.png')} style={styles.image} />
              <Text style={styles.boxText}>To do schedule</Text>
            </TouchableOpacity>

            {/* Box 4: Calendar */}
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate('CalendarMain')}
            >
              <Image source={require('../Imgs/calendar.png')} style={styles.image} />
              <Text style={styles.boxText}>Calendar</Text>
            </TouchableOpacity>
          </View>

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
    },
    MainBox: { 
      flex: 1,
      flexWrap: 'wrap', 
      justifyContent: 'space-around',
      marginVertical:'25%',
    },
    box: { 
      width: '45%', 
      padding: 20, 
      marginVertical: 10, 
      alignItems: 'center', 
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderRadius: 10, 
      margin: 5,
    },
    image: { 
      width: 120, 
      height: 100, 
      marginBottom: 10 
    },

    boxText:{
      fontSize: 13,
      width: '100%',
      
    },

    TwoPairBox: {
      flex: 1,
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'space-around'
    }
})