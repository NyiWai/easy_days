import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';


const PersonalTab = () => {
  const [CurrentDate, setCurrentDate] = useState('')

  const [icon_1] = useState(new Animated.Value(85));
  const [icon_2] = useState(new Animated.Value(85));
  const [AgenRight, setAgenRight] = useState(25)

  const [pop, setPop] = useState(false);
  const rotationValue = useRef(new Animated.Value(0)).current; // For rotating the plus icon


  const popIn = () => {
    setPop(true);
    setAgenRight(25)
    Animated.timing(icon_1, {
      toValue: 85,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 85,
      duration: 400,
      useNativeDriver: false,
    }).start();
    // Rotate the plus icon back
    Animated.timing(rotationValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    setAgenRight(100)
    Animated.timing(icon_1, {
      toValue: 170,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 125,
      duration: 400,
      useNativeDriver: false,
    }).start();
    
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'], // Rotate 45 degrees when expanded
  });

  const rotation = {
    transform: [{ rotate: rotateInterpolation }],
  };

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


  return (
    <View style={styles.Container}>
        <View style={styles.topBar}>
            <TouchableOpacity  onPress={() => navigation.navigate('ToDoScheduleMain')}>
                <MaterialIcons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            
            <Text style={{fontFamily: 'Poly', fontSize: 18}}>
            {CurrentDate}
            </Text>
        </View>
        
        {/* <TopTabsNavigator /> */}
        <View style={styles.TopIssues}>
            <View style={{flexDirection:'row',}}>
                <Text style={{fontWeight: 500, }}>
                    To Do
                </Text>
                <View style={{backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5}}>
                    <Text style={{fontSize: 13, position: 'absolute', color: 'white'}}>99</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight: 500, }}>
                    On Progress
                </Text>
                <View style={{backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5}}>
                    <Text style={{fontSize: 13, position: 'absolute', color: 'white'}}>99</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight: 500, }}>
                    Completed
                </Text>
                <View style={{backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5}}>
                    <Text style={{fontSize: 13, position: 'absolute', color: 'white'}}>99</Text>
                </View>
            </View>
        </View>
        <View style={{
            flex: 1
        }}>
            <Animated.View style={[styles.circle, { bottom: icon_1, backgroundColor: '#00A86B'}]}>
                <TouchableOpacity>
                    <FontAwesome5 name="tasks" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.circle, { bottom: icon_2, right: AgenRight, backgroundColor: '#f52d56'}]}>
                <TouchableOpacity>
                    <MaterialIcons name="view-agenda" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
            style={styles.circle}
            onPress={() => {
                pop === false ? popIn() : popOut();
            }}
            >
            <Animated.View style={rotation}>
                <Entypo name="plus" size={28} color="white" />
            </Animated.View>
            </TouchableOpacity>
        </View>

    </View>
    
  )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
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
    TopIssues: {
        alignSelf: 'center',
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circle: {
        backgroundColor: '#15F4EE',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 85,
        right: 25,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 10},
    }

})

export default PersonalTab
