import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { songsData } from './categoriesData'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import Feather from '@expo/vector-icons/Feather';
import { Audio } from 'expo-av';
import MeditationFinish from './MeditationFinish'


const MeditatioTimeSet = ({ navigation, route }) => {
    const { id } = route.params;
    console.log(id)

    // setTime Variable 
    const HOURS = Array.from({ length: 25 }, (_, i) => i);
    const MINUTES = Array.from({ length: 60 }, (_, i) => i);
    const [iniHours, setiniHours] = useState(0);
    let [hours, setHours] = useState(0);
    let [iniMinutes, setiniMinutes] = useState(0);
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playRingtone, setPayRingtone] = useState(false)
    let [sounLoad,setSounLoad] = useState(false)
    

    // Sound presssing 
    const [loading, setLoading] = useState(false);
    const [sound1, setSound1] = useState(null);
    const [sound2, setSound2] = useState(null);


    // Main Method 
    const digitFormat = (time) => `${time.toString().padStart(2, '0')}`

    useEffect(() => {
        const loadSongs = async () => {
          try {
            setSounLoad(true)
            const { sound: sound1Instance } = await Audio.Sound.createAsync(
              songsData[id].audio,
              { shouldPlay: false, isLooping: true }
            );
            const { sound: sound2Instance } = await Audio.Sound.createAsync(
                songsData[id - 1].audio,
              { shouldPlay: false, isLooping: true }
            );
            if(sound1Instance._loaded && sound2Instance._loaded){

                setSound1(sound1Instance);
                setSound2(sound2Instance);
                console.log('Sounds loaded');
                setSounLoad(false)
            }
          } catch (error) {
            console.error('Error loading sounds:', error);
          }
        };
    
        const unloadSongs = async () => {
          if (sound1) {
            await sound1.unloadAsync();
          }
          if (sound2) {
            await sound2.unloadAsync();
          }
          console.log('Sounds unloaded');
        };
    
        loadSongs();
        return unloadSongs;
      }, [navigation]);


    const handlePlayPause = async () => {
        setHours(iniHours)
        setMinutes(iniMinutes)
        setSeconds(0)
        if (iniMinutes > 0 || iniHours > 0) {
            setIsPlaying(!isPlaying);
        }
    };

    const playSound=async()=>{
        await sound1.playAsync()
    }

    const stopSound=async()=>{
        if (sound1){
            await sound1.stopAsync()
        }else{
            console.log("stil loading sound")
        }
     
    }

    const playFinishSound=async()=>{
        await sound2.playAsync()
    }

    const handleFinishPage =async()=>{
        if(playRingtone === true){
            await sound2.stopAsync()
            setPayRingtone(false);
            navigation.navigate('MeditationFinish')
        }
    }
    
    useEffect(() => {
        let min
        let hour
        let sec
        const intervalId = setInterval(() => {
            if (isPlaying === true) {
                playSound()
                setSeconds((prevSeconds) => {
                    sec = prevSeconds
                    console.log("sec", prevSeconds, seconds)
                    if (sec < 1 ) {
                        console.log("stop", min, hour)
                        if ( min< 1 && hour < 1 ) {
                            clearInterval(intervalId);
                            setIsPlaying(false);
                            setPayRingtone(true)
                            stopSound()
                            playFinishSound()
                            return 0;

                        } else {
                            setMinutes((prevMinutes) => {
                                min = prevMinutes
                                console.log("min", min )
                                if (prevMinutes < 1) {
                                    setHours((prevHours) => {
                                        console.log("hor", prevHours)
                                        hour = prevHours
                                        if (prevHours < 1) {
                                            return 0;
                                        }
                                        return prevHours - 1;
                                    });
                                    if(hour<1){
                                        return 0
                                    }else{
                                        return 59;
                                    }
                                }
                                return prevMinutes-1;
                            });
                            if(min<1){
                                return 0
                            }else{
                                return 59;
                            }
                            return 59;
                        }
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }else{
                clearInterval(intervalId);
                stopSound()
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isPlaying]);


    return <>
        {playRingtone === true &&
            <View style={{ flex: 1, position: 'absolute', zIndex: 1, width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                <View style={{
                    width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    filter: 'blur(30px)',
                }}/>
                <View style={{
                    position: 'absolute', backgroundColor: 'white', alignSelf: 'center', bottom: 180, marginVertical: 'auto', alignItems: 'center', justifyContent: 'center', borderColor:
                        'white', borderRadius: 15, width: '80%', padding: 20, borderColor: 'gray', borderWidth: 1.5,
                }}>
                    <Text style={{ fontSize: 20, paddingBottom: 20, fontWeight: 'bold' }}>Congradulation !</Text>

                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum ducimus aliquid aliquam. Molestias qui laborum culpa eveniet nesciunt! Temporibus, natus corporis dolores dignissimos explicabo atque vero expedita accusantium amet!</Text>

                    <TouchableOpacity
                        style={{ padding: 10, marginTop: 15, alignSelf: 'flex-end', right: 10, backgroundColor: '#19C0DE', borderRadius: 5 }}
                        onPress={handleFinishPage}
                        
                    >
                        <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Image style={styles.songImage} source={songsData[id - 1].songImage} />
            </View>

            <View style={styles.centerSection}>
            {sounLoad === true ?
            <Text>Loading...</Text>
            :
            <>
            {isPlaying ?
                <View style={styles.timeSetContainer}>
                   <View style={styles.titleTimeSetCon}>
                       <Text style={styles.titleText}>Hrs</Text>
                       <Text style={styles.titleText}>Mins</Text>
                   </View>

                   <View style={{ flexDirection: 'row', borderColor: '#92E3A9', borderRadius: 10, borderWidth: 2, width: '100%', height: '68%', overflow: 'hidden', alignItems: 'center', justifyContent: 'space-around' }} >

                       <View style={{ flexDirection: "column", justifyContent: 'space-around' }} >
                           {
                               hours - 1 >= 0 ?
                                   <View style={styles.wheelContainer}>
                                       <Text style={styles.unActiveWheelText}>{digitFormat(hours - 1)}</Text>
                                   </View>
                                   :
                                   <View style={styles.wheelContainer}>
                                   </View>
                           }
                           <View style={styles.wheelContainer}>

                               <Text style={styles.activeWheelText}>{digitFormat(hours)}</Text>
                           </View>
                           {
                               hours + 1 < 24 ?
                                   <View style={styles.wheelContainer}>
                                       <Text style={styles.unActiveWheelText} >{digitFormat(hours + 1)}</Text>
                                   </View>
                                   :
                                   <View style={styles.wheelContainer}></View>
                           }
                       </View>
                       <Text style={styles.titleText}>:</Text>

                       <View style={{ flexDirection: "column", justifyContent: 'space-around' }} >
                           {
                               minutes - 1 >= 0 ?
                                   <View style={styles.wheelContainer}>
                                       <Text style={styles.unActiveWheelText}>{digitFormat(minutes - 1)}</Text>
                                   </View>
                                   :
                                   <View style={styles.wheelContainer}>
                                   </View>
                           }
                           <View style={styles.wheelContainer}>

                               <Text style={styles.activeWheelText}>{digitFormat(minutes)}</Text>
                           </View>
                           {
                               minutes + 1 < 60 ?
                                   <View style={styles.wheelContainer}>
                                       <Text style={styles.unActiveWheelText} >{digitFormat(minutes + 1)}</Text>
                                   </View>
                                   :
                                   <View style={styles.wheelContainer}></View>
                           }
                       </View>


                   </View>
                   <View style={{ position: 'absolute', right: -30, backgroundColor: 'white', marginVertical: 95 }}>
                       <CircularProgress
                           value={seconds}
                           radius={30}
                           maxValue={59}
                           activeStrokeWidth={5}
                           inActiveStrokeWidth={4}
                           progressValueColor={'gray'}
                           title={'Sec'}
                           titleColor={'gray'}
                           titleStyle={{ fontWeight: 'bold' }}
                       />

                   </View>
                </View>
            :
                <View style={styles.timeSetContainer}>

                    <View style={styles.titleTimeSetCon}>
                        <Text style={styles.titleText}>Hrs</Text>
                        <Text style={styles.titleText}>Mins</Text>
                    </View>

                    <View style={styles.bodyTimeSetCon}>

                        {/* HOURS  */}
                        <View style={styles.pickerWrapper}>
                            <View style={{ height: 250, alignItems: 'center', top: -60 }}>
                                <WheelPickerExpo
                                    height={250}
                                    width={100}
                                    initialSelectedIndex={12}
                                    items={HOURS.map((item) => ({ label: digitFormat(item) }))}
                                    onChange={({ index }) => {
                                        setiniHours(index);
                                    }}
                                />
                            </View>
                        </View>

                        <Text style={styles.titleText}>:</Text>

                        {/* Minutes  */}
                        <View style={styles.pickerWrapper}>
                            <View style={{ height: 250, alignItems: 'center', top: -60 }}>
                                <WheelPickerExpo
                                    height={250}
                                    width={100}
                                    initialSelectedIndex={30}
                                    items={MINUTES.map((item) => ({ label: digitFormat(item) }))}
                                    onChange={({ index }) => {
                                        setiniMinutes(index);
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            }
            </>
            }
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.playButton} onPress={handlePlayPause} >
                    {isPlaying ?
                        <Feather name="pause-circle" size={110} color="#92E3A9" />
                        :
                        <Feather name="play-circle" size={110} color="#92E3A9" />
                    }
                </TouchableOpacity>

                {isPlaying ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('MeditationFinsh')}
                    >
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.buttonConatiner}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('MeditationMenu')}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('MeditationFinish')}
                        >
                            <Text style={styles.buttonText}>Finish</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

        </View>
    </>
}



const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    //################ ToSection ################

    topSection: {
        position: 'relative',
        width: '100%',
        height: '30%'
    },
    songImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    alarmContainer: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        borderWidth: 2,
        paddingLeft: 8,
        borderColor: '#92E3A9',
        marginVertical: 5,
        paddingVertical: 1,
        width: 105,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    alarmContainerCustom1: {
        marginLeft: 0,
    },
    alarmContainerCustom2: {
        marginLeft: 20,
        // marginRight:20,
    },
    activeDay: {
        fontSize: 7,
        fontWeight: 'bold',
        color: 'white',
        width: 8
    },
    unActiveDay: {
        fontSize: 7,
        fontWeight: 'bold',
        color: '#92E3A9',
        width: 8
    },
    dateScreen: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
    },

    //################ Center Section ################
    centerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '35%'
    },
    timeSetContainer: {
        width: '60%',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    ringContainer: {
        fontWeight: 'bold',
        borderWidth: 2,
        alignSelf: 'flex-end',
        top: 10,
        right: 10,
        width: 40,
        padding: 7,
        borderRadius: 10,
        borderColor: '#92E3A9',
        alignItems: 'center',
    },
    titleText: {
        marginVertical: 10,
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#92E3A9'
    },
    bodyTimeSetCon: {
        padding: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#92E3A9',
    },
    titleTimeSetCon: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    pickerWrapper: {
        position: 'relative',
        // flexWrap: 'wrap',
        borderRadius: 8,
        width: '50%',
        height: 130,
        // borderWidth:2,
        overflow: 'hidden',
        // borderColor: '#92E3A9',
    },
    picker: {
        color: '#92E3A9',
        fontSize: 25,
        fontWeight: 'bold',
    },
    pickerItem: {
        color: "#92E3A9",
        fontSize: 25,
        fontWeight: 'bold',
    },

    wheelContainer: {
        marginHorizontal: 30,
        width: 70,
        height: 50,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeWheelText: {
        fontSize: 27,
    },
    unActiveWheelText: {
        fontSize: 17,
        color: 'gray'
    }
    ,
    //################ Buttom Section ################

    bottomSection: {

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '35%'
    },
    playButton: {
        marginTop: 0,
        marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#92E3A9',
        marginHorizontal: 40,
        marginBottom: 10,

    },
    buttonText: {
        color: '#fff'
    },
    timeTitle: {
        fontSize: 120,
        color: '#92E3A9'
    },
    buttonConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    // For alert 
    ReminderContainer: {
        position: 'absolute', // Ensures it can overlap other clockcomponents
        left: '5%', // Adjust horizontal position
        backgroundColor: '#555555',
        borderRadius: 20,
        padding: 20,
        zIndex: 10,
        color: 'white', // Corrected property name from `fontColor` to `color`
        justifyContent: 'center',
        alignItems: 'center',
        width: "90%"
    },
    remindButtonContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionReminderButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    optionText: {
        color: '#FFF',
        fontSize: 16,
    },
    selectedOption: {
        color: '#36C8E2', // Blue color for selected option
    },

});



export default MeditatioTimeSet