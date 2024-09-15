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
import FocusMain from '../Components/Focus/FocusMain';
import MeditationWelcome from '../Components/Meditation/MeditationWelcome';
import MeditationMain from '../Components/Meditation/MeditationMain';
import MeditationMenu from '../Components/Meditation/MeditationMenu';
import ToDoScheduleMain from '../Components/ToDoSchedule/ToDoScheduleMain';
import MeditationTimeSet from '../Components/Meditation/MeditationTimeSet';
import MeditationFinsh from '../Components/Meditation/MeditationFinish'
import CalendarMain from '../Components/Calendar/CalendarMain';
import ToDoTask from '../Components/ToDoSchedule/ToDoTask';
import Agenda from '../Components/ToDoSchedule/Agenda';
import Birthday from '../Components/ToDoSchedule/Birthday';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />

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
                        <TouchableOpacity style={{marginStart:15 }} onPress={() => navigation.goBack()}>
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
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back" size={28} color="black" />
                            </TouchableOpacity>
                        ),
                        headerTitle: '',
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 1,
                        },
                    })}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
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
                    options={{ headerShown: false }}
                />

                {/* Here start main branchs */}

                <Stack.Screen
                    name="FocusMain"
                    component={FocusMain}
                    options={{
                        headerShown: false,
                    }}
                />

                {/* ............Meditation Section............  */}
                {/* Meditation */}
                <Stack.Screen
                    name="MeditationWelcome"
                    component={MeditationWelcome}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
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
                    name="MeditationMenu"
                    component={MeditationMenu}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
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
                    name="MeditationMain"
                    component={MeditationMain}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
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
                    name="MeditationFinsh"
                    component={MeditationFinsh}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{ marginStart: 15 }} onPress={() => navigation.goBack()}>
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
                    name="MeditationTimeSet"
                    component={MeditationTimeSet}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{ marginStart: 15 }} onPress={() => navigation.goBack()}>
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
                    name="ToDoScheduleMain"
                    component={ToDoScheduleMain}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="ToDoTask"
                    component={ToDoTask}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Agenda"
                    component={Agenda}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Birthday"
                    component={Birthday}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="CalendarMain"
                    component={CalendarMain}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={{marginStart:15 }}  onPress={() => navigation.goBack()}>
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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;