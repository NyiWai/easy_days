import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Sound from 'react-native-sound';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Song = (id,title,category,songImage,mp3) => {
  const [playingSong, setPlayingSong] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Sound(playingSong?.audio, (error) => {
      if (error) {
        console.error('Failed to load the sound', error);
      }
    });
    setSound(newSound);

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [playingSong]);

  const handlePlayPress = (song) => {
    if (sound) {
      sound.stop();
      sound.release();
    }

    const newSound = new Sound(song.audio, (error) => {
      if (error) {
        console.error('Failed to load the sound', error);
      } else {
        newSound.play();
      }
    });

    setPlayingSong(song);
    setSound(newSound);
  };

  return (
    <View style={StyleSheet.container}>
        <TouchableOpacity key={id} onPress={() => handlePlayPress(mp3)}>
          <Image source={songImage} style={{ width: 200, height: 200 }} />
          <Text>{title}</Text>
          {playingSong?<Text>Playing...</Text>:<Text/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MeditatioTimeSet',{ title,songImage,mp3 })}>
          <Image source={songImage} style={{ width: 200, height: 200 }} />
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: '1',
    flexdirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Song;