import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AfterWelcome from './AfterWelcome';
import Welcome from './Welcome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import MainCategories from './MainCategories';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                
                {/* <Stack.Screen 
                    name="AfterWelcome"
                    component={AfterWelcome}
                    options={{headerShown: false}}
                /> */}
                <Stack.Screen
                    name="AfterWelcome"
                    component={AfterWelcome}
                    options={({ navigation }) => ({
                    headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    ),
                    headerTitle: '',
                    headerStyle: { 
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                    })}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>
                        ),
                        headerTitle: '',
                        headerStyle: { 
                            shadowColor: 'transparent',
                            elevation: 0,
                        },
                    })}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>
                        ),
                        headerTitle: '',
                        headerStyle: { 
                            shadowColor: 'transparent',
                            elevation: 0,
                        },
                    })}
                />
                <Stack.Screen 
                    name="MainCategories"
                    component={MainCategories}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;