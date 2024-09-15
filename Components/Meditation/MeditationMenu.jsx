import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity, ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import { categoriesData, songsData } from './categoriesData';




const MeditationMenu = ({ navigation }) => {
  const [timeSet, setTimeSet] = useState(null);
  const [loop, setLoop] = useState(false);
  const [Song, setSong] = useState(null);
  const [soundOn, setSoundOn] = useState(null);
  const [onPlay, setOnPlay] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSongCatePress = (category) => { setSelectedCategory(category) };
  const filteredSongs = selectedCategory ? songsData.filter((song) => song.category === selectedCategory) : songsData;

  const unloadSong = async () => {
    try {
      if (soundOn !== null) {
        await soundOn.stopAsync();
        await soundOn.unloadAsync();
        setOnPlay(false)
        setSoundOn(null)
        setSong(null)
        console.log('unload song');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("new Sound loaded")
    console.log(soundOn)
    return async () => {
      if (Song) {
        await unloadSong();
        console.log("remove song2")
      }
      console.log('Leave');
    };
  }, [navigation,soundOn,timeSet]);

  const handlePlayPress = async (song) => {
    if (loading === false){
        if (Song === null || song.id !== Song.id) {
          if (Song) {
            await unloadSong();
            console.log("remove song1")
          }
          setSong(song)
          setLoading(true)
          const { sound } = await Audio.Sound.createAsync(song.audio);
          if (sound._loaded === true) {
              setSoundOn(sound)
              setLoading(false)
              setOnPlay(true)
              await sound.playAsync()
              setLoop(true)                         //loop true
            console.log("audo is ready")
          }
        } else {
          if (song.id === Song.id) {
            if (onPlay === true) {
              console.log("pause")
              setOnPlay(false)
              await soundOn.pauseAsync()
            } else {
              console.log("Resume")
              setOnPlay(true)
              await soundOn.playAsync()
              setLoop(true)                         //loop true
            }
          }
        }
    }else{
        console.log("song is loading")
    }
  };


useEffect(()=>{
    let stillTime = 0 
    const intervalId = setInterval(() => {
        if(soundOn !== null){
            soundOn.setOnPlaybackStatusUpdate((status) => {
            console.log(status.positionMillis,status.durationMillis)
            if (status.positionMillis >= status.durationMillis) {
                soundOn.setStatusAsync({positionMillis:0,shouldPlay:false})
                setOnPlay(false)
                console.log("reset Song")
                clearInterval(intervalId);
                setLoop(false)                         //loop false
            }else if(stillTime === status.positionMillis){
                clearInterval(intervalId);
                console.log("stop loop Song",stillTime,status.positionMillis)
                setLoop(false)                         //loop false
            }
            stillTime = status.positionMillis
        }
        );
        }else{
            clearInterval(intervalId);
            setLoop(false)                         //loop false
        }
    }, 2000);
    return async() => {
        clearInterval(intervalId);
        console.log("change song")
      };
}, [loop]);


const handleSelectSong = (song) => {
  console.log('song id : ', song.id)
  navigation.navigate('MeditationTimeSet',{'id':song.id})
  setTimeSet(!timeSet)
}

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.ScreenImage} source={require('../../Imgs/strelxzitzia-plant-bro.png')} />
        <View style={styles.bottomContainer}>
          {/* <Image style={styles.bgImage} source={require('../../Imgs/active-woman-with-tablet-learning-online.png')}/> */}

          <View style={styles.bottomSubContainer}>
            <Text style={styles.categorieTitle} >Categories</Text>

            {/* -----------Display all categories ---------- */}
            <ScrollView horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}>
              <TouchableOpacity
                style={styles.categorie}
                onPress={() => handleSongCatePress('')}
              >
                <Text style={styles.categorieText}>All</Text>
                <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate5.jpg')} />
              </TouchableOpacity>

              {categoriesData.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categorie}
                  onPress={() => handleSongCatePress(category.name)}
                >
                  <Text style={styles.categorieText}>{category.name}</Text>
                  <Image style={styles.categorieImage} source={category.cateImage} />
                </TouchableOpacity>
              ))}
            </ScrollView >

            {/* -----------Display all song---------- */}
            <ScrollView style={styles.trackContainer}
              showsVerticalScrollIndicator={false}
            >
              {filteredSongs.map((song) => (
                <TouchableOpacity
                  key={song.id}
                  style={styles.track}
                  onPress={() => handleSelectSong(song)}
                >
                  <Text style={styles.songText}>{song.title}</Text>
                  <Image style={styles.SongImage} source={song.songImage} />
                  <TouchableOpacity style={styles.checkBox} onPress={() => handlePlayPress(song)}
                  >
                    {onPlay === true && Song.id === song.id ?

                      <Feather name="pause-circle" size={28} color="#92E3A9" />
                      :
                      <>
                        {loading === true && Song.id === song.id ?
                          <Image style={styles.loadGif} source={require('../../Imgs/trackCategories/load2.gif')} />
                          :
                          <>{Song !== null && Song.id === song.id ?
                            <Feather name="play-circle" size={28} color="#92E3A9" />
                            :
                            <Feather name="play-circle" size={28} color="white" />
                          }
                          </>
                        }
                      </>
                    }
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
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
  ScreenImage: {
    alignSelf: "flex-start",
    width: 300,
    height: 300,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bgImage: {
    borderWidth: 1,
    flex: 1,
    resizeMode: 'cover',
  },
  bottomSubContainer: {
    position: 'absolute',
  },
  categorieTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 18,
  },
  categoriesContainer: {
    backgroundColor: 'transparent',
    height: 80,
    margin: 8,
  },
  categorie: {
    flex: 1,
    margin: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  categorieImage: {
    flex: 1,
    zIndex: 1,
    resizeMode: 'cover',
    width: 150,
    borderRadius: 10,
    // position: 'relative',   
  },
  categorieText: {
    paddingTop: 5,
    paddingLeft: 10,
    zIndex: 2,
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white'
  },
  trackContainer: {
    backgroundColor: 'transparent',
    height: 240,
    alignSelf: 'center',
  },
  track: {
    backgroundColor: '#92E3A9',
    width: 300,
    height: 40,
    margin: 6,
    borderRadius: 6,
    flex: 1,
    maskToBounds: true
  },
  SongImage: {
    flex: 1,
    zIndex: 1,
    resizeMode: 'cover',
    width: 300,
    borderRadius: 7,
    // position: 'relative',   
  },
  songText: {
    padding: 10,
    paddingLeft: 50,
    zIndex: 2,
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white'
  },
  checkBox: {
    position: 'absolute',
    padding: 6,
    width: 40,
    height: 40,
    zIndex: 2,
    // backgroundColor: 'black',
  },
  loadGif: {
    width: 25,
    height: 25,
  },
});

export default MeditationMenu
