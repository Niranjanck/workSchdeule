import React,{useEffect, useState} from 'react'
import { Appbar,Card, Paragraph,Button } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,FlatList, SafeAreaView, RefreshControl,TextInput} from 'react-native'
import SelectList from 'react-native-dropdown-select-list';
import { collection,addDoc,query,onSnapshot,getDocs, setDoc, doc } from 'firebase/firestore';
import { auth, db, rDb } from '../../firebase'
import {ref,set,child,get,getDatabase} from 'firebase/database';

import DatePicker from 'react-native-modern-datepicker';

const AdminSchedule = ({ navigation }) => {
  // Date and Time Picker
  const [fDate, setfDate] = useState('');
  const [tDate, settDate] = useState('');
  const [Dept, setDept] = useState('');
  const [deptList, setDeptList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [empEmail, setEmpEmail] = useState([]);
  const [schedule, setSchedule]=useState([])
  const [emp, setEmp] = useState('');
  let date1 = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  let maxDate =new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()+7);
  const [email, setEmail] = useState('');
  const [refreshing, setRefreshing] = useState(false)
  const [duty, setDuty] = useState('');
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    },2000)
  }
  const scheduleList = async() => {
    const List = []
    await getDocs(collection(db, 'schedule'))
      .then((docs) => {
        docs.forEach((doc, index) => {
          List.push({ Department: doc.data().dept, Employee: doc.data().emp, FromDate: doc.data().fromDate, ToDate: doc.data().toDate, wStatus: doc.data().workStatus, duty: doc.data().duty })
          console.log("-----------------------------------------",doc.data().duty)
        })
        
        setSchedule(List)
        console.log(schedule)
    })
  }
  useEffect(() => {
    scheduleList();
    const list = []
        getDocs(collection(db, 'department'))
            .then((docs) => {
                docs.forEach((doc, index) => {
                  list.push({ value: doc.data().DeptName, key: doc.data().id })
                    
                })
                setDeptList(list)
                
            
            }
            )
  }, [])
  
  const userOptions = async () => {
    const list = []
    const emailList = []

    await getDocs(collection(db, 'userDetails'))
      .then((docs) => {
        docs.forEach((doc, index) => {
          if (doc.data().userDept == Dept) {
            list.push({ value: doc.data().userName, key: doc.data().id })
            emailList.push({ value: doc.data().userEmail, key: doc.data().id })
          }
        })
        setEmpList(list)
        setEmpEmail(emailList)
      }
    )
  }

  const takeEmail = async () => {
 
    await getDocs(collection(db, 'userDetails'))
      .then((docs) => {
        docs.forEach((doc, index) => {
          if (doc.data().userName == emp) {
            console.log(doc.data().userEmail)
            setEmail(doc.data().userEmail)
            console.log(email)
          }
        })
      }
      )
    
  }
  const addSchedule = async () => {
    takeEmail();
    let i = 0
    
    console.log(fDate, tDate, Dept, email);
    await getDocs(collection(db, 'leaveDetails'))
      .then((docs) => {
        docs.forEach((doc, index) => {
          console.log(doc.data().employee,email)
          if (doc.data().employee == email) {
            console.log("dat1=", doc.data().date, "date2=", fDate, "date3=", tDate)
            
            if (doc.data().date >= fDate && doc.data().status=="approve") {
              console.log("first")
              i = 1;
                if (doc.data().date <= tDate && doc.data().status=="approve") {
                console.log("second")
                i = 1;
              }
            }
            
            
          }
          if (i == 0) {
            console.log("not in leave")
            addScheduleToDb();
          }
          else {
            console.log("in leave")
            alert("Employee is on leave")
          }
          console.log("date check")
        })
      })   
  }
  const addScheduleToDb = async () => {
    if (fDate != '' && tDate != '' && Dept != '' && emp != '') {
      try {
                    
        await setDoc(doc(db, "schedule", email), {
          fromDate: fDate,
          toDate: tDate,
          dept: Dept,
          emp: emp,
          duty: duty,
          workStatus: ''
          //email: empEmail
        })
                      
          .then(() => {
            console.log("Document successfully written!");
            alert("Schedule")
          })
      }
      catch (e) {
        console.log("enthoooooooooo");
      }
    }
  }
  // Date and Time Picker completed
  // department List Picker


    return (

      <>
        <Appbar style={{ backgroundColor: "#1e90ff", minHeight: 100 }}>
          <Text style={{ fontSize: 20 }}>
            Schedule
          </Text>
        </Appbar>
        <ScrollView style={styles.TotalScreen}>
          {/* add schedule */}
          <View style={styles.ScheduleSection}>
            {/* DEpartment drop down */}
            <View style={styles.container}>
                <Text style={styles.NameText}>Select Department</Text> 
              {/* drop list */}
              
              <SelectList setSelected={setDept} data={deptList}  />
              <Button
                  title='Add'
                  style={styles.btnPicker}
                mode="contained"
                onPress={userOptions}
                >Add</Button>
              <Text style={styles.NameText}>Select User</Text> 
              {/* drop list */}
              
            <SelectList setSelected={setEmp} data={empList}  />
            </View>
            <View style={styles.container}>
              
              {/* date time picker */}
              <Text style={styles.NameText}>From Date</Text>
            <DatePicker
              current={date1.toString()}
              minimumDate={date1.toString()}
              maximumDate={maxDate.toString()}
              onDateChange={(date) => { setfDate(date) }}
              style={styles.datePicker}
            />
            </View>
            <Text style={styles.NameText}>To Date</Text>
            <DatePicker
              current={date1.toString()}
              minimumDate={date1.toString()}
              maximumDate={maxDate.toString()}
              onDateChange={(date) => { settDate(date) }}
              style={styles.datePicker}
            />
          <TextInput
            style={styles.input}
            placeholder="Set Duty"
            onChangeText={(text) => setDuty(text)}
            multiline={true}
            numberOfLines={4}
            label="Duty"
            />
          </View>
          <Button
            title='Add'
            style={styles.btnPicker}
            mode="contained"
            onPress={addSchedule}
          >Add</Button>
          <Button
            title='Refresh'
            style={styles.btnPicker}
            onPress={scheduleList}
            color="white"
          >Refresh</Button>
            {/* after schedule time */}
          <View
            style={{
              backgroundColor: 'yellow',
              width: '100%',
              padding:10,
            }}
          >
            <FlatList
              data={schedule}
              horizontal={true}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Text style={styles.text}>{item.Employee}</Text>
                  <Text style={styles.text}>Department: {item.Department}</Text>
                  <Text style={styles.text}>Start Date: {item.FromDate}</Text>
                  <Text style={styles.text}>End Date: {item.ToDate}</Text>
                  <Text style={styles.text}>Duty: {item.duty}</Text>
                  <Text style={styles.text}>Status: {item.wStatus}</Text>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
              />
        </View>
        </ScrollView>
      
      </>
    );
}


export default AdminSchedule

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
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
  ScheduleSection: {
    // width: "100",
    // height: "100",
  },
  btnPicker: {
    backgroundColor: "blue",
    color:"white",
    margin: 10,
    width:100,
  },
  card: {
    backgroundColor: 'white',
    margin: 20,

    width:'auto',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    // fontWeight: 'bold',
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
        paddingLeft:10,
        marginBottom: 10
    }
  })