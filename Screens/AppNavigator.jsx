import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AfterWelcome from './AfterWelcome';
import Welcome from './Welcome';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="AfterWelcome" component={AfterWelcome} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;