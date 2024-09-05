import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import Poly from '../../assets/Fonts/Poly/Poly-Regular.ttf'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Picker } from "@react-native-picker/picker";



const Birthday = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState('');
  const [name, setName] = useState('');
  const [selectedDay, setselectedDay] = useState(0);
  const [selectedMonth, setselectedMonth] = useState(0)
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const [fontsLoaded] = useFonts({
    Poly: Poly        
  });

  if (!fontsLoaded) {
      return null; // Handle loading state
  };

  

  const handleAddTaskPress = () => {
    setIsFormVisible(true); // Show the form when the "+ Task" button is pressed
  };

  const Birthday_Array = (len) => {
    const arr = [];
    let i = 1;
    while (i < len) {
      arr.push(i.toString());
      i += 1;
    }
    return arr;
  }

  const Days = Birthday_Array(32);
  const Month = ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <View style={styles.Container}>
        <View style={styles.TopContainer}>
          <View style={styles.topBar}>
              <TouchableOpacity  onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={28} color="black" />
              </TouchableOpacity>
              
              <Text style={{fontFamily: 'Poly', fontSize: 18}}>
                {currentDate}
              </Text>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold', top: 12}}>
              Remember who you love!
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleAddTaskPress}>
              <AntDesign name="plus" size={24} color="white" style={{top: 8}}/>
            </TouchableOpacity>
          </View>
        </View>

        {isFormVisible && (
          <View style={styles.formContainer}>
            <View>
              <Text style={{fontWeight: 'bold',marginBottom: 6}}>Set Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <View>
              <Text style={{fontWeight: 'bold',}}>Set Birthday</Text>
            </View>

            <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 6}}>
              <Text>Day</Text>
              <Text  style={{marginLeft: 110}}>Month</Text>
            </View>

            <View style={styles.row}>

              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={selectedDay}
                  onValueChange={(itemValue) => {
                    this.setState({ selectedMinutes: itemValue });
                  }}
                  mode="dropdown"
                >
                  {Days.map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue) => {
                    this.setState({ selectedMinutes: itemValue });
                  }}
                  mode="dropdown"
                >
                  {Month.map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity style={styles.reminderButton}>
                  <FontAwesome name="bell" size={24} color="#525252" style={{top: 8}}/>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => setIsFormVisible(false)}>
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.actionButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
    },
    topBar: {
      // position: 'absolute', // Make it fixed at the top
      top: -7, // Align it to the top
      width: '100%', // Full width
      height: 60, // Adjust height as needed
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      zIndex: 10, // Ensure it stays above other content
    },
    TopContainer: {
      top: 30, 
      backgroundColor: "#d6eaf8",
      alignItems: 'center',
      height: '30%',
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: '#36C8E2',
      borderRadius: 60,
      alignItems: 'center',
      padding: 10,
      marginTop:40,
    },
    formContainer: {
      position: 'relative',
      backgroundColor: '#b5e0ff',
      borderRadius: 20,
      padding: 20,
      height: 280
    },
    input: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    reminderButton: {
      marginLeft: 10,
      padding: 10,

      width: 60,
      height: 60,
      backgroundColor: '#eeeeee',
      borderRadius: 60,
      alignItems: 'center',
      padding: 10,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    actionButtonText: {
      fontWeight: 'bold',
    },

    // pickerWrapperBox: {
    //   flexDirection: 'row',
      
    // },

    pickerWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-around',
      backgroundColor: "white",
      borderRadius: 8,
      elevation: 3, // For Android shadow
    },
    picker: {
      width: 120,
      color: "#333",
    },
    pickerItem: {
      color: "#333",
      fontSize: 20,
    },
    pickerLabel: {
      // marginLeft: 10,
      fontSize: 18,
      color: "#666",
    },
})

export default Birthday
