import React, { useEffect, useState } from 'react'
import { Appbar, RadioButton } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Divider } from 'react-native-elements';
import { auth,db,rDb } from '../../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
// import { Picker } from 'react-native-picker/picker';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import Select from 'react-select';
import { onValue, ref } from 'firebase/database';
const UserDetails = ({ navigation }) => {
    // const [Department, setDepartment] = useState('')
    // const [dptList,setDptList]=useState([])
    // useEffect(() => {
    //     const list = []
    //     const querySnapshot = getDocs(collection(db, 'department'))
    //         .then((docs) => {
    //             docs.forEach((doc) => {
    //             list.push(doc.data().DeptName)
    //             })
    //             setDptList(list)
    //         })
    //         .catch((err) => {
    //         console.log(err)
    //         })
    //     return querySnapshot
    // }, []);
    const [dept, setDept] = useState({});
    const [loading, setLoading] = useState('');
    useEffect(() => {
        return onValue(ref(db, '/todo'), QuerySnapshot => {
            let data = querySnapshot.val() || {};
            let todoItems = { ...data };
            setDept(todoItems);
        });
    }, []);
    return (
        <>
            <View style={styles.container}>
                <RadioButton.Group
                    onValueChange={onCheck}
                    value={doneState}
                >
                    <View style={styles.radio}>
                        <Text style={styles.radioText}>Department</Text>
                        <RadioButton value="IT" /> 
                    </View>
                </RadioButton.Group>
                </View>
        </>
    )
}
const styles = StyleSheet.create({

})
export default UserDetails