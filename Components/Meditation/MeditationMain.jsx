import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,View, Text, Image } from 'react-native'
import MeditationMenu from './MeditationMenu'

const Meditation = ({navigation}) => {
  return (
    <>
        <View style={styles.container}>
            <View style={styles.Bg}>
                <Image source={require('../../Imgs/Mindfulness-bro.png')}/>
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('MeditationMenu')}
                >
                <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: '#92E3A9',
    marginTop: 20
  },
  buttonText:{
    color: '#fff'
    
  }
});

export default Meditation
