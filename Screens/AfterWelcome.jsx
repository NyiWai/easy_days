import React from 'react'
import { StyleSheet,View, Text, Image } from 'react-native'

const AfterWelcome = () => {
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
});

export default AfterWelcome
