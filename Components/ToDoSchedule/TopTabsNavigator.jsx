// TopTabsNavigator.jsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToDoTask from './ToDoTask';
import Agenda from './Agenda';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
  return (
    <TopTab.Navigator
      initialRouteName="ToDoTask"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        tabBarIndicatorStyle: { backgroundColor: '#2F4F4F' },
      }}
    >
      <TopTab.Screen name="ToDoTask" component={ToDoTask} options={{ tabBarLabel: 'To Do Task' }} />
      <TopTab.Screen name="Agenda" component={Agenda} options={{ tabBarLabel: 'Agenda' }} />
    </TopTab.Navigator>
  );
}
