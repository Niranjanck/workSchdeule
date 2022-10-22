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
import { auth } from '../../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const AdminLeaveSansaction = ({ navigation }) => {
  useEffect(() => {
    
  }, [])
  return (
    <>
        <Appbar.Header style={{ backgroundColor: '#1e90ff' }}>
          <Appbar.Content title="Leave Sansaction" />
        </Appbar.Header>
      <ScrollView style={styles.ScreenView}>
        
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({

})
export default AdminLeaveSansaction
