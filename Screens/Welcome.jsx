import React, { useState } from 'react';
import {StyleSheet, SafeAreaView,View, Text, Image, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Knewave from '../assets/Fonts/Knewave/Knewave-Regular.ttf';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AfterWelcome from './AfterWelcome';

const Welcome = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    Knewave: Knewave
  })

  if (!fontsLoaded) {
    return null; // Handle loading state
  }

  return (
    // <SafeAreaView>
        
        <View style={styles.container}>
            <View>
                <Text style={styles.Logo_text}>
                    Easy Days
                </Text>
            </View>
            <View>
                <Image source={require('../Imgs/Welcome-cuate.png')}/>
            </View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('AfterWelcome')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    // </SafeAreaView>
  )
}

export default Welcome


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  Logo_text: {
    fontFamily: 'Knewave',
    fontSize: 24,
    marginTop: '20%',
    marginBottom: '10%',
  },

  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#004AED',
    marginTop: 20
  },
  buttonText:{
    color: '#fff'
    
  }
});
