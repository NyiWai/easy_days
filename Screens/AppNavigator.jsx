import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AfterWelcome from './AfterWelcome';
import Welcome from './Welcome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
                    },
            })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;