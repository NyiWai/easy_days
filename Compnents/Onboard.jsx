import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

const Onboard = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword1Visible, setIsPassword1Visible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

    <View style={styles.container}>
      <View style={styles.profleLogoContainer}>
        {/* logo  */}
        <TouchableOpacity
          style={styles.logo}
          onPress={() => setIsPassword1Visible(!isPassword1Visible)}
        >
          <Entypo name="vk-alternitive" size={30} color="#36C8E2" />
        </TouchableOpacity>

        {/* Profile Image  */}
        <View>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => setIsPassword1Visible(!isPassword1Visible)}
          >
            <Ionicons name="person-circle-outline" size={60} color="black" />
          </TouchableOpacity>
          <Text>Philiipsum dolor sit amet consectetu</Text>
        </View>
      </View>

      <Text>
        Lorem ipsum dolor sit amet consectetur. In libero dolor fames nunc vitae
        quam ornare fermentum. Pulvinar lorem mi tincidunt laoreet dolor cursus
        ac. Euismod sagittis ornare velit nullam gravida ut pretium turpis
        ultrices.
      </Text>

      <View style={styles.menusContainer}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setIsPassword1Visible(!isPassword1Visible)} >
          <Text>Focus</Text>
          <Ionicons name="person-circle-outline" size={60} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setIsPassword1Visible(!isPassword1Visible)} >
          <Text>Focus</Text>
          <Ionicons name="person-circle-outline" size={60} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setIsPassword1Visible(!isPassword1Visible)} >
          <Text>Focus</Text>
          <Ionicons name="person-circle-outline" size={60} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => setIsPassword1Visible(!isPassword1Visible)} >
          <Text>Focus</Text>
          <Ionicons name="person-circle-outline" size={60} color="black" />
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
    justifyContent: "center",
    alignItems: "center",
  },
  profleLogoContainer: {
    width: 290,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    marginBottom: 25,
  },
  logo: {
    marginRight: "auto",
  },
  profile: {
    marginLeft: "auto",
  },
  menusContainer:{
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    alignItems: 'center',

  },
  menu:{
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderColor:'gray',
    borderRadius:10,
    width:130,
    height:200,
    padding:10,
    margin:5,

  },
});

export default Onboard;
