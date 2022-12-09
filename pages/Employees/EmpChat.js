import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Provider, Appbar, Card } from 'react-native-paper'

const EmpChat = ({ navigation }) => {
  const onPress = (path) => {
    console.log(path)
    switch (path) {
      case 'group':
        navigation.navigate('EmpGroup')
        break
      case 'admin':
        navigation.navigate('ChatWithAdmin')
        break
      default:
        break
    }
  }
  return (
    <View style={StyleSheet.container}>
      <Appbar style={{ backgroundColor: '#1e90ff', minHeight: 100 }}>
        <Text style={{ fontSize: 20 ,textAlign:'center',color:'white',marginLeft:20,marginTop:10 }}>Chat</Text>
      </Appbar>
      <TouchableOpacity onPress={() => onPress('group')}>
        <View
          style={[styles.item, { marginTop: 10 }]}>
                  <Image style={styles.icn}
                    source={require('../../assets/grp.jpg')}
                  />
          <Text style={styles.txt}>Group</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('admin')}>
        <View
          style={styles.item}>
                  <Image style={styles.icn}
                    source={require('../../assets/images.jpeg')}
                  />
          <Text style={styles.txt}>Admin</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 80,
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    flexDirection: 'row',
  },
  icn: {
    left: 10,
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  txt: {
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default EmpChat
