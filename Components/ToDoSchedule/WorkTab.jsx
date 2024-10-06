import React, { useRef, useState, useEffect } from 'react'
import { Platform, Button, StyleSheet, TouchableOpacity, View, Text, Animated, TextInput, Switch, FlatList, Modal, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import dayjs from 'dayjs'
import { Calendar } from 'react-native-calendars'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { Picker } from "@react-native-picker/picker";
// import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';



const createArray_Hours = (length) => {
  const arr = [];
  let i = 1;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const createArray_Minutes = (length) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const Array_Hours = ['00', '01', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const Array_Minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

const AVAILABLE_HOURS = createArray_Hours(13);
const AVAILABLE_MINUTES = createArray_Minutes(60);

const ITEM_HEIGHT_HOURS = 50;
const ITEM_HEIGHT_MINUTES = 50;
const ITEM_HEIGHT_AMPM = 50;



const WorkTab = () => {
  const [CurrentDate, setCurrentDate] = useState('')

  const [icon_1] = useState(new Animated.Value(85));
  const [icon_2] = useState(new Animated.Value(85));
  const [AgenRight, setAgenRight] = useState(25)

  const [pop, setPop] = useState(false);
  const rotationValue = useRef(new Animated.Value(0)).current; // For rotating the plus icon

  const [workTaskInputSession, setworkTaskInputSession] = useState(false);

  const [HandleToDoTaskButton, setHandleToDoTaskButton] = useState(false)
  const [newTask, setNewTask] = useState('Add Task Name')
  const [Description, setDescription] = useState('Add Task Description')
  const [taskName, setTaskName] = useState('');
  const [descriptionText, setDescriptionText] = useState('')
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedReminderDate, setSelectedReminderDate] = useState(today)
  const [selectedRepeat, setSelectedRepeat] = useState('None')
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

  const [isOpenSettingTime, setIsOpenSettingTime] = useState(false)
  const [selectedMinutes, setSelectedMinutes] = useState(null);
  const flatListRef_Hours = useRef(null);
  const flatListRef_Minutes = useRef(null);

  const [selectedHours, setSelectedHours] = useState(null)

  const extendedHours = [...Array(3).keys()].flatMap(() => Array.from({ length: 12 }, (_, i) => i + 1));
  const extendedMinutes = [...AVAILABLE_MINUTES, ...AVAILABLE_MINUTES, ...AVAILABLE_MINUTES]

  const [selectedAMPM, setSelectedAMPM] = useState('AM')

  const [isAM, setIsAM] = useState(true);

  const [selectedSetTime, setSelectedSetTime] = useState(null)

  const toggleSwitch = () => setIsAM(previousState => !previousState); // Toggle between AM and PM
  const date = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyDay = date.getDay();
  
  const toWeekDay = daysOfWeek[weeklyDay]

  const dayOfMonth = date.getDate();

  const dateOfYear = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  
  const realCurrentHours = date.getHours();
  const realCurrentMinutes = date.getMinutes();

  const [isReminder, setIsReminder] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatCustom, setIsRepeatCustom] = useState(false)
  const [reminderDate, setReminderDate] = useState(date)
  const [open, setOpen] = useState(false)

  const [mode, setMode] = useState('date');

  const [show, setShow] = useState(false);

  const [showDateTimePicker, setShowDateTimePicker] = useState(false)

  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const [selectedType, setSelectedType] = useState('days');
  const [ReminderData, setReminderData] = useState(ReminderDayItems);

  const [selectedReminderTime, setSelectedReminderTime] = useState('00:00')
  const [checkHM, setCheckHM] = useState({ hours: 0, minutes: 0 });

  const [finalChoosenDWM, setFinalChoosenDWM] = useState('None')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const ReminderDayItems = ['1 day early', '2 days early', '3 days early', '4 days early', '5 days early', '6 days early', '7 days early', '8 days early', '9 days early', '10 days early', '11 days early', '12 days early', '13 days early', '14 days early', '15 days early', '16 days early', '17 days early', '18 days early', '19 days early', '20 days early', '21 days early', '22 days early', '23 days early', '24 days early', '25 days early', '26 days early', '27 days early', '28 days early', '29 days early', '30 days early', '31 days early'];
  const ReminderWeekItems = ['1 week early', '2 weeks early', '3 weeks early', '4 weeks early'];
  const ReminderMonthItems = ['1 month early', '2 months early', '3 months early', '4 months early', '5 months early', '6 months early', '7 months early', '8 months early', '9 months early', '10 months early', '11 months early', '12 months early'];

  const handleScrollWheelHours = (item, index) => {
    // Map selected index back to the original range (1-12)
    const originalIndex = index % AVAILABLE_HOURS.length;
    setHours(AVAILABLE_HOURS[originalIndex])
  }

  const handleScrollWheelMinutes = (item, index) => {
    const originalIndex = index % AVAILABLE_MINUTES.length;
    setMinutes(AVAILABLE_MINUTES[originalIndex]);
  }

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

  const handleToDoTaskButton = () => {
    setSelectedDate(CurrentDate)
    setHandleToDoTaskButton(true)
    Animated.timing(rotationValue, {
      toValue: pop ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const handleToDoTaskCancel = () => {
    setHandleToDoTaskButton(false)
    setTaskName('')
    setDescriptionText('')
    setIsOpenCalendar(false)
    setPop(false)
    Animated.timing(rotationValue, {
      toValue: 0, // Set rotation back to 0 degrees
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const handleCalendarOpen = () => {
    setIsOpenCalendar(true);
  }

  const handleCalendarCross = () => {
    setIsOpenCalendar(false)
    setSelectedDate(today)
    setPop(false);
    popIn();
  }

  const handleCalendarCheck = () => {
    setIsOpenCalendar(false)
    setPop(false);
    // setSelectedDate()
  }

  const handleRepeatCalendarCross = () => {
    setIsRepeatCustom(false)
    setSelectedDatesRepeat({})
  }

  const handleRepeatCalendarCheck = () => {
    setIsRepeatCustom(false)
  }

  const handleSettingTimeOpen = () => {
    setIsOpenSettingTime(true);
  }

  const handleScrollEnd_Minutes = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT_MINUTES);
    const normalizedIndex = index % 60; // Wrap around the number of items
    console.log('n : ', normalizedIndex)
    if (normalizedIndex === 59) {
      setSelectedMinutes(0)
    } else {
      setSelectedMinutes(normalizedIndex + 1)
    };
    console.log("Selected Minutes : ", selectedMinutes)
    if (flatListRef_Minutes.current) {
      flatListRef_Minutes.current.scrollToOffset({
        animated: false,
        offset: ITEM_HEIGHT_MINUTES * (normalizedIndex + 60), // Adjust offset to keep it in loop
      });
    }
  };

  const handleScrollEnd_Hours = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    console.log('offsetY : ', offsetY)
    const index = Math.round(offsetY / ITEM_HEIGHT_HOURS);
    console.log('index : ', index)
    const normalizedIndex = index % 12; // Wrap around the number of items
    if (normalizedIndex === 11) {
      setSelectedHours(1)
    } else {
      setSelectedHours(normalizedIndex + 2)
    };
    console.log("NormalizedIndex : ", normalizedIndex)
    // setSelectedHours(normalizedIndex + 2); 
    console.log("Selected Hours : ", selectedHours)
    if (flatListRef_Hours.current) {
      flatListRef_Hours.current.scrollToOffset({
        animated: false,
        offset: ITEM_HEIGHT_HOURS * (normalizedIndex + 12), // Adjust offset to keep it in loop
      });
    }
  };

  const handleSetTimeBoxCancel = () => {
    setIsOpenSettingTime(false);
    setSelectedMinutes(null);
    setSelectedHours(null);
    setIsAM(true);
  }

  const handleSetTimeBoxOk = () => {
    console.log('isAM : ', isAM)
    console.log((isAM === true))
    let AMPM = '';
    if (isAM === true) {
      AMPM = 'AM';
    } else {
      AMPM = 'PM';
    }
    setSelectedAMPM(AMPM)
    console.log("selectedHours : ", selectedHours, " selectedMinutes : ", selectedMinutes, " ", AMPM)
    let FinalSetTimeValue = `${selectedHours}:${selectedMinutes} ${AMPM}`
    console.log(FinalSetTimeValue)
    setIsOpenSettingTime(false);
    setSelectedMinutes(null);
    setSelectedHours(null);
    setIsAM(true);
  }

  const handleReminderOpen = () => {
    setIsReminder(true);
    // console.log("isReminder works!")
  }

  const handleReminderSelect = (type) => {
    setSelectedType(type);
    if (type === 'days') {
      setReminderData(ReminderDayItems);
    } else if (type === 'weeks') {
      setReminderData(ReminderWeekItems);
    } else if (type === 'months') {
      setReminderData(ReminderMonthItems);
    }
  };

  const handleRepeatOpen = () => {
    setIsRepeat(true);
  }

  const handleRepeatCustom = () => {
    setIsRepeatCustom(true);
  }

  const handleRepeatCancel = () => {
    setIsRepeat(false);
    setSelectedRepeat('None')
  }

  const handleRepeatSave = () => {

  }

  const [selectedDatesRepeat, setSelectedDatesRepeat] = useState({});
  const [lengthOfSelectedDates, setLengthOfSelectedDates] = useState(0);

  const handleRepeatDayPress = (day) => {
    const dateString = day.dateString;
    console.log("date String : ", dateString)

    // Toggle selection for the clicked date
    if (selectedDatesRepeat[dateString]) {
      // Date already selected, remove it from the list
      const updatedDates = { ...selectedDatesRepeat };
      delete updatedDates[dateString];
      setSelectedDatesRepeat(updatedDates);
    } else {
      // Date not selected, add it to the list
      setSelectedDatesRepeat({
        ...selectedDatesRepeat,
        [dateString]: { selected: true, selectedColor: '#0FFFFF' },
      });
    }
    
  };
  let lengthOfObject = 0;
  lengthOfObject = Object.keys(selectedDatesRepeat).length;
  
  console.log(selectedDatesRepeat)
  console.log(lengthOfSelectedDates)

  const handleRepeatSelectedValue = (value) => {
    if (value === 'custom'){
      setSelectedRepeat(selectedDatesRepeat);
    }else {
      setSelectedRepeat(value);
    }
  }
  
  const [optionSetTimeDuration, setOptionSetTimeDuration] = useState('SetTime');
  const handleOptionOfSetTimeDuration = (option) => {
    console.log('opiton : ', option)
    if (option === 'SetTime'){
      console.log("option is SetTime")
      setOptionSetTimeDuration('SetTime')
    } else {
      setOptionSetTimeDuration('Duration');
    }
  }

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
  const today = getFormatedDate(new Date(), "YYYY/MM/DD");
  console.log(today)


  return (
    <View style={styles.Container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ToDoScheduleMain')}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={{ fontFamily: 'Poly', fontSize: 18 }}>
          {CurrentDate}
        </Text>
      </View>

      {/* <TopTabsNavigator /> */}
      <View style={styles.TopIssues}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ fontWeight: 500, }}>
            To Do
          </Text>
          <View style={{ backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5 }}>
            <Text style={{ fontSize: 13, position: 'absolute', color: 'white' }}>99</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 500, }}>
            On Progress
          </Text>
          <View style={{ backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5 }}>
            <Text style={{ fontSize: 13, position: 'absolute', color: 'white' }}>99</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 500, }}>
            Completed
          </Text>
          <View style={{ backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5 }}>
            <Text style={{ fontSize: 13, position: 'absolute', color: 'white' }}>99</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.TasksInfosContainer}>

      </ScrollView>      

      <View style={{
        flex: 1
      }}>
        

        <TouchableOpacity
          style={styles.circle}
          onPress={() => {
            // pop === false ? popIn() : popOut();
            handleToDoTaskButton();
          }}
        >
          <Animated.View style={rotation}>
            <Entypo name="plus" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={HandleToDoTaskButton}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleToDoTaskButton()}
      >
        <View style={styles.WorkInputContainer}>
          <Text style={{ alignSelf: "center", top: 18, fontWeight: 'bold', fontSize: 16, marginBottom: 20 }}>New "To Do Task"</Text>
          <Text style={styles.TasDesText}>New Task</Text>
          <TextInput
            style={styles.TaskInput}
            placeholder={newTask}
            value={taskName}
            onChangeText={setTaskName}
          />
          <Text style={styles.TasDesText}>Description</Text>
          <TextInput
            style={styles.DescriptionInput}
            placeholder= {Description}
            value={descriptionText}
            onChangeText={setDescriptionText}
            multiline={true}
          />
          <View style={{ flexDirection: 'row', width: '90%', marginLeft: 5 }}>
            <View style={{ paddingLeft: 28, marginTop: 25, width: '50%' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#555555', justifyContent: 'flex-start' }}>Set Date</Text>
              <TouchableOpacity
                style={{ width: '100%', height: 38, backgroundColor: '#B9D9EB', borderRadius: 5, justifyContent: 'space-around', flexDirection: 'row', marginTop: 8, alignItems: 'center' }}
                onPress={() => handleCalendarOpen()}
              >
                <Text style={{ fontSize: 14 }}>{selectedDate}</Text>
                <Text>🗓️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '100%', height: 38, backgroundColor: '#B9D9EB', borderRadius: 5, justifyContent: 'space-around', flexDirection: 'row', marginTop: 18, alignItems: 'center' }}
                onPress={() => handleReminderOpen()}
              >
                <Text style={{ fontSize: 14 }}>Reminder</Text>
                <Text>🔔</Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingLeft: 28, marginTop: 25, width: '50%' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#555555', justifyContent: 'flex-start' }}>Set Time</Text>
              <TouchableOpacity
                style={{ width: '100%', height: 38, backgroundColor: '#B9D9EB', borderRadius: 5, justifyContent: 'space-around', flexDirection: 'row', marginTop: 8, alignItems: 'center' }}
                onPress={() => handleSettingTimeOpen()}
              >
                <Text style={{ fontSize: 14 }}>Time</Text>
                <Text>🕓</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ width: '100%', height: 38, backgroundColor: '#B9D9EB', borderRadius: 5, justifyContent: 'space-around', flexDirection: 'row', marginTop: 18, alignItems: 'center' }}
                onPress={() => handleRepeatOpen()}
              >
                <Text style={{ fontSize: 14 }}>Repeat</Text>
                <Text>🔁</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-around', marginTop: 40, marginBottom: 30 }}>
            <TouchableOpacity
              style={{ width: '40%', height: 55, padding: 2, backgroundColor: '#0070FF', borderRadius: 10 }}
              onPress={() => handleToDoTaskCancel()}
            >
              <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center', borderRadius: 8 }}>
                <Text style={{ color: '#0070FF' }}>Cancel</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={{ width: '40%', height: 55, alignItems: 'center', backgroundColor: '#0070FF', justifyContent: 'center', borderRadius: 10 }}

            >
              <Text style={{ color: 'white' }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isOpenCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleSettingTimeOpen()}
      >
        <View style={styles.calendarStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: 10, marginTop: 10, right: 2 }}>
            <TouchableOpacity onPress={() => handleCalendarCross()}>
              <Entypo name="cross" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCalendarCheck()}>
              <FontAwesome name="check" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Calendar
            style={{
              borderColor: 'gray',
              height: 350,
              width: 300,
              backgroundColor: '#555555'
            }}
            markingType={'custom'}
            // Customizing theme
            theme={{
              backgroundColor: '#555555', // Background color of the whole calendar
              calendarBackground: '#555555', // Background color inside the calendar
              textSectionTitleColor: '#fff', // Color of day headers (Mon, Tue...)
              selectedDayBackgroundColor: '#fff', // Background color of the selected day
              selectedDayTextColor: '#ffffff', // Text color of the selected day
              todayTextColor: '#00adf5', // Color of today's date text
              dayTextColor: '#fff', // Color of all dates' text
              textDisabledColor: '#fff', // Color of disabled dates (outside current month)
              monthTextColor: '#00BFFF', // Color of the month and year text (title)
              arrowColor: '#0FFFFF', // Color of the arrows
              textDayFontFamily: 'monospace', // Font family for date numbers
              textMonthFontFamily: 'monospace', // Font family for month title
              textDayFontWeight: '400', // Font weight for dates
              textMonthFontWeight: 'bold', // Font weight for month title
              textDayFontSize: 16, // Font size for dates
              textMonthFontSize: 20, // Font size for month title
              textDayHeaderFontSize: 15, // Font size for day headers (Mon, Tue...)
            }}

            onDayPress={day => {
              console.log('selected day : ', day);
              setSelectedDate(day.dateString);
              console.log("Selected Data : ", selectedDate)
            }}
            hideExtraDays={true}
            firstDay={1}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#0FFFFF' },
              // [selectedDate]: {marked: true},
              // '2024-09-23': {marked: true, dotColor: 'red', activeOpacity: 0},
              // '2024-23-09': {disabled: true, disableTouchEvent: true}
            }}
          />
        </View>
      </Modal>

      <Modal
        visible={isOpenSettingTime}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleSettingTimeOpen()}
      >
        <View style={styles.setTimeBoxContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '92%', alignSelf: 'center', right: 1, marginTop: 15, }}>
            <TouchableOpacity onPress={() => handleSetTimeBoxCancel()}>
              <Text style={{ color: "#468FEA", fontWeight: 'bold', fontSize: 15 }}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSetTimeBoxOk()}>
              <Text style={{ color: "#468FEA", fontWeight: 'bold', fontSize: 15 }}>OK</Text>
            </TouchableOpacity>
          </View>
          {/* <View>
            <Text>
              Set Time will create a Task
            </Text>
            <Text>
              Duration will create a Agenda
            </Text>
          </View> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => {
                handleOptionOfSetTimeDuration('SetTime');
              }}
              style={[
                styles.BeforeSelectedSetTimeDuration,
                optionSetTimeDuration === 'SetTime' && styles.SelectedSetTimeDuration
              ]}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Set Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOptionOfSetTimeDuration('Duration');
              }}
              style={[
                styles.BeforeSelectedSetTimeDuration,
                optionSetTimeDuration === 'Duration' && styles.SelectedSetTimeDuration
              ]}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Duration</Text>
            </TouchableOpacity>
          </View>
          
          {optionSetTimeDuration === 'SetTime' && (
            <View>
              <View style={{ flexDirection: 'column-reverse', alignItems: 'center', top: 25 }}>
                <Text style={styles.AMPMLabel}>{isAM ? 'AM' : 'PM'}</Text>
                <View style={{ left: 1 }}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize track color
                    thumbColor={isAM ? '#f5dd4b' : '#f4f3f4'} // Customize thumb color
                    onValueChange={toggleSwitch}
                    value={isAM} // Boolean value representing the current state
                  />
                </View>
              </View>
              <View style={styles.setTimeBox}>
                <Animated.FlatList
                  ref={flatListRef_Hours}
                  data={extendedHours}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                      <Text
                        style={[
                          styles.itemText,
                          (index + 1) % 12 === selectedHours
                            ? styles.selectedText
                            : (index % 13 === 10 && selectedHours === 12)
                            ? styles.selectedText
                            : styles.unselectedText,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT_HOURS}
                  decelerationRate="fast"
                  onScrollEndDrag={handleScrollEnd_Hours}
                  onMomentumScrollEnd={handleScrollEnd_Hours}
                  scrollEventThrottle={16}
                  initialScrollIndex={12} // Start in the middle to allow for looping
                  getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT_HOURS,
                    offset: ITEM_HEIGHT_HOURS * index,
                    index,
                  })}
                />
                <Text style={{ fontSize: 35, top: 42, color: 'white', width: '5%', marginLeft: 10, marginRight: 10 }}>:</Text>
                <Animated.FlatList
                  ref={flatListRef_Minutes}
                  data={extendedMinutes}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                      <Text
                        style={[
                          styles.itemText,
                          index % 60 === selectedMinutes
                            ? styles.selectedTextMinutes
                            : styles.unselectedTextMinutes,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT_MINUTES}
                  decelerationRate="fast"
                  onScrollEndDrag={handleScrollEnd_Minutes}
                  onMomentumScrollEnd={handleScrollEnd_Minutes}
                  scrollEventThrottle={16}
                  initialScrollIndex={60} // Start in the middle to allow for looping
                  getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT_MINUTES,
                    offset: ITEM_HEIGHT_MINUTES * index,
                    index,
                  })}
                />
              </View>
            </View>
          )}

        </View>
      </Modal>

      {/* Reminder Modal */}
      <Modal
        visible={isReminder}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsReminder(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {alignItems: 'center',}]}>
            <View style={styles.selectorContainer}>
              <TouchableOpacity
                onPress={() => handleReminderSelect('days')}
                style={[
                  styles.selectorButton,
                  selectedType === 'days' && styles.selectedReminderDWMButton,
                ]}
              >
                <Text style={styles.text}>Days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleReminderSelect('weeks')}
                style={[
                  styles.selectorButton,
                  selectedType === 'weeks' && styles.selectedReminderDWMButton,
                ]}
              >
                <Text style={styles.text}>Weeks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleReminderSelect('months')}
                style={[
                  styles.selectorButton,
                  selectedType === 'months' && styles.selectedReminderDWMButton,
                ]}
              >
                <Text style={styles.text}>Months</Text>
              </TouchableOpacity>
            </View>
            {/* Horizontal Scroller */}
            <FlatList
              data={ReminderData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.reminderDayItem}
                  onPress={() => {
                    console.log('Selected Item:', item)
                    setFinalChoosenDWM(item)
                  }}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.flatListContainer}
            />

            <Text style={{alignContent: 'center', width: '80%', fontWeight: '500'}}>If you do not set time, reminder </Text>
            <Text style={{fontWeight: '500'}}>time will be current time!</Text>

            {/* DateTime Picker */}
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={() => setShowDateTimePicker(true)}
            >
              <Text style={{ fontWeight: 'bold' }}>Select Time</Text>
            </TouchableOpacity>

            {/* DateTime Picker */}
            {showDateTimePicker && (
              <DateTimePicker
                value={date}
                mode={'time'} // Can be 'date' or 'time'
                is24Hour={true}
                display="spinner"
                onChange={(event, selectedReminderTime) => {
                  setShowDateTimePicker(false); // Close after selecting
                  if (selectedReminderTime) {
                    setSelectedReminderTime(selectedReminderTime);
                  }
                  const hours = selectedReminderTime.getHours();
                  const minutes = selectedReminderTime.getMinutes();
                  console.log(`Hour: ${hours}, Minute: ${minutes}`);
                  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                  console.log("formattedTime : ", formattedTime);
                  setCheckHM({hours, minutes})
                  console.log('checkHM H : ', checkHM.hours ,'checkHM M : ', checkHM.minutes)
                  console.log(realCurrentHours, ' : ', realCurrentMinutes)
                  if (checkHM.hours === realCurrentHours && checkHM.minutes === realCurrentMinutes){
                    console.log("Reminder time matches the current time!");
                  }
            
                }}
              />
            )}

            {/* Close Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <TouchableOpacity
                style={styles.closeReminderButton}
                onPress={() => setIsReminder(false)}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveReminderButton, { width: 65 }]}
                onPress={() => setIsReminder(false)}
              >
                <Text style={{ color: '#fff', alignSelf: 'center' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isRepeat}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRepeat(false)}
      >
        <View style={[styles.modalContainer]}>
            <View style={[styles.modalContent]}>
              <Text style={{fontWeight: 800, fontSize: 16.5, alignSelf: 'center'}}>
                Repeat
              </Text>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {handleRepeatSelectedValue('none')}}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'none' && styles.selectedRepeatOption ]}>
                  None
                </Text>
                {selectedRepeat === 'none' && (
                  <FontAwesome6 name="check" size={18} color="#36C8E2" style={{top: 7}}/>
                )}
                
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {handleRepeatSelectedValue('daily')}}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'daily' && styles.selectedRepeatOption]}>
                  Daily
                </Text>
                {selectedRepeat === 'daily' && (
                  <FontAwesome6 name="check" size={18} color="#36C8E2" style={{top: 7}}/>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {handleRepeatSelectedValue('weekly')}}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'weekly' && styles.selectedRepeatOption]}>
                  Weekly
                </Text>
                <Text style={{fontSize: 14, color:'#8C92AC', }}>
                  {toWeekDay}
                </Text>
                {selectedRepeat === 'weekly' && (
                  <FontAwesome6 name="check" size={18} color="#36C8E2" style={{top: 7}}/>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {handleRepeatSelectedValue('monthly')}}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'monthly' && styles.selectedRepeatOption]}>
                  Monthly
                </Text>
                <Text style={{fontSize: 14, color:'#8C92AC', }}>
                  {dayOfMonth} Of Months
                </Text>
                {selectedRepeat === 'monthly' && (
                  <FontAwesome6 name="check" size={18} color="#36C8E2" style={{top: 7}}/>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {
                  handleRepeatSelectedValue('yearly'); 
                }}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'yearly' && styles.selectedRepeatOption]}>
                  Yearly
                </Text>
                <Text style={{fontSize: 14, color:'#8C92AC', }}>
                  {dateOfYear} Of Years
                </Text>
                {selectedRepeat === 'yearly' && (
                  <FontAwesome6 name="check" size={24} color="#36C8E2" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RepeatOptions}
                onPress={() => {
                  handleRepeatSelectedValue('weekdays'); 
                }}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'weekdays' && styles.selectedRepeatOption]}>
                  Mon To Fri Ever
                </Text>
                {selectedRepeat === 'weekdays' && (
                  <FontAwesome6 name="check" size={18} color="#36C8E2" style={{top: 7}}/>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.RepeatOptions, {alignSelf: 'center'}]}
                onPress={() => {
                  handleRepeatSelectedValue('custom');
                  handleRepeatCustom();
                }}
              >
                <Text style={[styles.RepeatOptionText, selectedRepeat === 'custom' && styles.selectedRepeatOption]}>
                  Custom
                </Text>
              </TouchableOpacity>
              

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{marginTop: 22}}
                  onPress={() => handleRepeatCancel()}
                >
                  <Text 
                    style={{fontSize: 15, fontWeight: 500}}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 22}}
                  
                >
                  <Text style={{fontSize: 16, fontWeight: 500}}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>
      </Modal>
      <Modal
        visible={isRepeatCustom}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRepeatCustom(false)}
      >
        <View style={styles.modalContainer}>
        <View style={styles.calendarStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: 10, marginTop: 10, right: 2 }}>
            <TouchableOpacity onPress={() => handleRepeatCalendarCross()}>
              <Entypo name="cross" size={28} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 14, top: 25}}>You can repeat one or more dates</Text>
            <TouchableOpacity onPress={() => handleRepeatCalendarCheck()}>
              <FontAwesome name="check" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Calendar
            style={{
              borderColor: 'gray',
              height: 350,
              width: 300,
              backgroundColor: '#555555',
              marginTop: 20
            }}
            markingType={'custom'}
            theme={{
              backgroundColor: '#555555',
              calendarBackground: '#555555',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#fff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#fff',
              textDisabledColor: '#fff',
              monthTextColor: '#00BFFF',
              arrowColor: '#0FFFFF',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayFontWeight: '400',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 15,
            }}
            onDayPress={handleRepeatDayPress}
            hideExtraDays={true}
            firstDay={1}
            markedDates={selectedDatesRepeat}
          />
          
          <Text style={{color: 'white', marginBottom: 10}}>
            {lengthOfObject} selected
          </Text>
          
        </View>
          
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
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
    shadowOffset: { height: 10 },

  },
  WorkInputContainer: {
    position: 'absolute',
    width: '95%',
    top: '9%',
    // height: '100%',
    backgroundColor: '#89CFF0',
    alignSelf: 'center',
    borderRadius: 20,
    // zIndex: 20,
    flex: 1,
    
  },
  TasDesText: {
    marginTop: 14,
    marginLeft: 18,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#555555'
  },
  TaskInput: {
    backgroundColor: '#B9D9EB',
    // padding: 15,
    borderRadius: 10,
    // marginBottom: 5,
    width: '90%',
    height: 60,
    alignSelf: 'center',
    paddingLeft: 12,

  },
  DescriptionInput: {
    backgroundColor: '#B9D9EB',
    borderRadius: 10,
    width: '90%',
    height: 120,
    alignSelf: 'center',
    textAlignVertical: 'top',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
  },
  calendarStyle: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    top: 220,
    zIndex: 10,
    width: 350,
    height: 460,
    backgroundColor: '#555555',
    borderRadius: 10,
  },
  setTimeBoxContainer: {
    width: '85%', // Width of the picker container
    height: "50%", // Height of the picker container to restrict scrollable area
    overflow: 'hidden', // Ensure the picker is properly contained
    alignSelf: 'center',
    top: 200,
    position: 'absolute',
    backgroundColor: '#555555',
    borderRadius: 20,
  },
  setTimeBox: {
    width: 250, // Width of the picker container
    height: 150, // Height of the picker container to restrict scrollable area
    overflow: 'hidden', // Ensure the picker is properly contained
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 30,
    backgroundColor: '#555555',

  },
  // CosDayPickerContainer: {
  //   width: 200, // Width of the picker container
  //   height: 150, // Height of the picker container to restrict scrollable area
  //   overflow: 'hidden', // Ensure the picker is properly contained
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   top: 15,
  // },
  picker: {
    width: "90%",
  },
  itemContainer: {
    height: ITEM_HEIGHT_MINUTES,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: 'white', // Selected item color
    fontWeight: 'bold', // Selected item font weight
    fontSize: 22,
  },
  unselectedText: {
    color: 'grey', // Non-selected items color
    fontWeight: 'normal', // Non-selected items font weight
  },
  selectedTextMinutes: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  unselectedTextMinutes: {
    color: 'grey', // Non-selected items color
    fontWeight: 'normal',
  },
  selectedAMPM: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  unselectedAMPM: {
    color: 'grey', // Non-selected items color
    fontWeight: 'normal',
  },
  AMPMLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  ReminderBox: {
    position: 'absolute',
    width: '95%',
    top: '20%',
    // height: '100%',
    backgroundColor: '#555555',
    alignSelf: 'center',
    borderRadius: 20,
    // zIndex: 20,
    flex: 1,
  },
  ReminderDayitem: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    marginTop: 28
  },
  reminderButton: {
    width: '90%',
    height: 38,
    backgroundColor: '#B9D9EB',
    borderRadius: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    // alignItems: 'center',
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  reminderDayItem: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  dateTimePickerContainer: {
    marginTop: 20,
  },
  selectedDateTime: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeReminderButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0070FF',
    borderRadius: 5,
  },
  saveReminderButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0070FF',
    borderRadius: 5,
  },
  dateTimePickerButton: {
    backgroundColor: '#89CFF0',
    height: 40,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectorButton: {
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedReminderDWMButton: {
    borderBottomColor: 'blue',
  },
  RepeatOptions: {
    flexDirection: 'row',
    top: 5,
    paddingVertical: 15,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5, 
    justifyContent: 'space-between'
  },
  RepeatOptionText: {
    // color: '#FFF',
    fontSize: 16,
  },
  selectedRepeatOption: {
    color: '#36C8E2', 
  },
  TasksInfosContainer: {
    marginTop:'10%',
    width: '100%',
  },
  SelectedSetTimeDuration: {
    borderBottomColor: '#36C8E2'
  },
  BeforeSelectedSetTimeDuration: {
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  }
})

export default WorkTab
