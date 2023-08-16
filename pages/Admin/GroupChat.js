import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Icon } from 'react-native-elements'
import { ScreenHeight } from 'react-native-elements/dist/helpers'
import {
  getFirestore,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
  collection,
} from 'firebase/firestore'
import moment from 'moment'

const firestore = getFirestore()

const GroupChat = () => {
  const [msg, setMsg] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [DATA, setDATA] = useState([])
  const [uData, setUdata] = useState({ name: 'Admin' })

  const sentMsg = async () => {
    try {
      // console.log(uData);
      console.log('senting...')
      setMsg('')
      await addDoc(collection(firestore, 'groupChat'), {
        name: 'Admin',
        message: msg,
        dateTime: moment()
          .utcOffset('+05:30')
          .format('DD MMMM YYYY, h:mm:ss a'),
      })
        .then(() => {
          setIsFetching(true)
          setIsFetching(false)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch {
      ;(e) => {
        console.log(e.message)
      }
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, 'groupChat'), (docs) => {
      docs.forEach((doc) => {
        let isFound = false
        isFound = DATA.some((element) => {
          if (element.id == doc.id) {
            // console.log("found");
            return true
          }
          // console.log("not found");
          return false
        })
        if (!isFound) {
          let id = { id: doc.id }
          DATA.push({ ...id, ...doc.data() })
          // console.log(DATA)
          DATA.sort((a, b) =>
            moment(a.dateTime, 'DD MMMM YYYY, h:mm:ss a').isAfter(
              b.dateTime,
              'DD MMMM YYYY, h:mm:ss a',
            )
              ? 1
              : -1,
          )
          setIsFetching(true)
          setIsFetching(false)
        }
      })
    })
    console.log(DATA)
    return unsub
  }, [])

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messages,
        item.name == uData.name ? { alignItems: 'flex-end' } : {},
      ]}
    >
      <View style={styles.message}>
        {item.name != uData.name ? (
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'grey',
              marginBottom: 5,
            }}
          >
            {item.name}
          </Text>
        ) : (
          <></>
        )}
        <Text>{item.message}</Text>
        <Text style={{ fontSize: 9, marginTop: 5, color: 'grey' }}>
          {item.dateTime}
        </Text>
      </View>
    </View>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          top: 10,
        }}
      >
              <Image style={styles.icn}
              // source={require('./assets/grp.jpg')} 
              />
        <Text style={styles.txt}>Group</Text>
      </View>
      <ImageBackground
        resizeMode="cover"
       // source={require('./assets/splash.png')}
        style={styles.imgBack}
      ></ImageBackground>
      <View style={styles.messageContainer}>
        <View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            inverted
            contentContainerStyle={{ flexDirection: 'column-reverse' }}
            // onRefresh={setIsFetching(true)}
            // refreshing={isFetching}
          />
        </View>
      </View>
      <View style={styles.dum}></View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={msg}
          onChangeText={(text) => {
            setMsg(text)
          }}
          placeholder="Type here..."
        />
        <Icon raised name="send" onPress={sentMsg} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default GroupChat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: '80%',
    borderRadius: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icn: {
    left: 20,
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  txt: {
    left: 35,
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    // position: 'absolute',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 25,
    marginVertical: 3,
    maxWidth: '90%',
    // flexDirection: 'row'
  },
  imgBack: {
    height: ScreenHeight - 90,
    top: 90 + StatusBar.currentHeight,
    position: 'absolute',
    width: '100%',
  },
  messageContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'column-reverse',
    marginTop: 10,
    paddingTop: 5,
    overflow: 'hidden',
  },
  dum: {
    height: 65,
    width: '100%',
    backgroundColor: 'transparent',
  },
  messages: {
    position: 'relative',
    // backgroundColor: 'yellow',
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'flex-start',
  },
})
