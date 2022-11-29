import React, { useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements';
import { auth } from '../../firebase'
import { signOut,onAuthStateChanged } from 'firebase/auth';
const EmpSettings = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user == null)
      {
        navigation.navigate('UserLogin')
      }
    })
    return unsubscribe
  }, [])
  return (
    <>
      <Appbar style={{ backgroundColor: "#1e90ff", minHeight: 100 }}>
        <Text style={{ fontSize: 20 }}>
          Settings
        </Text>
      </Appbar>
      <ScrollView style={styles.mainMenu}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.chatPersons} onPress={() => navigation.navigate('ChangePassword')}>
            <View style={styles.wrapper}>
              <Text style={styles.textOptions}>Change Password</Text>
            </View>
            
          </TouchableOpacity>
          <Divider orientation='horizontal' width={1} color='#000'/>
          <TouchableOpacity style={styles.chatPersons} onPress={()=>{signOut(auth)}}>
            <View style={styles.wrapper}>
              <Text style={styles.textOptions}>
                Logout
              </Text>
            </View>
            </TouchableOpacity>
          
        </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    height: 100,
    backgroundColor: 'transparent',
    padding: 35,
    marginTop:10,
  },
  textOptions: {
    margin: 'auto',
    fontSize: 18,
    color: '#000',
    
  }
 
})
export default EmpSettings