import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const FocusMain = ({navigation}) => {
    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <View >
                <Image source={require('../../Imgs/Book lover-bro.png')} style={styles.image}/>
            </View>
        </View>
      
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        backgroundColor: '#fff',
        marginTop: '10%'
    },
    image: {
        width: 'auto',

    }
})


export default FocusMain
