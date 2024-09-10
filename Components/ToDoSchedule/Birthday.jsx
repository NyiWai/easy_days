import React, {useState, useEffect} from 'react'
import { FlatList, ScrollView, StyleSheet, Switch, TouchableOpacity, View, Text, TextInput,Dimensions } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import Poly from '../../assets/Fonts/Poly/Poly-Regular.ttf'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { Picker } from "@react-native-picker/picker";
// import { Picker as WheelPicker } from "react-native-wheel-picker-expo";

import RNPickerSelect from 'react-native-picker-select';


const Birthday = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState('');

  const [name, setName] = useState('');

  const [selectedDay, setselectedDay] = useState(0);

  const [selectedMonth, setselectedMonth] = useState(0)

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [isReminderVisible, setIsReminderVisible] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState('None');

  const [ReminderCustom, setReminderCustom] = useState(false)

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const [SelectedDayReminder, setSelectedDayReminder] = useState(days[0]);

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

  const handleReminderPress = () => {
    setIsReminderVisible(true);
  }

  const handleAddTaskPress = () => {
    setIsFormVisible(true); // Show the form when the "+ Task" button is pressed
  };

  const handleReminderSelection = (option) => {
    setSelectedReminder(option);
    if (option == 'Custom') {
      setReminderCustom(true);
    } else{
      setReminderCustom(false);
    }
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

  const ref = React.useRef();
  const [index, setIndex] = useState(0);

  const ValueChange = (data) => {
    console.log('ValueChange work ', data)
    setSelectedDayReminder(data);
  }

  const onNext = () => {
    if (index === Days.length - 1 ) return;
    setIndex(index + 1);
    ref.current && ref.current.scrollToTargetIndex(index + 1);
  }


  const Days = Birthday_Array(32);
  const Month = ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const reminderOptions = ['None', '1 day early', '1 week early', '1 month early', 'Custom'];
  const frequencyOptions = ['Day', 'Week', 'Month', 'Year']; // Options for custom frequency

  const [selectedFrequency, setSelectedFrequency] = useState('Week');
  const [selectedNumber, setSelectedNumber] = useState("1");
  const [selected_Day, setSelected_Day] = useState('Monday')

  const numbers = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const frequencies = [
    { label: "Day", value: "Day" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];

  const handleDayValue = (value) => {
    setSelected_Day(value)
  }

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

              <TouchableOpacity style={styles.reminderButton} onPress={handleReminderPress}>
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
        {isReminderVisible && (
          
          <View style={styles.ReminderContainer}>
            <View style={{width: '100%', flexDirection: 'row', }}>
              <Text style={{color: 'white', fontSize: 20,fontWeight: "bold", alignSelf: "center"}}>Reminder</Text>
              {/* <Switch
                value={isConstantReminder}
                onValueChange={setIsConstantReminder}
                style={{top : 4, left: 15}}
              /> */}
            </View>
            {reminderOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleReminderSelection(option)}
              >
                <Text style={[styles.optionText, selectedReminder === option && styles.selectedOption]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.remindButtonContainer}>   
              <TouchableOpacity style={styles.actionReminderButton} onPress={() => setIsReminderVisible(false)}>
                <Text style={{fontSize: 14, fontWeight: 'bold',color: 'white'}}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionReminderButton}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#36C8E2'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

        )}
        {ReminderCustom && (
            <View style={styles.reminderCustom}>
              <Text style={styles.pickerLabel}>Select Value {SelectedDayReminder}</Text>

              {/* <RNPickerSelect
                onValueChange={(value) => setSelectedNumber(value)}
                items={numbers}
                value={selectedNumber}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              /> */}
              {/* Frequency Picker */}
              {/* <RNPickerSelect
                onValueChange={(value) => setSelectedFrequency(value)}
                items={frequencies}
                value={selectedFrequency}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              /> */}
              
              {/* <View style={styles.CosDayPickerContainer}>
                <Picker
                  selectedValue={selected_Day}
                  onValueChange={(value) => setSelected_Day(value)}
                  style={styles.picker} // Style for picker
                  itemStyle={styles.pickerItem} 
                >
                  <Picker.Item label="Monday" value="Monday"/>
                  <Picker.Item label="Tueday" value="Tueday"/>
                  <Picker.Item label="Wednesday" value="Wednesday"/>
                  <Picker.Item label="Thursday" value="Thursday"/>
                  <Picker.Item label="Friday" value="Friday"/>
                  <Picker.Item label="Saturday" value="Saturday"/>
                  <Picker.Item label="Sunday" value="Sunday"/>
                </Picker>
              </View> */}
              <View style={styles.CosDayPickerContainer}>
                <ScrollView
                  contentContainerStyle={styles.scrollViewContent}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={40} // Snap to each item
                  decelerationRate="fast"
                  contentOffset={{ y: 80 }}
                >
                  {DAYS.map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelected_Day(day)}
                      // style={{ padding: 13, color: selectedDay === day ? 'black' : 'gray' }}
                      style={[
                        styles.dayButton,
                        { backgroundColor: selectedDay === day ? 'black' : 'gray' }
                      ]}
                    >
                      <Text style={[styles.pickerItem, selected_Day === day ? styles.selectedItem : {}]}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Text>Selected Day: {selected_Day}</Text>
              </View>
              
            </View>
          )}
        
    </View>
  )
}
const ScreenHeight = Dimensions.get('window').height;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: '#FFFFFF',
    padding: 10,
    height: 40,
  },
  inputAndroid: {
    color: '#FFFFFF',
    padding: 10,
    height: 40,
  },
});
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
    ReminderContainer: {
      position: 'absolute', // Ensures it can overlap other components
      top: '20%', // Adjust vertical position
      left: '5%', // Adjust horizontal position
      backgroundColor: '#555555',
      borderRadius: 20,
      padding: 20,
      zIndex: 10,
      color: 'white', // Corrected property name from `fontColor` to `color`
      justifyContent: 'center',
      alignItems: 'center',
      width: "90%"
    }
    ,
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
   
    option: {
      top: 5,
      paddingVertical: 15,
      borderBottomColor: '#333',
      borderBottomWidth: 1,   // underline of options
    },
    optionText: {
      color: '#FFF',
      fontSize: 16,
    },
    selectedOption: {
      color: '#36C8E2', // Blue color for selected option
    },
    constantReminderText: {
      color: '#FFF',
      fontSize: 16,
    },
    remindButtonContainer: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    actionReminderButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },


    reminderCustom: {

    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    frequencyOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    frequencyOption: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    selectedFrequency: {
      backgroundColor: '#f0f0f0',
    },
    frequencyText: {
      fontSize: 14,
    },
    
    reminderCustom: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#666666',
      borderRadius: 10,
    },
    pickerLabel: {
      color: 'white',
      marginBottom: 10,
      fontSize: 16,
    },
    CosDayPickerContainer: {
      width: 200, // Width of the picker container
      height: 150, // Height of the picker container to restrict scrollable area
      overflow: 'hidden', // Ensure the picker is properly contained
    },
    pickerItem: {
      fontSize: 18, // Font size for picker items
      color: '#bbb', // Color for the selected item
      backgroundColor: 'transparent',
      textAlign: 'center',
    },

    scrollViewContent: {
      alignItems: 'center',
      flexGrow: 1,
      // paddingVertical: Dimensions.get('window').height / 3,
    },
    dayButton: {
      // paddingVertical: 8,
      // paddingHorizontal: 20,
      // marginVertical: 5, // Spacing between items
      // borderRadius: 5,
      // alignItems: 'center',
      height: 40, // Height for each picker item
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedItem: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
    }

})

export default Birthday
