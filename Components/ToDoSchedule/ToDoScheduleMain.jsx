import React, {useState, useEffect} from 'react'
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import profileIcon from '../../Imgs/user_1077114.png'
import { useFonts } from 'expo-font';
import Poly from '../../assets/Fonts/Poly/Poly-Regular.ttf'

const ToDoScheduleMain = ({navigation}) => {
    const [imageUri, setImageUri] = useState(null)
    const [fontsLoaded] = useFonts({
        Poly: Poly        
      })
    
    if (!fontsLoaded) {
        return null; // Handle loading state
    }

    // for picking photo by userself
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

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        
        // Automatically detect the user's locale and time zone
        const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Format date as "day-month-year" with hyphens, using user's local time zone
        const formattedDate = new Intl.DateTimeFormat(userLocale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: userTimeZone // Use user's local time zone
        }).format(date).replace(/\//g, '-'); // Replaces slashes with hyphens

            setCurrentDate(formattedDate);
        }, []);


    return (
        <View style={styles.Container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>

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
                <Text style={{fontFamily: 'Poly', fontSize: 18}}>
                    {currentDate}
                </Text>
            </View>
            <View style={styles.BodyContainer}>
                <Text style={{fontFamily: 'Poly', fontSize: 18}}>
                    Start your daily task easily
                </Text>
                <View>
                    <Image source={require('../../Imgs/Checklist-rafiki.png')}/>
                </View>
                
            </View>
        </View>                 
      )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    topBar: {
        // position: 'absolute', // Make it fixed at the top
        top: "5%", // Align it to the top
        width: '100%', // Full width
        height: 60, // Adjust height as needed
        justifyContent: 'space-between',
        flexDirection: 'row',
        // paddingHorizontal: 10,
        alignItems: 'center',
        zIndex: 10, // Ensure it stays above other content
    },

    Profile: {
        alignItems: 'center',
        top: 22,
        right: "10%",
    },

    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    BodyContainer: {
        justifyContent: "center",
        alignItems: "center",
        top: "3%"
    },
})


export default ToDoScheduleMain
