import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Screens/Welcome';
import AppNavigator from './Screens/AppNavigator';
import createTables from './database';
import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite/legacy';

// Open or create the database
const db = SQLite.openDatabase('EasyDayDB.db');

export default function App() {
  // useEffect(() => {
  //   createTables();
  // }, [])
  return (
    <>
      <AppNavigator />
      {/* <StatusBar style="auto" /> */}
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

