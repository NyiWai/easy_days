import React, { State, Component } from "react";
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { withNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Knewave from '../../assets/Fonts/Knewave/Knewave-Regular.ttf';

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

export default class FocusMain extends Component {
// const FocusMain = ({navigation}) => {


  goToAnotherScreen = () => {
    this.props.navigation.navigate('FocusMain'); // Example navigation
  };

  state = {
    remainingSeconds: 5,
    isRunning: false,
    isBreak: false,
    isPaused: false,
    selectedMinutes: "0",
    selectedSeconds: "0",
    breakMinutes: 5,
    breakSeconds: 0,
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
        this.setState({ isBreak: true, isRunning: true });
        this.startBreakSession();
      }
    }
  };

  startFocusSession = async () => {
    const { selectedMinutes, selectedSeconds } = this.state;
    const remainingSeconds =
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10);
    
    if (selectedMinutes > 0 || selectedSeconds > 0){
      this.setState({ remainingSeconds, isRunning: true, isPaused: false, isBreak: false });
      await this.playSound();
      this.startTimer();
    }

    
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
    this.setState({ isPaused: true });
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
      breakMinutes: 5,
      breakSeconds: 0,
      checkSkip: false,
    });


  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <View style={{ flexDirection: "row", width: "70%", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.pickerLabel}>minutes</Text>
        <Text style={styles.pickerLabel}>seconds</Text>
      </View>

      <View style={{ flexDirection: "row", width: "85%", justifyContent: "space-between", alignItems: "center", marginVertical: 20 }}>
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

    // const [fontsLoaded] = useFonts({
    //   Knewave: Knewave        
    // })
  
    // if (!fontsLoaded) {
    //   return null; // Handle loading state
    // }

    return (
      <View style={styles.container}>

        {/* <View style={styles.innerContainer}> */}
          <View style={styles.topBar}>

            <TouchableOpacity style={{marginStart:10 }}  onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            <View style={styles.Logo}>
              <Image style={{ width: 50, height: 50 }}
                source={require('../../Imgs/done_8476811.png')}
              />
              <Text style={styles.Logo_text}>
                  Easy Days
              </Text>
            </View>

          </View>
          <Image source={imageSource} style={styles.illustration} />

          {isRunning || isBreak ? (
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          ) : (
            this.renderPickers()
          )}
          <Text style={styles.descriptionText}>{descriptionText}</Text>
          
          { 
            !isBreak ? (
              isRunning && !isPaused ? (
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
              )
            ) : (
              <Text> </Text>
            )
          }

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
        {/* </View> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff", // Light background color
      alignItems: "center",
      justifyContent: "center",
    },
    // innerContainer: {
    //   // width: screen.width * 0.9,
    //   height: "100%",
    //   backgroundColor: "#FFFFFF",
    //   // borderRadius: 20,
    //   padding: 15,
    //   alignItems: "center",
    //   elevation: 3, 
    // },
    topBar: {
      position: 'absolute', // Make it fixed at the top
      top: "3%", // Align it to the top
      width: '100%', // Full width
      height: 60, // Adjust height as needed
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      zIndex: 10, // Ensure it stays above other content
    },
    Logo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 0,
    },
    Logo_text: {
      fontFamily: 'Knewave',
      fontSize: 20,
  },
    
    illustration: {
      width: '100%',
      height: 320,
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

    pickerContainer: {
      alignItems: "center",
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
      backgroundColor: "#0090C1",
      borderRadius: 8,
      borderColor: "#0090C1",
      paddingVertical: 6,
      paddingHorizontal: 20,
      marginHorizontal: 10,
    },
    smallButtonText: {
      color: "#ffffff",
      fontSize: 16,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: screen.width * 0.6,
    },
  });
