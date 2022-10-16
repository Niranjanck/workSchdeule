import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Keyboard,
} from 'react-native'
import { Provider, Appbar, Card } from 'react-native-paper'
import AdminHome from './AdminHome'
import { auth,db ,rDb} from '../../firebase'
import { collection, addDoc, setDoc } from 'firebase/firestore'
import { getDatabase, set ,ref} from 'firebase/database'



const AddDepartment = ({ navigation }) => {
    const [DeptName, setName] = useState('');
    const [AdminPass, setPass] = useState('');
    const [dID,setID]=useState('');
const AddDept = async () => {
    if (DeptName == '' || AdminPass == '') {
        alert("Please enter department name")
        return
    }
    else {
        if (AdminPass == "admin123" && DeptName != '') {
            try {
                setName('')
                await addDoc(collection(db, "department"), {
                    DeptName: DeptName,
                    DeptID: dID,
                }
                    
                    
                );

                    console.log("Department Added Successfully");
                alert("Department Added Successfully");
            }
            catch (error) {
                alert("error"+DeptName)
            }
        }
        else {
            alert("Admin Password is incorrect")
        }
        
    }
}
return (
    <>
        <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
            <Appbar.BackAction onPress={() => navigation.navigate(AdminHome)} />
            <Appbar.Content title="Add Department" />
        </Appbar.Header>
        <ScrollView style={styles.ScreenView}>
            <View style={styles.FullScreen}>
                <Text style={styles.NameText}>Enter department ID</Text>
                <TextInput style={styles.Input}  placeholder="ID" 
                    onChangeText={(value) => setID(value)} />
                <Text style={styles.NameText}>Enter department Name</Text>
                <TextInput style={styles.Input}  placeholder="Department Name" 
                    onChangeText={(value) => setName(value)} />
                <Text style={styles.NameText}>Enter admin Password</Text>
                <TextInput style={styles.Input} placeholder="Password" secureTextEntry={true}
                    onChangeText={(value) => setPass(value)}
                />
                <View style={styles.btn}>
                    <Button title="Add Department"
                        onPress={AddDept}
                    />
                </View>
                
                

            </View>
            
        </ScrollView>
    </>
)
}
const styles = StyleSheet.create({

    NameText: {
        fontSize: 20,
        color: 'black',
        letterSpacing: 1,
        alignItems: 'center',
        top: 30,
        left: 10,

    },
    Input: {
        margin: 30,
        borderWidth: 1,
        height: 40,
        width: 250,
        top: 30,
        borderRadius: 5,
        borderColor: '#1e90ff',
        marginTop: 10,
        paddingLeft: 10,
    },
    btn:
    {
        width: 150,
        height: 50,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
    }
})
export default AddDepartment
