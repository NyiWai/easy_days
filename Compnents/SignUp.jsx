import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const SingUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword1Visible, setIsPassword1Visible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);


  const handleLogin = () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Onboard!</Text>
        <Text>Let’s help you keep up with your tasks.</Text>
      </View>

      <View style={styles.InputsContainer}>

        {/* Name*/}
        <View style={styles.InputContainer}>
          <Text style={styles.label}>Name</Text>

          <View style={styles.passwordEyeContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full Name . . ."
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

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

        {/*New Password field  */}
        <View style={styles.InputContainer} >
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordEyeContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password . . ."
              secureTextEntry={!isPassword1Visible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eye} onPress={() => setIsPassword1Visible(!isPassword1Visible)}>
              {isPassword1Visible ? <Ionicons name="eye" size={22} color="black" /> : <Ionicons name="eye-off-sharp" size={24} color="black" />}
            </TouchableOpacity>
          </View>
        </View>

        {/*Comfirm Password  */}
        <View style={styles.InputContainer} >
          <Text style={styles.label}>Confirm password</Text>

          <View style={styles.passwordEyeContainer}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password . . ."
              secureTextEntry={!isPassword2Visible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eye} onPress={() => setIsPassword2Visible(!isPassword2Visible)}>
              {isPassword2Visible ? <Ionicons name="eye" size={22} color="black" /> : <Ionicons name="eye-off-sharp" size={24} color="black" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Button  */}
      <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AfterWelcome')}>
                    <Text style={styles.LinkText}>Sign In </Text>
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
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  InputsContainer: {
    width: 310,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  InputContainer: {
    padding: 15,
  },
  passwordEyeContainer: {
    backgroundColor: '#F3F3F3',
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

  button: {
    width: 150,
    backgroundColor: '#36C8E2',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    padding:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
LinkText: {
  paddingLeft: 5,
  color: '#36C8E2',
}
});

export default SingUp;