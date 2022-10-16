  // "main": "node_modules/expo/AppEntry.js",

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignin = () => {
      signInWithEmailAndPassword(auth,email, password)
      .then(userCredentials => { 
        const user = userCredentials.user
        if (user.email === "admin@gmail.com")
        {
          navigation.navigate('AdminHome')
        
        }
        else
        {
          navigation.navigate('EmpHome')
          }
      }).catch(error => alert("Username or Password is incorrect"))
    
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <View style={styles.card}>
          <View style={styles.logSelection}>
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                letterSpacing: 1,
                alignItems: 'center',
                top:20,
              }}
            >
              User Login
            </Text>
          </View>
          <View style={styles.form}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                letterSpacing: 1,
                left: 30,
                top: 30,
              }}
            >
              Username
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                letterSpacing: 1,
                left: 30,
                top: 50,
              }}
            >
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputP}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.btn}>
              <Button
                style={styles.button}
                onPress={handleSignin}
                title="Login"
                color="green"
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default UserLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  btn: {
    top: 70,
    width: 100,
    left: 100,
  },
  button: {
    width: 100,
  },
  txt: {
    color: 'white',
    top: 30,
    left: 20,
    fontSize: 27,
  },
  inputP: {
    top: 60,
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 250,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 8,
    left: 30,
    borderWidth: 1,
    borderColor: 'orange',
  },
  input: {
    color: 'black',
    top: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 250,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 8,
    left: 30,
    borderWidth: 1,
    borderColor: 'orange',
  },
  card: {
    minHeight: 300,
    top: 200,
    width: 300,
    height: 250,
    left: 30,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#ffff',
  },
  head: {
    backgroundColor: '#4e4e4e',
    height: 155,
    width: 400,
  },
  logSelection: {
    backgroundColor: '#4e4e4e',
    height: 70,
    width: 300,
    alignItems:'center',
    paddingTop: 10,
    textAlign: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
})
