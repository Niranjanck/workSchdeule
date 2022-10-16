import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native'
import { Divider } from 'react-native-elements';
import { Provider, Appbar, Card } from 'react-native-paper'
import { doc, deleteDoc,getDocs,collection } from 'firebase/firestore';
import { auth, db } from '../../firebase'
import { async } from '@firebase/util';
import { deleteUser } from 'firebase/auth';
import SelectList from 'react-native-dropdown-select-list';

const RemoveUserAndDept = ({ navigation }) => {
  const [Email, setName] = useState('');
  const [Password, setPass] = useState('');
  const [Dept, setDept] = useState(''); 
  const [deptList, setDeptList] = useState([]);
  let UserID,DeptID;
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
  }, [])
  const removeDept = async () => {
    if (Dept != '' && Password == "admin123") {
      const querySnapshot = await getDocs(collection(db, "department"));
      querySnapshot.forEach((doc) => {
        if (doc.data().DeptName == Dept) {
          DeptID = doc.id;
          console.log(DeptID);
          deleteDepartment();
        }
      });
    }
  }
  const deleteDepartment = async () => {
    await deleteDoc(doc(db, 'department', DeptID));
    deleteAllUsers();
    alert('Deleted all department and its employees');
  }
  const deleteAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'userDetails'));
    console.log("querySnapshot");
    querySnapshot.forEach((doc) => {
      if (doc.data().userDept == Dept) {
        console.log(doc.data().userName);
        UserID = doc.id;
        deleteUser();
      }
    });
  }
  const deleteUser = async () => {
    try {
      await deleteDoc(doc(db, "userDetails", UserID));
      console.log("User Deleted Successfully");
    }
    catch (error) {
      alert("error"+UserID)
    }
  }
  const removeUser = async () => {
    if (Email != '' && Password == "admin123") {
      try
      {
        const querySnapshot = await getDocs(collection(db, "userDetails"));
        console.log("querySnapshot");
        querySnapshot.forEach((doc) =>  {
          if(doc.data().userEmail==Email)
          {
            console.log("Email Found" + doc.id);
            UserID=doc.id;
            deleteUser();
            alert("User Deleted");
          }
          
        }
        );

      }
      catch (e) {
        alert("User not found"+Email);
      }
    }
      else {
          alert("Please enter valid email and admin password")
      }
  }
  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
            <Appbar.BackAction onPress={() => navigation.navigate('AdminHome')} />
            <Appbar.Content title="Add Department" />
        </Appbar.Header>
        <ScrollView style={styles.ScreenView}>
            <View style={styles.FullScreen}>
                <Text style={styles.NameText}>Enter user email to remove </Text>
                <TextInput style={styles.Input}  placeholder="remove user" 
                    onChangeText={(value) => setName(value)} />
                <View style={styles.btn}>
                    <Button title="Remove User"
                        onPress={removeUser}
                    />
                </View>
        </View>
        <Divider orientation='horizontal' width={1} color='#000' marginTop={20 } />
        <View style={styles.FullScreen}>
          <Text style={styles.NameText}>Enter department ID to remove </Text>
          {/* drop list */}
          <SelectList setSelected={setDept} data={deptList} />
          <Text style={styles.NameText}>Enter admin Password</Text>
                <TextInput style={styles.Input} placeholder="Password" secureTextEntry={true}
                    onChangeText={(value) => setPass(value)}
                />
          <View style={styles.btn}>
              <Button title="Remove Department"  onPress={removeDept}/>
          </View>
        </View>

            
        </ScrollView>
    </>
)
}
const styles = StyleSheet.create({
  FullScreen: {
    marginTop: 20,
  },
    NameText: {
      fontSize: 20,
      marginLeft: 20,
      marginTop: 10,
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
export default RemoveUserAndDept
