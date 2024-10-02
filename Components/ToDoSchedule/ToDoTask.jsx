import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AllTab from './AllTab';
import WorkTab from './WorkTab';
import PersonalTab from './PersonalTab';
import Fontisto from '@expo/vector-icons/Fontisto';
// import { Tabs } from 'expo-router'

// import TopTabsNavigator from './TopTabsNavigator'; 


const Tab = createMaterialBottomTabNavigator();

const ToDoTask = (navigation) => {
  const [CurrentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date();
    
    // Automatically detect the user's locale and time zone
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Format the date components
    const day = date.toLocaleString(userLocale, { day: '2-digit', timeZone: userTimeZone });
    const month = date.toLocaleString(userLocale, { month: '2-digit', timeZone: userTimeZone });
    const year = date.toLocaleString(userLocale, { year: 'numeric', timeZone: userTimeZone });

    // Combine in "dd-mm-yyyy" format
    const formattedDate = `${day}-${month}-${year}`;

    setCurrentDate(formattedDate);
  }, []);

  const Stack = createNativeStackNavigator();
  // const Tab = createBottomTabNavigator();


  return (
    <Tab.Navigator
      initialRouteName='All'
      shifting={true}
      tabBarColor="#FF69B4"
      activeColor='#E5E4E2'
      inactiveColor="#111111"
      barStyle={{ 
        backgroundColor: '#696969',
        borderTopWidth: 0.5,  // Add border on top of the tab bar
        borderTopColor: '#d1d1d1',  // Border color
        height: 65,  // Adjust the height of the tab bar
        shadowRadius: 10,
        position: 'absolute',
        alignSelf: "center",
        borderTopLeftRadius: 15,  // Rounded corners for the top-left
        borderTopRightRadius: 15,
        paddingBottom: 10,
        elevation: 5,
        
      }}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          paddingBottom: 5,
        }, // Style for the label
        tabBarStyle: {
          backgroundColor: '#E5E4E2', // The tab bar background
          // elevation: 0, // Remove shadow on Android
        },
        tabBarIconStyle: {  // Style for the icons
          marginBottom: -5,  // Adjust icon position
        },
        tabBarItemStyle: {  // Style for the entire tab item
          paddingVertical: 5,
          justifyContent: 'center',
        },
      }}
    >
      
      <Tab.Screen 
        name="All" 
        component={AllTab}
        options={{
          tabBarLabel: 'All',
          tabBarIcon: ({focused}) => (
            <Text style={{fontSize: 20, position: 'absolute', bottom: 1}}>📑</Text>
          ),
          
        }}
      />
      <Tab.Screen 
        name='Work' 
        component={WorkTab}
        options={{
          tabBarLabel: "Work",
          tabBarIcon: ({focused}) => (
            // <MaterialIcons 
            //   name="work" 
            //   size={26} 
            //   color={focused ? '#8B8589' : 'black'} // Change icon color when active/inactive
            //   style={{ backgroundColor: 'transparent' }}
            // />
            <Text style={{fontSize: 20, position: 'absolute', bottom: 4}}>💼</Text>
          )
        }}
      />
      <Tab.Screen 
        name='Personal' 
        component={PersonalTab}
        options={{
          tabBarLabel: "Personal",
          tabBarIcon: ({focused}) => (
            <Text style={{fontSize: 20, position: 'absolute', bottom: 1}}>👤</Text>

          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  topBar: {
    // position: 'absolute', // Make it fixed at the top
    marginTop: 15, // Align it to the top
    width: '100%', // Full width
    height: 60, // Adjust height as needed
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 10, // Ensure it stays above other content
  },
})


export default ToDoTask
