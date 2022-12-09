import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button, FlatList } from "react-native";
import { Provider, Appbar, Card, List } from "react-native-paper";
import { auth, rDb, db } from "../../firebase";
import { collection, getDocs,doc,updateDoc } from 'firebase/firestore'

const EmpShcduleList = ({ navigation }) => {
    const [fDate, setFdate] = useState('')
    const [tDate, setTdate] = useState('')
    const [dept, setDept] = useState('')
    const [takeWork, setTakeWork] = useState('')
    const [workStatus, setWorkStatus] = useState('')
    const [duty, setDuty] = useState('')
    const readSchduleDetails = async () => {
        
        console.log("f")
        await getDocs(collection(db, 'schedule'))
            .then((docs) => {
                docs.forEach((doc, index) => {
                    if (doc.id == auth.currentUser.email) {
                        console.log("helloooo")
                        setDept(doc.data().dept)
                        setFdate(doc.data().fromDate)
                        setTdate(doc.data().toDate)
                        setTakeWork(doc.data().workStatus)
                        setDuty(doc.data().duty)

                    }
                })
                
                
                console.log()
            })
    }
    useEffect(() => {
        readSchduleDetails();
    }, [])
    const workStatusUpdate = async () => {
        if (workStatus != '') {
            await updateDoc(doc(db, 'schedule', auth.currentUser.email), {
                workStatus: workStatus
            })
                .then(() => {
                    console.log("updated")
                    setWorkStatus('');
                    
                })
            alert("Updated")
        }
        else {
            alert("Please enter work status")
        }
    }
    return (
        <>
            <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
                <Appbar.Content title="Schedule" />
            </Appbar.Header>
            
                <View style={styles.container}>
                <Text style={styles.textHead}>Schedule Details</Text>
                <Text style={styles.textDes}>From Date: {fDate}</Text>
                <Text style={styles.textDes}>To Date: {tDate}</Text>
                <Text style={styles.textDes}>Department: {dept}</Text>
                <Text style={styles.textDes}>Duty: {duty}</Text>
                <Text style={styles.textDes}>Work Status: {takeWork}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Work Status"
                    onChangeText={(text) => setWorkStatus(text)}
                    multiline={true}
                    numberOfLines={4}
                    label="Work Status"

                />
                

                <Button title="Submit" onPress={workStatusUpdate} >Submit</Button>
                <View style={styles.btnRefresh}>
                    {/* <Button title="Refresh" onPress={readSchduleDetails}  >Submit</Button> */}
                    </View>
                </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        elevation: 10,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    textHead: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    textDes: {
        fontSize: 15,
        //fontWeight: 'bold',
        marginBottom: 10
    },
    btnRefresh: {
        marginTop:10
    },
    input: {
        // borderWidth: 1,
        // borderColor: '#777',
        // padding: 8,
        // margin: 10,
        // width: 200,
        // borderRadius: 10,
         backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10
    }

})
export default EmpShcduleList;
