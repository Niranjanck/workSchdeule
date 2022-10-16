import React,{Component} from 'react'
import { Appbar, TextInput , Button} from 'react-native-paper'

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AppRegistry, Animated, } from 'react-native'

const AdminNotification = ({ navigation }) => {
  return (
    <>
      <Appbar style={{ backgroundColor: "green", minHeight: 100 }}>
                <Text style={{ fontSize: 20 }}>
                    Leave Sanscation
                </Text>
            </Appbar>
      <View style={styles.TotalScreen}>
        {/* You can add notification using this section */}        
      
      </View>
          
    </>
  )
}
export default AdminNotification

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  notiCard: {
    width: '90%',
    height: 200,
    backgroundColor: 'gray',
    margin:20,
  },
  btn: {
    height: 50,
    margin: 10,
    padding:5,
    color: 'white',
    backgroundColor: '#2056c9',
  
  },
container: {
      flex: 1,
    },
    viewHolder: {
      height: 55,
      backgroundColor: '#ff4081',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4
    },
    headerText: {
      color: 'white',
      fontSize: 25
    },


})
