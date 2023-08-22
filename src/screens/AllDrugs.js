import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setDrugID, setDrugs } from '../redux/drug_redux/actions';
import GlobalStyle from '../utils/GlobalStyle';

export default function AllDrugs({ navigation }) {

    const { drugs } = useSelector(state => state.drugReducer);
    ("Totaol Drugs: ",drugs);
    const dispatch = useDispatch();

    useEffect(() => {
        getDrugs();
    }, [])

      // Function to format the date from DateTime string
  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return dateFormatter.format(dateObj);
  };

// Function to format the time from time string
const formatTime = (timeString) => {
    // Assuming 'timeString' is in the format 'HH:mm'
    // You can adjust the format based on your specific time string format
    const [hours, minutes] = timeString.split(':');
    const hoursIn12HourFormat = hours % 12 || 12;
    const meridiem = hours < 12 ? 'AM' : 'PM';
    return `${hoursIn12HourFormat}:${minutes} ${meridiem}`;
  };
  

    const getDrugs = () => {
        AsyncStorage.getItem('Drugs')
            .then(drug => {
                ("All Drugs: ",drug);
                const parsedTasks = JSON.parse(drug);
                if (parsedTasks && typeof parsedTasks === 'object') {
                    dispatch(setDrugs(parsedTasks));
                    ("Totaol Drugs update: ",drugs);
                }
            })
            .catch(err => (err))
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={drugs}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setDrugID(item.ID));
                            navigation.navigate('Create Drugs');
                        }}
                    >
                        <Text
                            style={[
                                GlobalStyle.CustomFontHW,
                                styles.title
                            ]}
                            numberOfLines={1}
                        >
                          Name:  {item.Title}
                        </Text>
                        <Text
                            style={[
                                GlobalStyle.CustomFontHW,
                                styles.subtitle
                            ]}
                            numberOfLines={1}
                        >
                          Dosage:  {item.Dosage}
                        </Text>
                        <Text
                            style={[
                                GlobalStyle.CustomFontHW,
                                styles.subtitle
                            ]}
                            numberOfLines={1}
                        >
                          Frequency:  {item.Freq}
                        </Text>
                        <Text
                            style={[
                                GlobalStyle.CustomFontHW,
                                styles.subtitle
                            ]}
                            numberOfLines={1}
                        >
                           Date: {formatDate(item.DateTime)}        Time: {formatTime(item.DateTime)}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setDrugID(drugs.length + 1));
                    navigation.navigate('Create Drugs');
                }}
            >
                <FontAwesome5
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    subtitle: {
        color: '#999999',
        fontSize: 20,
        margin: 5,
    }
})
