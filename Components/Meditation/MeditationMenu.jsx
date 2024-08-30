import React, { Component } from 'react'
import { TouchableOpacity,ScrollView, StyleSheet,View, Text, Image } from 'react-native'

const MeditationMenu = ({navigation}) => {
  return (
    <>
        <View style={styles.container}>
            <Image style={styles.ScreenImage} source={require('../../Imgs/strelxzitzia-plant-bro.png')}/>
            <View style={styles.bottomContainer}>
              <Image style={styles.bgImage} source={require('../../Imgs/active-woman-with-tablet-learning-online.png')}/>

              <View style={styles.bottomSubContainer}>
                <Text style={styles.categorieTitle} >Categories</Text>
                <ScrollView horizontal={true} 
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}>
                    <TouchableOpacity style={styles.categorie} 
                      onPress={() => navigation.navigate('MeditationMenu')}
                      >
                      <Text style={styles.categorieText}>Orbit</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate4.jpg')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorie} 
                      onPress={() => navigation.navigate('MeditationMenu')}
                      >
                      <Text style={styles.categorieText}>Orbit</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate4.jpg')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorie} 
                      onPress={() => navigation.navigate('MeditationMenu')}
                      >
                      <Text style={styles.categorieText}>Orbit</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate4.jpg')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorie} 
                      onPress={() => navigation.navigate('MeditationMenu')}
                      >
                      <Text style={styles.categorieText}>Orbit</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate4.jpg')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorie} 
                      onPress={() => navigation.navigate('MeditationMenu')}
                      >
                      <Text style={styles.categorieText}>Orbit</Text>
                      <Image style={styles.categorieImage} source={require('../../Imgs/trackCategories/cate4.jpg')}/>
                    </TouchableOpacity>
                </ScrollView >
                <ScrollView style={styles.trackContainer}>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
                  <View style={styles.track}>
                  </View>
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
    borderRadius:6,
  },
  categorieImage:{
    position: 'static',
    width:140,
    // height:100,
    resizeMode: 'contain',
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
