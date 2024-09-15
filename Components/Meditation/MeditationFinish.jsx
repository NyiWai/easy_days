import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,View, Text, Image } from 'react-native'


const MeditationFinsh = ({navigation}) => {
  return (
    <>
        <View style={styles.container}>
            <View style={styles.Bg}>
                <Image source={require('../../Imgs/Mindfulness-bro.png')}/>
            </View>
            <Text style={styles.description}>
                Congratulations, your mind’s got peaceful for ____ minutes.
                If you will meditate again, press continue button or not, press exit button Thanks.
            </Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('MeditationMenu')}
                    >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('MeditationMain')}
                    >
                    <Text style={styles.buttonText}>MainMenu</Text>
                </TouchableOpacity>
            </View>
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
  description:{
    width: '80%',
  },
  buttonsContainer:{
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
  },
  buttonText:{
    color: '#fff'
    
  }
});

export default MeditationFinsh