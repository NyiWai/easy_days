import Reactm, { useState } from 'react';
import {StyleSheet, SafeAreaView,View, Text, Image} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Knewave from '../assets/Fonts/Knewave/Knewave-Regular.ttf';
import { useFonts } from 'expo-font';
const [fontsLoaded] = useFonts({
  Knewave: Knewave
})
const Welcome = () => {
  return (
    <SafeAreaView>
        
        <View style={styles.container}>
            <Text styles={styles.Logo_text}>
                Easy Days
            </Text>
            <View>
                <Image source={require('../Imgs/Welcome-cuate.png')}/>
            </View>
            
        </View>
    </SafeAreaView>
  )
}

export default Welcome


const styles = StyleSheet.create({
  text: {
    fontFamily: 'Knewave',
    fontSize: 24,
  },

  Logo_text: {
    fontFamily: ''
  },
  // container:{
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});
