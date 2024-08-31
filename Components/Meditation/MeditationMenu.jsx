import React, { Component,useState } from 'react'
import { TouchableOpacity,ScrollView, StyleSheet,View, Text, Image } from 'react-native'
import categoriesData from './categoriesData'
// import songsData from './categoriesData'
// import categoriesImage from '../../Imgs/trackCategories/cate1.jpg'


const MeditationMenu = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const handleCategoryClick = (category) => {setSelectedCategory(category);};

  // const filteredSongs = selectedCategory ? songsData.filter((song) => song.category === selectedCategory ): songsData;

  const handleSongPress = (song) => {
    // Handle song press actions here
    console.log('Song pressed:', song);
  };

  return (
    <>
        <View style={styles.container}>
            <Image style={styles.ScreenImage} source={require('../../Imgs/strelxzitzia-plant-bro.png')}/>
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
                      onPress={() => handleCategoryClick('all')}
                      >
                      <Text style={styles.categorieText}>All</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/active-woman-with-tablet-learning-online.png')}/>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                      key={category.id}
                      style={styles.categorie} 
                      onPress={() => handleCategoryClick(category.name)}
                      >
                      <Text style={styles.categorieText}>{category.name}</Text>
                      <Img key={category.id} src={category.cateImage} alt={category.alt} />
                      <Image style={styles.categorieImage} source={category.cateImage}/>
                    </TouchableOpacity>
                   */}
                </ScrollView >

        {/* -----------Display all song---------- */}
                {/* <ScrollView style={styles.trackContainer}>   
                  {filteredSongs.map((song) =>(
                    console.log(song),
                    <TouchableOpacity
                      key={song.id}
                      style={styles.track} 
                      onPress={() => handleSongPress(song)}
                      >
                      <Text>{song.title}</Text>
                      <Image source={require(song.Image)}/>
                    </TouchableOpacity>
                  ))}
                </ScrollView> */}
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
  ScreenImage:{
    alignSelf: "flex-start",
    width:300,
    height:300,
  },
  bottomContainer:{
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bgImage: {
    borderWidth:1,
    flex: 1,
    resizeMode: 'cover',
  },
  bottomSubContainer:{
    position: 'absolute',
  },
  categorieTitle:{
    fontSize: 18,
    marginLeft:18,
  },
  categoriesContainer:{
    backgroundColor: 'transparent',
    height:90,
    margin:8,
  },
  categorie:{
    margin:5,
    borderWidth:1,
    borderRadius:6,
  },
  categorieImage:{
    // position: 'static',
    width:140,
    height:100,
  },
  categorieText:{
    position: 'absolute',
    fontWeight: 'bold',
    color: 'black' 
  },
  trackContainer:{
    backgroundColor: 'transparent',
    height: 240,
    alignSelf: 'center',
  },
  track:{
    backgroundColor:'#92E3A9',
    width:300,
    height:40,
    margin:6,
    borderRadius:6,
    flex: 1,
    maskToBounds: true
  },

});

export default MeditationMenu
