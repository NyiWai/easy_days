import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import Knewave from '../assets/Fonts/Knewave/Knewave-Regular.ttf';
import { useFonts } from 'expo-font';

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCheckBoxOn, setIsCheckBoxOn] = useState(false);

    const [fontsLoaded] = useFonts({
        Knewave: Knewave        
    })

    if (!fontsLoaded) {
        return null; // Handle loading state
    }

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

        <View style={styles.container}>
            <View style={styles.Logo}>
              <Image style={{ width: 50, height: 50 }}
                source={require('../Imgs/done_8476811.png')}
              />
              <Text style={styles.Logo_text}>
                  Easy Days
              </Text>
            </View>
            <Text style={styles.title}>Sign In</Text>

            <View style={styles.InputsContainer}>

                {/* Email*/}
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.passwordEyeContainer}>            
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email "
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>


                {/* Password field  */}

                <Text style={styles.label}>Password</Text>

                <View style={styles.passwordEyeContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password "
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.eye} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible ? <Ionicons name="eye" size={22} color="black" /> : <Ionicons name="eye-off-sharp" size={24} color="black" />}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.forgetPassContainer}>
                <View style={styles.checkBoxContainer}>
                    <TouchableOpacity style={styles.checkBox} onPress={() => setIsCheckBoxOn(!isCheckBoxOn)}>
                        {isCheckBoxOn ? 
                        <MaterialIcons name="check-box" size={18} color="black" />:
                        <MaterialIcons name="check-box-outline-blank" size={18} color="black" />
                        }
                    </TouchableOpacity>
                    <Text>Remember me</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AfterWelcome')}>
                    <Text style={styles.LinkText}>Forget Passwod</Text>
                </TouchableOpacity>
            </View>

            {/* Button  */}
            <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AfterWelcome')}>
                    <Text style={styles.LinkText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
        // </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,

    },
    Logo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%',
    },
    Logo_text: {
        fontFamily: 'Knewave',
        fontSize: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 5,
        // marginLeft: '5%',
    },
    InputContainer: {
        width: '85%',
        // position: 'relative',
        // paddingTop: 15,
        // paddingBottom: 10,
    },
    passwordEyeContainer: {
        // marginLeft: '5%',
        width: '100%',
        position: 'relative',

        backgroundColor:'#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        
    },
    eye: {
        // marginLeft: '5%',
        position: 'absolute',
        marginLeft: '75%'
        // right: '5%',
    },

    input: {
        // paddingVertical: 12,
        backgroundColor: '#fff',
        padding: 15,
        paddingLeft: 15,
        borderRadius: 10,
        fontSize: 16,
        width: '85%',
    },
    checkBoxContainer:{
        flexDirection: 'row',
    },
    checkBox: {
        marginRight: 5,
        marginTop: 3,
    },
    forgetPassContainer: {
        marginTop: '5%',
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    button: {
        width: '40%',
        height: '7%',
        backgroundColor: '#36C8E2',
        borderRadius: 8,
        alignItems: 'center',
        padding: 10,
        margin: 20,
        
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    LinkText: {
        paddingLeft: 5,
        color: '#36C8E2',
    }
});

export default SignIn;