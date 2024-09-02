import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity,ScrollView, StyleSheet, View, Text, Image,Button } from 'react-native'
import { songsData } from './categoriesData';

const MeditationMenu = ({ navigation }) => {
    const [sound, setSound] = useState(null);
    const [sameSong, setSameSong] = useState(false);
    const [playingSong, setPlayingSong] = useState(null);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(playingSong);
            setSound(sound);
        };
        loadSound();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [playingSong]);
    
    const handlePlayPress = async (song) => {
        if (playingSong.id !== song.id){
            // await sound.pauseAsync();
            if(sound){

                await sound.stopAsync();
                sound.unloadAsync();
                setSound(null)
                setPlayingSong(null);
                
            }
            // Loadig new song .........
            const newSound = new Audio.Sound();
            await newSound.loadAsync(song.mp3);
            await newSound.playAsync();
            setPlayingSong(song);
            setSound(newSound);
        }else{
            if (sameSong) {
                      await sound.pauseAsync();
                    } else {
                      await sound.playAsync();
                    }
                    setSameSong(!sameSong);
                  };
        }
    // const handlePlayPause = async () => {
    //     if (isPlaying) {
    //       await sound.pauseAsync();
    //     } else {
    //       await sound.playAsync();
    //     }
    
    //     setIsPlaying(!isPlaying);
    //   };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.Bg}>
                    <Image source={require('../../Imgs/Mindfulness-bro.png')} />
                </View>

                 <ScrollView>
                    {songsData.map((song) => (
                        <TouchableOpacity key={song.id} style={styles.button} onPress={() => handlePlayPress(song)}>
                        {/* <Image source={song.image} style={{ width: 200, height: 200 }} /> */}
                        <Text>{song.title}</Text>
                        {playingSong?.id === song.id?
                            <View>
                                {sameSong ?  
                                <Feather name="pause-circle" size={28} color="white" />
                                :<Feather name="play-circle" size={28} color="white" />
                                }
                            </View>
                            : 
                            <Feather name="play-circle" size={28} color="white" />
                            
                        }
                        {/* {playingSong?.id === song.id && <Text>Playing...</Text>} */}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                {isPlaying ? <Feather name="pause-circle" size={28} color="white" />:
                <Feather name="play-circle" size={28} color="white" />
                }
                </TouchableOpacity> */}
            </View>
        </>
    )}

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
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
        marginTop: 20
    },
    buttonText: {
        color: '#fff'

    }
});

export default MeditationMenu
