import React, { Component, useState, useEffect } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, StyleSheet, View, Text, Image ,Button} from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { songsData } from './categoriesData'
import Feather from '@expo/vector-icons/Feather';
// import { DateTimePicker,DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const MeditatioTimeSet = ({ navigation, route }) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [component, setComponent] = useState(true)
  const [play, setPlay] = useState(false)
  const { id } = route.params;
  console.log(id)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    // You should close the modal in here
    setShowDatePicker(false)
    
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date.getDate())
  }

  return (
    <>
      <View style={styles.container}>
        {/* <DateTimePickerAndroid
          mode={'date'}
          is24Hour={true}
          display={'calendar'} // Display the calendar in a row
          horizontal={true} // Enable horizontal scrolling
          pagingEnabled={true} // Enable horizontal paging
          hideExtraDays={true} // Hide extra days at the beginning and end of the month
          firstDay={1} // Start the week on Monday (default is Sunday)
          monthFormat="YYYY-MM"
          theme={{
            calendarBackground: '#f2f2f2',
            dayTextColor: 'black',
            selectedDayBackgroundColor: 'blue',
            selectedDayTextColor: 'white',
            todayTextColor: 'red',
          }}
        /> */}
        <View style={styles.topSection}>
          <Image style={styles.songImage} source={songsData[id - 1].songImage} />
          <Text style={styles.dayTextTitle}></Text>
          
        </View>
        <View style={styles.centerSection}>
        {component ?
          <SetTimer />
          :
          <PlayTimer />
        }
        </View>
        <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.playButton}>
          {play === true ?
            <Feather name="pause-circle" size={110} color="#92E3A9" />
            : <Feather name="play-circle" size={110} color="#92E3A9" />
          }
        </TouchableOpacity>

        {play === true ?
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MeditationFinsh')}
            >
              <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        :
        <View  style={styles.buttonConatiner}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MeditationMenu')}
            >
              <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MeditationFinsh')}
            >
              <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
        }
        </View>

      </View>

    </>)
}

const SetTimer = ({ }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedReminder, setSelectedReminder] = useState('None');
  const reminderOptions = ['None', '1 mins early', '3 mins early', ,'5 mins early', '10 mins early'];
  const [isReminderVisible, setIsReminderVisible] = useState(false)
  const [alert,setAlert] = useState(false)
  const HOURS = Array.from({ length: 60 }, (_, i) => i + 1);
  const MINUTES = Array.from({ length: 60 }, (_, i) => i + 1);

  const handleReminderPress = () => {
    setIsReminderVisible(!isReminderVisible);
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
  return (
    <>
      <View style={styles.timeContainer}>
        <View style={styles.hourContainer}>
          <Text style={styles.titleText}>Hours</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              // onValueChange={(itemValue) => {
              // }}
              mode="dropdown">

              {HOURS.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.hourContainer}>
          <Text style={styles.titleText}>Minutes</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              // onValueChange={(itemValue) => {
              // }}
              mode="dropdown">

              {MINUTES.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>
          </View>
        </View>

        {alert?
          <TouchableOpacity 
          style={styles.ringContainer} >
            <MaterialCommunityIcons name="bell-check" size={20} color="#92E3A9" />
          </TouchableOpacity>
        :
          <TouchableOpacity 
          style={styles.ringContainer}
          onPress={handleReminderPress} >
            <MaterialCommunityIcons name="bell-off-outline" size={20} color="#92E3A9" />
          </TouchableOpacity>
          }
        
        {isReminderVisible && (
          <View style={styles.ReminderContainer}>
            <View style={{width: '90%', flexDirection: 'row', }}>
              <Text style={{color: 'white', fontSize: 20,fontWeight: "bold",paddingBottom:3, alignSelf: "center"}}>Reminder</Text>
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
              <TouchableOpacity style={styles.actionReminderButton} >
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#36C8E2'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

        )}
      </View>
    </>
  );
};


const PlayTimer = () => {
  const formatNumber = (number) => `0${number}`.slice(-2);
  const getRemaining = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
  };
  const { minutes, seconds } = getRemaining(2);
  return (
    <>
         <Text style={styles.timeTitle}>{`${minutes}:${seconds}`}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  topSection: {
    width: '100%',
    height: '30%'
  },
  songImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dateScreen:{
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  centerSection: {
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '35%'
  },
  timeContainer: {
    width: '80%',
    // height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourContainer: {
    marginHorizontal:10,
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  ringContainer: {
    fontWeight: 'bold',
    borderWidth:2,
    marginHorizontal:10,
    marginTop: 60,
    height: '120',
    width: '120',
    padding: 7,
    borderRadius: 20,
    borderColor: '#92E3A9',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 15,
    color: '#92E3A9'
  },
  pickerWrapper: {
    color: '#92E3A9',
    borderRadius: 8,
    width: '100%',
    borderWidth:2,
    borderColor: '#92E3A9',
  },
  picker: {
    color: '#92E3A9',
    fontSize: 25,
    fontWeight: 'bold',
  },
  pickerItem: {
    color: "#92E3A9",
    fontSize: 25,
    fontWeight: 'bold',
  },
  bottomSection: {
    borderWidth:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '35%'
  },
  playButton:{
    marginTop: 0,
    marginBottom: 10 ,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#92E3A9',
    marginHorizontal:40 ,
    marginBottom:10 ,
    
  },
  buttonText: {
    color: '#fff'
  },
  timeTitle:{
    fontSize:120,
    color: '#92E3A9'
  },
  buttonConatiner:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  // For alert 
  ReminderContainer: {
    position: 'absolute', // Ensures it can overlap other components
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
  remindButtonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionReminderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
  },
  selectedOption: {
    color: '#36C8E2', // Blue color for selected option
  },

});



export default MeditatioTimeSet
