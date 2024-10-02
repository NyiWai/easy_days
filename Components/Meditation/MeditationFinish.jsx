import React, { Component, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';

const MeditationFinsh = ({ navigation }) => {
  const flower_images = [
    require('../../assets/flowerImg/1.png'),
    require('../../assets/flowerImg/2.png'),
    require('../../assets/flowerImg/3.png'),
    require('../../assets/flowerImg/4.png'),
    require('../../assets/flowerImg/5.png'),
    require('../../assets/flowerImg/6.png'),
    require('../../assets/flowerImg/7.png'),
  ];
  const days = Array.from({length:7},(_,i)=> i+1);
  const meditateDay = [1,2];
  const streakDays = 7
  return (
    <>
      <View style={styles.container}>
        <View style={styles.steakContainer} r>
          {days.map((day,index) =>
            <View 
            key={index}
            style={{position:'relative', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
              <Text style={!meditateDay.includes(day) ? styles.activeDay : styles.unActiveDay}>D{index+1}</Text>

              <CircularProgress
                  value={90}
                  radius={15}
                  inActiveStrokeOpacity={0.5}
                  activeStrokeWidth={5}
                  inActiveStrokeWidth={5}
                  progressValueStyle={{ fontWeight:'bold', color: 'gray'}}
                  strokeColorConfig={[
                    { color: 'red', value: 0 },
                    { color: 'skyblue', value: 50 },
                    { color: '#92E3A9', value: 100 },
                  ]}
              />
            </View>
          )}

        </View>
        <View style={styles.Bg}>
          <Image source={require('../../Imgs/Mindfulness-bro.png')} />
        </View>
        {streakDays &&
            <>
              <Image source={flower_images[streakDays - 1]}
              style={{ position: 'absolute', width: 210, height: 210, bottom: 63}} />
              {/* <Image source={flower_images[streakDays - 1]} */}
              {/* //   style={{ position: 'absolute', width: 120, height: 120, bottom:140,left:30}} /> */}
              {/* // <Image source={flower_images[streakDays - 2]}
                style={{ position: 'absolute', width: 70, height: 70, bottom:160, left:-1}} /> */}
              {/* <Image source={flower_images[streakDays - 2]}
                style={{ position: 'absolute', width: 150, height: 150, bottom:110, right:170}} />     */}
            </>
        }
        <View style={{position:'absolute',backgroundColor:'white',width:500,height:92,bottom:90}}></View>

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
            <Text style={styles.buttonText}>Main</Text>
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
  Bg:{
  },
  // Day streak 
  steakContainer: {
    zIndex:1,
    position: 'absolute',
    borderRadius: 15,
    // borderWidth: 3,
    borderColor: '#92E3A9',
    marginTop: 10,
    width: '95%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  steakContainerCustom1: {
    marginLeft: 0,
  },
  steakContainerCustom2: {
    marginLeft: 20,
    // marginRight:20,
  },
  activeDay: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10,
  },
  unActiveDay: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#92E3A9',
    marginBottom: 10,
  },


  description: {
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: '10%'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#92E3A9',
  },
  buttonText: {
    color: '#fff'

  }
});

export default MeditationFinsh
