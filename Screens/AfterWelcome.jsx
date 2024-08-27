import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,View, Text, Image } from 'react-native'
import SignIn from "../Components/SignIn"
import SignUp from "../Components/SignUp"
import MainCategories from './MainCategories'

const AfterWelcome = ({navigation}) => {
  return (
    <>
        <View style={styles.container}>
            <View>
                <Text style={styles.Logo_text}>
                    Easy Days
                </Text>
            </View>
            <View style={styles.Bg}>
                <Image source={require('../Imgs/active-woman-with-tablet-learning-online.png')}/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>SignIn</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('MainCategories')}
                >
                    <Text style={styles.buttonText}>MainCate</Text>
              </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({

  Logo_text: {
    fontFamily: 'Knewave',
    fontSize: 24,
    marginBottom: '10%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: '10%'
  },

  button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#19C0DE',
    marginTop: 20
  },
  buttonText:{
    color: '#fff'
    
  }
});

export default AfterWelcome
