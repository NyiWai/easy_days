import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Screens/Welcome';
import AppNavigator from './Screens/AppNavigator';

export default function App() {
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

