import React,{useEffect, useState} from 'react'
import { Appbar,Card, Paragraph,Button } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectList from 'react-native-dropdown-select-list';
import { collection,addDoc,query,onSnapshot,getDocs, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase'

const AdminSchedule = ({ navigation }) => {
  // Date and Time Picker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [Dept, setDept] = useState('');
  const [deptList, setDeptList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [emp, setEmp] = useState('');
  let empDept;
  useEffect(() => {
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
    await getDocs(collection(db, 'userDetails'))
      .then((docs) => {
        docs.forEach((doc, index) => {
          if (doc.data().userDept == Dept) {
            list.push({ value: doc.data().userName, key: doc.data().id })
          }
        })
        setEmpList(list)
      }
    )
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  // Date and Time Picker completed
  // department List Picker


    return (

      <>
        <Appbar style={{ backgroundColor: "green", minHeight: 100 }}>
          <Text style={{ fontSize: 20 }}>
            Schedule
          </Text>
        </Appbar>
        <View style={styles.TotalScreen}>
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
              
            
            </View>
            {/* date time picker */}
            <Button
              style={styles.btnPicker}
              onPress={showDatepicker}
              title="Date"
              mode='contained'
            >Set Date</Button>
            <Button
              style={styles.btnPicker}
              onPress={showTimepicker}
              title="Time"
              mode='contained'
            >Set Time</Button>
            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <Button
            title='Add'
            style={styles.btnPicker}
            mode="contained"
          >Add</Button>
          {/* after schedule time */}
          <ScrollView
            style={{
              backgroundColor: 'yellow',
              width: '100%',
              padding:10,
            }}
          >
            <Card style={{
              margin:10,
            }}>
              <Card.Title title="Department" />
              <Card.Content>
                <Paragraph>gsdugfsd</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  title='Remove'
                  style={{ backgroundColor: 'blue' }}
                  mode="contained"
                >Remove</Button>
              </Card.Actions>
            </Card>
            
            
            
          </ScrollView>
        </View>
      
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
    margin: 10,
    width:100,
  },
  })