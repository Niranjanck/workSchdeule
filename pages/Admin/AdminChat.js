import React, {useState,useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList
} from 'react-native'
import { Appbar } from 'react-native-paper'
import {
  getFirestore,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
  collection,
} from 'firebase/firestore'
const firestore = getFirestore()

const AdminChat = ({ navigation }) => {
    const [empList, setEmpList] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, 'userDetails'), (docs) => {
      docs.forEach((doc) => {
        let isFound = false
        isFound = empList.some((element) => {
          if (element.id == doc.id) {
            //console.log("found");
            return true
          }
          // console.log("not found");
          return false
        })
        if (!isFound) {
          let id = { id: doc.id }
          empList.push({ ...id, ...doc.data() })
          //console.log(DATA)
          setIsFetching(true)
          setIsFetching(false)
        }
      })
    })
    //console.log(empList)
    return unsub
  }, [])
  const renderItem = ({ item }) => (
    console.log("helloo",item.userName),
    <TouchableOpacity onPress={() => navigation.navigate('UserChat', item)}>
      <View style={[styles.item, { marginTop: 10 ,backgroundColor:'#efb'}]}>
        <Image
          style={styles.icn}
          source={require('../../assets/images.jpeg')}
        />
        <Text style={styles.txt} >{item.userName}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
    <Appbar style={{ backgroundColor: "#1e90ff", minHeight: 100 }}>
      <Text style={{ fontSize: 20 }}>
        Chat
      </Text>
      </Appbar>
      {/* <ScrollView> */}
        <View style={StyleSheet.container}>
          <TouchableOpacity onPress={() => navigation.navigate('GroupChat')}>
            <View style={[styles.item, { marginTop: 10 }]}>
              <Image style={styles.icn} source={require('../../assets/grp.jpg')} />
              <Text style={styles.txt}>Group</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={empList}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
          />
        </View>
      {/* </ScrollView> */}
      </>
  )
}
//   return (
//     <>
//       <Appbar style={{ backgroundColor: "green", minHeight: 100 }}>
//                 <Text style={{ fontSize: 20 }}>
//                     Chat
//                 </Text>
//             </Appbar>
//       <ScrollView style={styles.TotalScreen}>
//         <View style={styles.notiCards}>

//         </View>
//       </ScrollView>
//     </>
//   )
// }
export default AdminChat

const styles = StyleSheet.create({
  notiCards: {
    width: '90%',
    height: 200,
    backgroundColor: 'black',
    margin:20,
  },
  icn: {
    left: 10,
    height: 60,
    width: 60,
    borderRadius: 15,
    backgroundColor: '#4e4',
  },
  container: {
    flex: 1,
  },
  item: {
    height: 80,
    alignItems: 'center',
    // backgroundColor: 'yellow',
    padding: 10,
    flexDirection: 'row',
  },
  txt: {
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },

})
