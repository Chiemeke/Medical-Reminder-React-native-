import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../utils/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setDrugs } from '../redux/drug_redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function CreateDrugs({ navigation }) {
    var dateTimeString = "";
   
    const formattedDate = new Date().toISOString();
   const [currentDate,setCurrentDate] = useState(new Date());
   const [isDate,setIsDate] = useState("");

    var dateObject = new Date(currentDate);
    const [year,setYear] = useState( dateObject.getFullYear());
    const [month,setMonth] = useState( dateObject.getMonth() + 1);// Months are 0-indexed, so add 1
    const [day,setDay] = useState( dateObject.getDate());
    const [hours,setHour] = useState( dateObject.getHours());
    const [minutes,setMinutes] = useState(dateObject.getMinutes());
   

  ("Day,hours: ",day,month,year,hours,minutes);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = (_isDate) => {
        ("isDate:", _isDate);
        setIsDate(_isDate);
        
      setDatePickerVisibility(true);
    };

    const showDateVariables = () => {
        setDatePickerVisibility(true);
      };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      dateTimeString = date;
      setCurrentDate(new Date(dateTimeString));
    // Convert DateTime string to a Date object
     dateObject = new Date(dateTimeString);
     setYear(dateObject.getFullYear());
     setMonth(dateObject.getMonth() + 1);
     setDay(dateObject.getDate());
     setHour(dateObject.getHours());
     setMinutes(dateObject.getMinutes());
   
     console.warn("Date Object:",dateObject.getDate());
      hideDatePicker();
    };
    const { drugs, drugID, } = useSelector(state => state.drugReducer);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    useEffect(() => {
        getTask();
    }, [])

    const getTask = () => {
        const Drug = drugs.find(task => task.ID === drugID)
        if (Drug) {
            setName(Drug.Title);
            setDosage(Drug.Desc);
            setFrequency(Drug.frequency)
            setCurrentDate(Drug.dateTime)
        }
    }

    const setDrugDetails = () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your Medication Name.')
        } else {
            try {
                var Drug = {
                    ID: drugID,
                    Title: name,
                    Dosage: dosage,
                    Freq: frequency,
                    DateTime: dateObject
                }
                const index = drugs.findIndex(drug => drug.ID === drugID);
                let newDrug = [];
                if (index > -1) {
                    newDrug = [...drugs];
                    newDrug[index] = Drug;
                } else {
                    newDrug = [...drugs, Drug];
                }
                AsyncStorage.setItem('Drugs', JSON.stringify(newDrug))
                    .then(() => {
                        dispatch(setDrugs(newDrug));
                        ("Created Drug: ", newDrug);
                        Alert.alert('Success!', 'Medication saved successfully.');
                        navigation.goBack();
                    })
                    .catch(err => (err))
            } catch (error) {
                (error);
            }
        }
    }

    return (
        <View style={styles.body}>
            <TextInput
                value={name}
                style={styles.input}
                placeholder='name'
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                value={dosage}
                style={styles.input}
                placeholder='Dosage'
                multiline
                onChangeText={(value) => setDosage(value)}
            />
                        <TextInput
                value={frequency}
                style={styles.input}
                placeholder='Frequency'
                multiline
                onChangeText={(value) => setFrequency(value)}
            />

            <View>
                <Text>
                    Date: {day}/{month}/{year} Time: {hours}:{minutes}
                </Text>
            </View>
             <CustomButton
                title='Time'
                color='#1eb900'
                style={{ width: '100%' }}
                onPressFunction={() => showDatePicker("time")} 
            />

            <CustomButton
                title='Date'
                color='#1eb900'
                style={{ width: '100%' }}
                onPressFunction={() => showDatePicker("date")} 
            />

            <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={isDate === "date" ? "date" : "time"} 
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            <CustomButton
                title='Save'
                color='#1eb900'
                style={{ width: '100%' }}
                onPressFunction={setDrugDetails}
                
            
              
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    }
})
