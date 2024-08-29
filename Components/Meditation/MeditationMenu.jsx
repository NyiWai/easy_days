import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,View, Text, Image } from 'react-native'

const MeditationMenu = ({navigation}) => {
  return (
    <>
        <View style={styles.container}>
        
            <View style={styles.Bg}>
                <Image source={require('../../Imgs/strelxzitzia-plant-bro.png')}/>
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

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
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

export default MeditationMenu
