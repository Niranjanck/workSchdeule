import { async } from '@firebase/util'
import { collection, getDocs,doc,updateDoc, deleteDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  FlatList,
  RefreshControl,
  
  ActivityIndicator,
} from 'react-native'
import { Provider, Appbar, Card, List } from 'react-native-paper'
import { auth,rDb,db} from '../../firebase'

const AdminLeaveSansaction = ({ navigation }) => {
  const [data, setData] = useState([])
  const [emailList, setEmail] = useState([])
  const [leave, setLeave] = useState([])
  const [DATA, setDetails] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [approve, setApprove] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  //let currentDate = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();

  // email listing

  useEffect(() => {
    takeEmail();
    
    takeLeave();
    console.log(leave)

  }, [])

  const takeEmail = async () => {
    const list1 = []
    console.log("f")
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    await getDocs(collection(db, 'userDetails'))
        .then((docs) => {
          docs.forEach((doc) => {
            console.log("helloooo")
            list1.push({ email: doc.data().userEmail, username: doc.data().userName, department: doc.data().userDept })
            //console.log("heloo  ", doc.data().userEmail, "name= ", doc.data().userName, "dept ==", doc.data().userDept)
          })
          setEmail(list1)
          console.log("List",list1)


        })
  
  }

  // leave selection
  const takeLeave = async () => {
    
    let leaveDet=[]
    emailList.forEach((doc, index) => {
      console.log("--->",doc.value)
      getDocs(collection(db, 'leaveDetails'))
        
        .then((docs) => {
          docs.forEach((det, index) => {
            if (doc.email == det.data().employee)
            {
              console.log(det.data().date, det.data().employee, det.data().reason)
              leaveDet.push({ email:doc.email,reason: det.data().reason, username: doc.username, date: det.data().date, department: doc.department,status:det.data().status })
              // console.log(leaveDet)
              
            }
            setLeave(leaveDet)
            console.log(leave)

        })
      })
      
    })
  }
  async function cancelLeave()  {
    try {
      console.log("hello",selectedId)
      const updateLeave = doc(db, "leaveDetails", selectedId)
      await updateDoc(updateLeave, {
        status: "reject"
      })
      alert("Leave Cancelled")
    }
    catch (error)
    {
      console.log("error")
    }
    
  }
  async function approveLeave() {
    try {
      console.log("sdfgh",approve)
      const updateLeave = doc(db, "leaveDetails", approve)
      await updateDoc(updateLeave, {
        status: "approve"
      })
      alert("Leave Approved")
      deleteDoc(doc(db, "schedule", approve))
      console.log("deleted")
    }
    catch (error) {
      console.log("error")
    }
  }
  const onRefresh = () => {
    console.log("refreshing")
    takeEmail()
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }


  // button disabling


  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
        
          <Appbar.Content title="Leave Sanction" />
      </Appbar.Header>

      <FlatList
        data={leave}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.heading}>{item.username}</Text>
            
            <Text style={styles.text}>Reason: {item.reason}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>Department: {item.department}</Text>
            <View style={styles.buttons}>
              <Button style={styles.btn} title='Approve' onPress={() => { setApprove(item.email); approveLeave() }}  />
              <Button style={styles.btn} title='Cancel' onPress={() => { setSelectedId(item.email); cancelLeave() }}/>
            </View>
          </Card>
        )}
        keyExtractor={(item,index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={takeEmail} />
        }
        />
      <Button title="refresh" onPress={takeLeave} />
          
    </>
  )
}
const styles = StyleSheet.create({
  card: {
    
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f8ff',
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    height: 'auto',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000080',
  },
})
export default AdminLeaveSansaction
