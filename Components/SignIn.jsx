import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCheckBoxOn, setIsCheckBoxOn] = useState(false);

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

        <View style={styles.container}>

            <Text style={styles.title}>Sign In</Text>

            <View style={styles.InputsContainer}>

                {/* Email*/}
                <View style={styles.InputContainer}>
                    <Text style={styles.label}>Email Address</Text>

                    <View style={styles.passwordEyeContainer}>            
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email . . ."
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                </View>


                {/* Password field  */}
                <View style={styles.InputContainer} >
                    <Text style={styles.label}>Password</Text>

                    <View style={styles.passwordEyeContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password ......"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.eye} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            {isPasswordVisible ? <Ionicons name="eye" size={22} color="black" /> : <Ionicons name="eye-off-sharp" size={24} color="black" />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.forgetPassContainer}>
                <View style={styles.checkBoxContainer}>
                    <TouchableOpacity style={styles.eye} onPress={() => setIsCheckBoxOn(!isCheckBoxOn)}>
                        {isCheckBoxOn ? 
                        <MaterialIcons name="check-box" size={18} color="black" />:
                        <MaterialIcons name="check-box-outline-blank" size={18} color="black" />
                        }
                    </TouchableOpacity>
                    <Text>Remmenber me</Text>
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
        width: 280,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,

    },
    InputsContainer: {
        width: 270,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    InputContainer: {
        paddingTop: 15,
        paddingBottom: 10,
    },
    passwordEyeContainer: {
        backgroundColor:'#F3F3F3',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eye: {
        paddingRight: 10,
    },
    input: {
        height: 40,
        width: 230,
        padding: 10,

    },
    checkBoxContainer:{
        flexDirection: 'row',
    },
    forgetPassContainer: {
        width: 260,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    button: {
        width: 180,
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