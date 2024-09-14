import React, {useState, useEffect, useRef} from 'react'
import { FlatList, ScrollView, StyleSheet, Switch, TouchableOpacity, View, Text, TextInput,Dimensions } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import Poly from '../../assets/Fonts/Poly/Poly-Regular.ttf'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { Picker } from "@react-native-picker/picker";
// import { Picker as WheelPicker } from "react-native-wheel-picker-expo";
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import RNPickerSelect from 'react-native-picker-select';


const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VIEW_HEIGHT = 150;

const Birthday = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState('');

  const [name, setName] = useState('');

  const [selectedDay, setselectedDay] = useState(1);

  const [selectedMonth, setselectedMonth] = useState('Jan')

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [isReminderVisible, setIsReminderVisible] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState('None');

  const [ReminderCustom, setReminderCustom] = useState(false)

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const [checkOption, setCheckOption] = useState('Custom')

  const [bellBackgroundColor, setBellBackgroundColor] = useState('#eeeeee')

  const [CustomDay, setCustomDay] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [reminders, setReminders] = useState([]);

  const [menuVisible, setMenuVisible] = useState(false);


  

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
    const OptionValue = '';
    if (option == 'Custom') {
      setReminderCustom(true);
    } else if (option == '1 day early'){
        setCheckOption('Default')
        setSelectedIndex('1day')
    } else if (option == '1 week early'){
        setCheckOption('Default')
        setSelectedIndex('1week')
    } else if (option == '1 month early'){
        setCheckOption('Default')
        setSelectedIndex('1month')
    }
  };
  
  const handleReminderSave = () => {
    console.log((checkOption === 'Custom'))
    let PutDaytoFinalCus = null;
    if (checkOption === 'Custom'){
      const FinalCustomDay = selectedIndex + 1;
      console.log('FinalCustomDay : ', FinalCustomDay, '1 check is ', (FinalCustomDay == 1))
      if (FinalCustomDay === 1){
        PutDaytoFinalCus = `${FinalCustomDay}day`
      } else{
        PutDaytoFinalCus = `${FinalCustomDay}days`
      }
    } else {
        PutDaytoFinalCus = selectedIndex;
    }

    const newReminder = {
      id: Date.now(),
      name: name,
      day: selectedDay,
      month: selectedMonth,
      customDay: PutDaytoFinalCus,
    };
    console.log(newReminder)

    setReminders((prevReminders) => [...prevReminders, newReminder]);

    setName('');
    setselectedDay(0);
    setselectedMonth(0);
    setBellBackgroundColor('#eeeeee');
    setSelectedIndex(0);
    setCustomDay(0)
    setCheckOption('Custom')

    console.log(`Saved reminder: ${JSON.stringify(newReminder)}`)
  };
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCustomCheck = (Custom_Day) => {
    setReminderCustom(false);
  }

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
  const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const reminderOptions = ['None', '1 day early', '1 week early', '1 month early', 'Custom'];
  
  const numbers = Array.from({ length: 31 }, (_, i) => i + 1); // Array of numbers from 1 to 31
  const extendedNumbers = [...numbers, ...numbers, ...numbers]; // Extend the array for looping effect
  const flatListRef = useRef(null);

  

  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const normalizedIndex = index % 31; // Wrap around the number of items
    if (normalizedIndex === 30){
      setSelectedIndex(0)
    }else{
      setSelectedIndex(normalizedIndex  + 1)
    };
    
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        animated: false,
        offset: ITEM_HEIGHT * (normalizedIndex + 31  ), // Adjust offset to keep it in loop
      });
    }
  };

  const handleReminderOk = () => {
    setIsReminderVisible(false);
    setBellBackgroundColor('#36C8E2')
  }

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

        
        <ScrollView style={styles.BirthdayInfoContainer}>
          {reminders.map((reminder) => (
            <View key={reminder.id.toString()} style={styles.reminderInfo}>
              <Text style={styles.reminderText}>{reminder.name}</Text>
              <Text style={styles.reminderText}>{reminder.day} - {reminder.month}</Text>
              <Text style={styles.reminderText}>{reminder.customDay}</Text>

              {/* Three-dot menu icon */}
              <TouchableOpacity onPress={toggleMenu}>
                <MaterialIcons name="more-vert" size={24} color="black" />
              </TouchableOpacity>

              {/* Conditional rendering for the Edit and Delete options in a dropdown style */}
              {menuVisible && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity onPress={() => handleEdit(reminder.id)}>
                    <FontAwesome name="edit" size={25} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(reminder.id)}>
                    <FontAwesome name="trash" size={25} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        
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
              <Text style={{marginLeft: 110}}>Month</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={selectedDay}
                  onValueChange={(itemValue) => {
                    setselectedDay(itemValue);
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
                    setselectedMonth(itemValue);
                  }}
                  mode="dropdown"
                >
                  {Month.map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity style={[styles.reminderButton, { backgroundColor: bellBackgroundColor }]} onPress={handleReminderPress}>
                  <FontAwesome name="bell" size={24} color="#525252" style={{top: 8}}/>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => setIsFormVisible(false)}>
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReminderSave()}>
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isReminderVisible && (
          <View style={styles.ReminderContainer}>
            <View style={{width: '100%', flexDirection: 'row', }}>
              <Text style={{color: 'white', fontSize: 20,fontWeight: "bold", alignSelf: "center"}}>Reminder</Text>
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
              <TouchableOpacity style={styles.actionReminderButton} onPress={handleReminderOk}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#36C8E2'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

        )}
        {ReminderCustom && (
            <View style={styles.reminderCustom}>
              <Text style={styles.pickerLabel}>Custom</Text>
              <Text style={styles.line}></Text>
              <View style={styles.CosDayPickerContainer}>

                <Animated.FlatList
                  ref={flatListRef}
                  data={extendedNumbers}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                      <Text
                        style={[
                          styles.itemText,
                          index % 31 === selectedIndex
                            ? styles.selectedText
                            : styles.unselectedText,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  // onScroll={scrollHandler}
                  onScrollEndDrag={handleScrollEnd}
                  onMomentumScrollEnd={handleScrollEnd}
                  scrollEventThrottle={16}
                  initialScrollIndex={31} // Start in the middle to allow for looping
                  getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                  })}
                />
                <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>Days</Text>

              </View>

              {/* <Text>SelectedIndex {selectedIndex + 1}</Text> */}
              <View style={[styles.remindButtonContainer, {alignSelf: 'center', top: -10}]}>   
                <TouchableOpacity style={styles.actionReminderButton} 
                  onPress={() => {
                    setReminderCustom(false); 
                    setSelectedIndex(0);
                }}>
                  <Text style={{fontSize: 14, fontWeight: 'bold',color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionReminderButton} onPress={handleCustomCheck}>
                  <FontAwesome name="check" size={26} color="#36C8E2" />
                </TouchableOpacity>
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
      position: 'absolute',
      top: '24%', // Adjust vertical position
      width: '100%',
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
      // backgroundColor: '#eeeeee',
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


    itemText: {
      fontSize: 18,
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
      position: 'absolute',
      zIndex: 10,
      top: '40%', // Adjust vertical position
      // marginTop: 20,
      padding: 10,
      backgroundColor: '#666666',
      borderRadius: 10,
      alignSelf: 'center',
      width: '80%'
    },
    pickerLabel: {
      color: 'white',
      marginBottom: 10,
      fontSize: 20,
      alignSelf: 'center',
      fontWeight: '700'
    },
    CosDayPickerContainer: {
      width: 200, // Width of the picker container
      height: 150, // Height of the picker container to restrict scrollable area
      overflow: 'hidden', // Ensure the picker is properly contained
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      top: 15,
    },
    pickerItem: {
      fontSize: 16, // Font size for picker items
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
      paddingVertical: 8,
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    line: {
      // position: 'absolute',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: 'gray',
    },
    numberContainer: {
      height: 40, // Height for each picker item
      justifyContent: 'center',
      alignItems: 'center',
    },

    itemContainer: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedText: {
      color: 'black', // Selected item color
      fontWeight: 'bold', // Selected item font weight
      fontSize: 22,
    },
    unselectedText: {
      color: 'grey', // Non-selected items color
      fontWeight: 'normal', // Non-selected items font weight
    },

    ScrollView: {
      flex: 1, // Takes the full available height
    },

    BirthdayInfoContainer: {
      marginTop:'10%',
      width: '100%',
    },
    reminderInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#d6eaf8', // Light blue background
      borderRadius: 10, // Rounded corners
      padding: 12, // Padding inside each item
      marginVertical: 10, // Space between items vertically
      marginHorizontal: 10,
    }
    ,
    reminderText: {
      // fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 10,
    },
    name: {
      // flex: 2,
      fontSize: 16,
      marginRight: 10,
    },
    date: {
      // flex: 1,
      fontSize: 14,
    },
    customDay: {
      // flex: 1,
      fontSize: 14,
    },
    menuIcon: {
      paddingHorizontal: 10,
      
    },
    dropdownMenu: {
      position: 'absolute',
      right: 40, // Added some padding from the right edge
      // top: 20,

      width: 85,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#c0c0c0',
      borderRadius: 8, // Rounded corners
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15, // Lightened shadow opacity for a softer shadow
      shadowRadius: 4,
      elevation: 6,
      zIndex: 10,
      paddingVertical: 8, // Adds padding to the dropdown items
      paddingHorizontal: 12, // Adds horizontal padding for a better touch target
      borderWidth: 1, // Adds a subtle border
      borderColor: '#e0e0e0',
      alignItems: 'center'
    },
})

export default Birthday
