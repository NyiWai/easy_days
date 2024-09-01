// import React, {useState} from 'react'
// import { useFonts } from 'expo-font';
// import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Knewave from '../../assets/Fonts/Knewave/Knewave-Regular.ttf';

// const FocusMain = ({navigation}) => {
//     const [fontsLoaded] = useFonts({
//         Knewave: Knewave        
//       })
    
//     if (!fontsLoaded) {
//         return null; // Handle loading state
//     }



import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import {Audio} from 'expo-av'
import { Picker } from "@react-native-picker/picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const screen = Dimensions.get("window");

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = (length) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

export default class App extends Component {
    state = {
      remainingSeconds: 5,
      isRunning: false,
      isBreak: false,
      isPaused: false,
      selectedMinutes: "0",
      selectedSeconds: "0",
      breakMinutes: 0,
      breakSeconds: 5,
      checkSkip: false,
      sound: null,
    };
    
    interval = null;
    
    async componentDidMount() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/Sounds/CLOCK TICKING SILENCE AMBIENCE.mp3"),
        { shouldPlay: false, isLooping: true }
      );
      this.setState({ sound });
    }
    
    componentWillUnmount() {
      if (this.state.sound) {
        this.state.sound.stopAsync();
        this.state.sound.unloadAsync();
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
    
    componentDidUpdate = async (prevProp, prevState) => {
      if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
        this.stop();
    
        // Toggle between focus and break sessions
        if (this.state.isBreak) {
          this.setState({ isBreak: false });
          await this.stopSound();
          this.resetSession(); // Reset to beginning after break
        } else {
          this.setState({ isBreak: true });
          this.startBreakSession();
        }
      }
    };
    
    startFocusSession = async () => {
      const { selectedMinutes, selectedSeconds } = this.state;
      const remainingSeconds =
        parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10);
      this.setState({ remainingSeconds, isRunning: true, isPaused: false, isBreak: false });
      await this.playSound();
      this.startTimer();
    };
    
    startBreakSession = async () => {
      const { breakMinutes, breakSeconds } = this.state;
      const remainingSeconds = breakMinutes * 60 + breakSeconds;
      this.setState({ remainingSeconds, isRunning: true, isPaused: false, isBreak: true });
      await this.playSound();
      this.startTimer();
    };
    
    startTimer = () => {
      if (this.interval) clearInterval(this.interval); // Clear existing interval
      this.interval = setInterval(() => {
        this.setState((state) => ({
          remainingSeconds: state.remainingSeconds - 1,
        }));
      }, 1000);
    };
    
    playSound = async () => {
      if (this.state.sound) {
        await this.state.sound.setIsLoopingAsync(true);
        await this.state.sound.playAsync();
      }
    };
    
    stopSound = async () => {
      if (this.state.sound) {
        await this.state.sound.stopAsync();
      }
    };
    
    pause = async () => {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({ isPaused: true, });
      if (this.state.sound) {
        await this.state.sound.pauseAsync();
      }
    };
    
    resume = async () => {
      this.setState({ isPaused: false, isRunning: true });
      this.startTimer();
      if (this.state.sound) {
        await this.state.sound.playAsync();
      }
    };
    
    stop = async () => {
      clearInterval(this.interval);
      this.interval = null;
      await this.stopSound();
      this.setState({
        isRunning: false,
        isPaused: false,
      });
    };
    
    skip = async () => {
      clearInterval(this.interval);
      this.interval = null;
      this.stop();
      this.startBreakSession();
      this.setState({ checkSkip: true });
    };
    
    skipBreak = async () => {
      clearInterval(this.interval);
      this.interval = null;
      await this.stop();
      this.resetSession();
    };
    
    resetSession = () => {
      this.setState({
        isRunning: false,
        isBreak: false,
        isPaused: false,
        selectedMinutes: "0",
        selectedSeconds: "0",
        breakMinutes: 0,
        breakSeconds: 5,
        checkSkip: false,
      });
    };
    

    renderPickers = () => (
      <View style={styles.pickerContainer}>

        <View style={{flexDirection: 'row', width: '70%',justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.pickerLabel}>minutes</Text>
          <Text style={styles.pickerLabel}>seconds</Text>
        </View>

        <View style={{flexDirection: 'row', width: '85%',justifyContent: 'space-between', alignItems: 'center', marginVertical: 20}}>
          <View style={styles.pickerWrapper}>

            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.selectedMinutes}
              onValueChange={(itemValue) => {
                this.setState({ selectedMinutes: itemValue });
              }}
              mode="dropdown"
            >
              {AVAILABLE_MINUTES.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>

          </View>


          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.selectedSeconds}
              onValueChange={(itemValue) => {
                this.setState({ selectedSeconds: itemValue });
              }}
              mode="dropdown"
            >
              {AVAILABLE_SECONDS.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>

          </View>   
        </View>
      </View>
    );
    

    render() {
      const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
      const { isBreak, isRunning, isPaused, checkSkip } = this.state;
    
      const imageSource = isBreak ? require("../../Imgs/undraw_Chilling_re_4iq9.png") : require("../../Imgs/Book lover-bro.png");
      const descriptionText = isBreak ? "Freely get rest" : "Don't lose your focus";
    
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.innerContainer}>

            <Image source={imageSource} style={styles.illustration} />

            {isRunning ? (
              <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
            ) : (
              this.renderPickers()
            )}
            <Text style={styles.descriptionText}>{descriptionText}</Text>

            {isRunning && !isPaused ? (
              <TouchableOpacity onPress={this.pause} style={[styles.button, styles.buttonPause]}>
                <FontAwesome5 name="pause" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={isPaused ? this.resume : this.startFocusSession}
                style={styles.button}
              >
                <AntDesign name="caretright" size={35} color="black" />
              </TouchableOpacity>
            )}
            <View style={styles.buttonsContainer}>
              {checkSkip ? (
                <TouchableOpacity style={styles.smallButton} onPress={this.skipBreak}>
                  <Text style={styles.smallButtonText}>skip</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.smallButton} onPress={this.skip}>
                  <Text style={styles.smallButtonText}>skip</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5", // Light background color
      alignItems: "center",
      justifyContent: "center",
    },
    innerContainer: {
      // width: screen.width * 0.9,
      height: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      elevation: 3, // Shadow for Android
      // shadowColor: "#000", // Shadow for iOS
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 2,
    },
    illustration: {
      width: 380,
      height: 380,
      marginBottom: 20,
      resizeMode: "contain",
    },
    button: {
      borderWidth: 5,
      borderColor: "#11111",
      width: screen.width / 4,
      height: screen.width / 4,
      borderRadius: screen.width / 2,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    buttonStop: {
      // borderColor: "#FF851B",
      borderColor: "#19C0DE"
    },
    buttonText: {
      fontSize: 40,
      color: "#89AAFF",
    },
    buttonTextStop: {
      color: "#FF851B",
    },
    timerText: {
      color: "#333",
      fontSize: 80,
      fontWeight: "bold",
    },

    // pickerContainer: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   marginVertical: 10,
    // },
    // picker: {
    //   flex: 1,
    //   maxWidth: 100,
    //   ...Platform.select({
    //     android: {
    //       color: "#333",
    //       backgroundColor: "rgba(92, 92, 92, 0.1)",
    //     },
    //   }),
    // },
    // pickerItem: {
    //   color: "#fff",
    //   fontSize: 20,
    //   ...Platform.select({
    //     android: {
    //       marginLeft: 10,
    //       marginRight: 10,
    //     }
    //   })
    // },


    pickerContainer: {
  
      // flexDirection: "row",
      // justifyContent: "space-between",
      alignItems: "center",
      // marginVertical: 20,
    },
    pickerWrapperBox: {
      flexDirection: 'row',
      
    },
    pickerWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      paddingHorizontal: 10,
      paddingVertical: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3, // For Android shadow
    },
    picker: {
      width: 120,
      color: "#333",
    },
    pickerItem: {
      color: "#333",
      fontSize: 20,
    },
    pickerLabel: {
      // marginLeft: 10,
      fontSize: 18,
      color: "#666",
    },

    descriptionText: {
      color: "#666",
      fontSize: 18,
      marginBottom: 10,
    },
    smallButton: {
      backgroundColor: "#E0E0E0",
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 20,
      marginHorizontal: 10,
    },
    smallButtonText: {
      color: "#333",
      fontSize: 16,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: screen.width * 0.6,
    },
  });

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   StatusBar,
//   TouchableOpacity,
//   Platform,
//   Image,
// } from "react-native";

// import AntDesign from '@expo/vector-icons/AntDesign';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// const screen = Dimensions.get("window");

// const formatNumber = (number) => `0${number}`.slice(-2);

// const getRemaining = (time) => {
//   const minutes = Math.floor(time / 60);
//   const seconds = time - minutes * 60;
//   return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
// };

// const createArray = (length) => {
//   const arr = [];
//   let i = 0;
//   while (i < length) {
//     arr.push(i.toString());
//     i += 1;
//   }
//   return arr;
// };

// const AVAILABLE_MINUTES = createArray(60);
// const AVAILABLE_SECONDS = createArray(60);

// export default class App extends Component {
//   state = {
//     remainingSeconds: 5,
//     isRunning: false,
//     selectedMinutes: "0",
//     selectedSeconds: "0",
//   };

//   interval = null;

//   componentDidUpdate = (prevProp, prevState) => {
//     if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
//       this.stop();
//     }
//   };

//   componentWillUnmount() {
//     if (this.interval) {
//       clearInterval(this.interval);
//     }
//   }

//   start = () => {
//     this.setState((state) => ({
//       remainingSeconds:
//         parseInt(state.selectedMinutes, 10) * 60 +
//         parseInt(state.selectedSeconds, 10),
//       isRunning: true,
//     }));
//     this.interval = setInterval(() => {
//       this.setState((state) => ({
//         remainingSeconds: state.remainingSeconds - 1,
//       }));
//     }, 1000);
//   };

//   stop = () => {
//     clearInterval(this.interval);
//     this.interval = null;
//     this.setState({
//       remainingSeconds: 5,
//       isRunning: false,
//     });
//   };

//   renderPickers = () => (
//     <View style={styles.pickerContainer}>
//       {/* Picker for Minutes */}
//       <Picker
//         style={styles.picker}
//         itemStyle={styles.pickerItem}
//         selectedValue={this.state.selectedMinutes}
//         onValueChange={(itemValue) => {
//           this.setState({ selectedMinutes: itemValue });
//         }}
//         mode="dropdown"
//       >
//         {AVAILABLE_MINUTES.map((value) => (
//           <Picker.Item key={value} label={value} value={value} />
//         ))}
//       </Picker>
//       <Text style={styles.pickerItem}>minutes</Text>
//       {/* Picker for Seconds */}
//       <Picker
//         style={styles.picker}
//         itemStyle={styles.pickerItem}
//         selectedValue={this.state.selectedSeconds}
//         onValueChange={(itemValue) => {
//           this.setState({ selectedSeconds: itemValue });
//         }}
//         mode="dropdown"
//       >
//         {AVAILABLE_SECONDS.map((value) => (
//           <Picker.Item key={value} label={value} value={value} />
//         ))}
//       </Picker>
//       <Text style={styles.pickerItem}>seconds</Text>
//     </View>
//   );

//   render() {
//     const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
//     const { isRunning } = this.state;

//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" />
//         {/* Conditionally render innerContainer based on isRunning state */}
//         {isRunning && (
//           <View style={styles.innerContainer}>
//             <Image
//               source={require("../../Imgs/Book lover-bro.png")}
//               style={styles.illustration}
//             />
//             <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
//             <Text style={styles.descriptionText}>Focus on something</Text>
//             <TouchableOpacity
//               onPress={this.stop}
//               style={[styles.button, styles.buttonStop]}
//             >
//               <FontAwesome5 name="pause" size={24} color="black" />
//             </TouchableOpacity>
//             <View style={styles.buttonsContainer}>
//               <TouchableOpacity style={styles.smallButton}>
//                 <Text style={styles.smallButtonText}>edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.smallButton}>
//                 <Text style={styles.smallButtonText}>skip</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         {!isRunning && this.renderPickers()} {/* Show pickers only when timer is not running */}
//         {!isRunning && (
//           <TouchableOpacity onPress={this.start} style={styles.button}>
//             <AntDesign name="caretright" size={35} color="black" />
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   // Styles remain the same as in your provided code
// });