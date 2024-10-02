import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import TopTabsNavigator from './TopTabsNavigator'; 

const AllTab = (navigation) => {
    const [CurrentDate, setCurrentDate] = useState('')

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
                        <Text style={{fontSize: 13, position: 'absolute'}}>99</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight: 500, }}>
                        On Progress
                    </Text>
                    <View style={{backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5}}>
                        <Text style={{fontSize: 13, position: 'absolute'}}>99</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight: 500, }}>
                        Completed
                    </Text>
                    <View style={{backgroundColor: 'grey', width: 23, height: 23, borderRadius: 100, alignItems: 'center', bottom: 5}}>
                        <Text style={{fontSize: 13, position: 'absolute'}}>99</Text>
                    </View>
                </View>
            </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
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
    }
})


export default AllTab
