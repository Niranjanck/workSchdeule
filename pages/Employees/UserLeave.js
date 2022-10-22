import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { auth, db, rDb } from '../../firebase'
import { Provider, Appbar, Card,Button, TextInput } from 'react-native-paper'
import { collection, getDoc, QuerySnapshot,doc,setDoc, onSnapshot, DocumentSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
import {ref,set,child,get,getDatabase} from 'firebase/database';
import DatePicker from 'react-native-modern-datepicker';
const UserDetails = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [leave, setLeave] = useState({});
    let date1 = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    let maxDate =new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()+7);


    useEffect(() => {
        console.log(maxDate);
        // const leaveDetails = doc(db, 'leaveDetails', auth.currentUser.uid);
        // const docSnap = getDoc(leaveDetails);
        // docSnap.then((doc) => {
        //     if (doc.exists()) {
        //         setLeave(doc.data());

        //     }
        //     else
        //     {
        //         console.log("No such document");
            
        //         }
        // }
        // )
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'leaveDetails/' + auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setLeave(snapshot.val());
            } else {
                console.log("No data available");
                
            }
        }
        ).catch((error) => {
            console.error(error);
        }
        );

    }, [])
    // add leave deatils to firebase
    const addLeave = async () => {
        console.log(reason,date);
        if (reason != '' && date != '') {
        //const docRef = doc(rDb, "leaveDetails", auth.currentUser.uid);
            
            try {
                // await setDoc(docRef, {
                //     reason: reason,
                //     date: date,
                //     status: "Pending",
                //     employee: auth.currentUser.email
                // })
                //     .then(() => {
                //         setDate('');
                //         setReason('');
                //     })
            
                // console.log("Document written with ID: ", docRef.id, date, maxDate);
                // alert("Leave Applied Successfully")
                
                    set(ref(rDb, 'leaveDetails/' + auth.currentUser.uid), {
                        reason: reason,
                        date: date,
                        status: 'pending',
                        employee: auth.currentUser.email

                    })
                        .then(() => {
                            setDate('');
                            setReason('');
                        }
                    )
                    alert("Leave Applied Successfully")
                
            } catch (e) {
                console.error("Error adding document: ", e);

            }
        }
        else {
            alert("Please fill all the fields")
        }
    }

    return (
        <>
            <Appbar style={{ backgroundColor: "green", minHeight: 100 }}>
                <Text style={{ fontSize: 20 }}>
                    Leave From
                </Text>
            </Appbar>
            <ScrollView style={styles.mainMenu}>
                <View style={styles.container}>
                    {/* date picker */}
                    <DatePicker
                        current={date1.toString()}
                        minimumDate={date1.toString()}
                        maximumDate={maxDate.toString()}
                        onDateChange={(date) => { setDate(date) }}
                        style={styles.datePicker}
                    />
                    

                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.textInput}
                        label="Reason"
                        onChangeText={(text) => setReason(text)}
                    ></TextInput>
                    <Button
                        title='Add'
                        style={styles.btnPicker}
                        mode="contained"
                        onPress={addLeave}
                    >Add
                    </Button>
                </View>
                {/* Leve details */}
                <View style={styles.container}>
                    <Text style={styles.textOptions}>Reason :{leave.reason}</Text>
                    <Text style={styles.textOptions}>Status :{leave.status}</Text>
                    <Text style={styles.textOptions}>Date :{leave.date}</Text>
                </View>
            </ScrollView>
            
        </>
    )
            }
                
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        elevation: 5

    },
    textInput: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        elevation: 5
    },
    datePicker: {
        height: 350
    }

})
export default UserDetails
