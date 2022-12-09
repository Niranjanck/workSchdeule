import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native'
import { Provider, Appbar, Card } from 'react-native-paper'
import email from 'react-native-email'
import { auth, db, rDb } from '../../firebase'
import {ref,set,child,get,getDatabase} from 'firebase/database';
import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { collection,addDoc,query,onSnapshot,getDocs, setDoc, doc } from 'firebase/firestore';
import SelectList from 'react-native-dropdown-select-list';



const AddUser = ({ navigation }) => {   
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Dept, setDept] = useState('');
    const [Name, setName] = useState('');
    let empEmail = Email;
    const [deptList, setDeptList] = useState([]);
    useEffect(() => {
        const list = []
        const querySnapshot = getDocs(collection(db, 'department'))
            .then((docs) => {
                docs.forEach((doc, index) => {
                    list.push({ value: doc.data().DeptName, key: doc.data().id })
                    
                })
                setDeptList(list)
                
            
            }
            )
    },[])
const addUser = () => {
    
    createUser();
    const to = [Email] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [], // string or array of email addresses
        bcc: [], // string or array of email addresses
        subject: 'Work Schedule',
        body: 'Hello '+ Name +' Your password is ' + Password + ' and your department is ' + Dept + '.'
    }).catch(console.error)
    // userDetails();
    
}
    const userDetails = async () => {
        try {
            await setDoc(doc(db, 'userDetails',empEmail), {
                userEmail: empEmail,
                userDept: Dept,
                userName: Name,

            })
                .then(() => {
                    alert("User added successfully")
                    setEmail('')
                    setPassword('')
                    setDept('')
                    setName('')
                }
                )
        }
        catch (error) {
            alert(error)
        }
    }
    const createUser = () => {
        if (Email != '' && Password != '' && Dept != '' && Name != '') {
            
            createUserWithEmailAndPassword(auth, Email, Password)
                .then((userCredentials) => {
                    // Signed in
                    // ...
                    const user = userCredentials.user;
                    alert('User Created')
                    userDetails();
                })
                .catch((error) => {
                    alert("something went wrong")
                });
        }
        else
        {

            alert("Please enter all details"+Email+Password+Dept+Name)
        }
    }
    // const setLeave = async () => {
    //     try {
    //         set(ref(rDb, 'leaveDetails/' + Email), {
    //             reason: '',
    //             status: '',
    //             date: '',
    //             employee:Email
    //         })
    //     }
    //     catch (error) {
    //         alert(error)
    //     }
    // }
    return (
        <>
            <ScrollView style={styles.ScreenView}>
                <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
                    <Appbar.BackAction onPress={() => navigation.navigate('AdminHome')} />
                    <Appbar.Content title="Add User" />
                </Appbar.Header>

                <View style={styles.TotalScreen}>
                    <Text style={styles.NameText} >Enter User Name</Text>
                    <TextInput style={styles.Input} placeholder="User Name" onChangeText={ (value)=> setName(value)} />
                    <Text style={styles.NameText} >Enter User Email</Text>
                    <TextInput
                        style={styles.Input}
                        // placeholder="User Email"
                        label="Email"
                        onChangeText={ (value) => setEmail(value)}
                        
                    />
                    <Text style={styles.NameText} >Enter User Password</Text>
                    <TextInput style={styles.Input} placeholder="User Password" secureTextEntry={true}
                        onChangeText={ (value)=>setPassword(value)}
                    />
                    <View style={styles.container}>
                        <Text style={styles.NameText}>Select User Department</Text> 
                        {/* drop list */}
                    </View>
                        <SelectList setSelected={setDept} data={deptList} style={styles.dropp} />
                    <View style={styles.btn}>
                        <Button title="Add User"  onPress={addUser}/>
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
    },
    container: {
        backgroundColor: 'white',
        marginBottom: 40,
      //padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
        },
     placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
        },
        dropp: {
        marginTop: 10,
    }
})
export default AddUser
