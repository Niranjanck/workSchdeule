import React from 'react'
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

const AdminChat = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserChat', item)}>
      <View style={[styles.item, { marginTop: 10 }]}>
        <Image
          style={styles.icn}
          source={require('../../assets/images.jpeg')}
        />
        <Text style={styles.txt}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
    <Appbar style={{ backgroundColor: "green", minHeight: 100 }}>
      <Text style={{ fontSize: 20 }}>
        Chat
      </Text>
      </Appbar>
      {/* <ScrollView> */}
        <View style={StyleSheet.container}>
          <TouchableOpacity onPress={() => navigation.navigate('UserSelection')}>
            <View style={[styles.item, { marginTop: 10 }]}>
              <Image style={styles.icn} source={require('../../assets/grp.jpg')} />
              <Text style={styles.txt}>Group</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            // data={empList}
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
