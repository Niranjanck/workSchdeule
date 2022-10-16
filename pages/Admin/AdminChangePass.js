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
// import { auth } from '../../firebase'
// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const AddChagePass = ({ navigation }) => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user != null) {
//         if (user.email == 'admin@gmail.com') {
//           console.log('We are authenticated now!')
//           navigation.replace('AdminHome')
//         }else{
//             alert("You are not autherised")
//         }
//       } else {
//         console.log('Not logged In')
//       }
//     })
//     return unsubscribe
//   }, [])

//   const handleSignup = () => {
//     if (email != '' && password != '') {
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredentials) => {
//           const user = userCredentials.user
//           console.log(user.email)
//         })
//         .catch((error) => alert(error.code))
//     } else {
//       alert('All fields required!')
//     }
//   }

  return (
    <>
      <ScrollView style={styles.ScreenView}>
        <View style={styles.TotalScreen}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.LoginHeader}>
                <Text
              style={{
                fontSize: 19,
                color: 'white',
                letterSpacing: 1,
                alignItems: 'center',
                top:30,
              }}
            >
              Admin Login
            </Text>
              </View>
              <View style={styles.InputFields}>
                <Text style={styles.txtField}>User name</Text>
                <TextInput
                  style={styles.inputs}
                //   value={email}
                //   onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.txtField}>Password</Text>
                <TextInput
                  secureTextEntry={true}
                //   value={password}
                //   onChangeText={(text) => setPassword(text)}
                  style={styles.inputs}
                />
                <View style={styles.btnMenu}>
                  <View style={styles.btn}>
                    <Button title="Login"
                        // onPress={handleSignup}
                      onPress={() => {
                          navigation.navigate('AdminHome')
                        }}
                    ></Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  btnMenu: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    width: 100,
    height: 50,
  },
  TotalScreen: {
    height: '100%',
  },
  ScreenView: {
    backgroundColor: '#ededed',
  },
  MainMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4e4e4e',
  },
  header: {
    backgroundColor: '#4e4e4e',
    height: 100,
  },
  container: {
    backgroundColor: '#ededed',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    marginTop: 100,
  },
  txtField: {
    marginRight: 20,
    fontSize: 16,
    marginTop: 10,
  },
  LoginHeader: {
    width: '100%',
    height: 80,
    alignItems:'center',
    backgroundColor: '#4e4e4e',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  InputFields: {
    padding: 20,
  },
  inputs: {
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: '#ff850a',
    marginTop: 10,
    paddingLeft: 10,
  },
})
export default AddChagePass
