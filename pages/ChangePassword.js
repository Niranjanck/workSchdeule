import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native'
import { Provider, Appbar, Card } from 'react-native-paper'
import { auth } from '../firebase'
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth'

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  const user = auth.currentUser

  const changePass = () => {
    if (currentPassword != '') {
      if (newPassword1 == newPassword2) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        )
        reauthenticateWithCredential(user, credential)
          .then(() => {
            console.log('pass authenticated')
            updatePassword(user, newPassword1)
              .then(() => {
                alert('Password Changed')
              })
              .catch((err) => {
                alert(err)
                console.log(err);
              })
          })
          .catch((err) => {
            alert(err)
          })
      } else {
        alert("Passwords don't match")
      }
    } else {
      alert("Current Password can't be empty")
    }
  }

  return (
    <>
      <ScrollView style={styles.ScreenView}>
        <View style={styles.TotalScreen}>
          <Appbar.Header style={styles.header}>
            <Appbar.BackAction
              onPress={() => {
                navigation.goBack()
              }}
            />
            <Appbar.Content title="Change Password" />
          </Appbar.Header>

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.LoginHeader}></View>
              <View style={styles.InputFields}>
                <Text style={styles.txtField}>Old Password</Text>
                <TextInput
                  secureTextEntry
                  style={styles.inputs}
                  value={currentPassword}
                  onChangeText={(text) => setCurrentPassword(text)}
                />

                <Text style={styles.txtField}>New Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.inputs}
                  value={newPassword1}
                  onChangeText={(text) => setNewPassword1(text)}
                />
                <Text style={styles.txtField}>Confirm Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.inputs}
                  value={newPassword2}
                  onChangeText={(text) => {
                    setNewPassword2(text)
                  }}
                />

                <View style={styles.btnMenu}>
                  <View style={styles.btn}>
                    <Button title="Submit" onPress={changePass}></Button>
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
    height: '100%',
    backgroundColor: '#ededed',
  },
  MainMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4e4e4e',
  },
  header: {
    backgroundColor: '#1e90ff',
    height: 100,
  },
  container: {
    backgroundColor: '#ededed',
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 350,
    marginTop: 50,
  },
  txtField: {
    marginRight: 20,
    fontSize: 16,
    marginTop: 10,
  },
  LoginHeader: {
    width: '100%',
    height: 80,
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
export default ChangePassword
