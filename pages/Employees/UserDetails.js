import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { auth, db, rDb } from '../../firebase'
import { Provider, Appbar, Card } from 'react-native-paper'
import { collection, getDoc, QuerySnapshot,doc } from 'firebase/firestore';
import { async } from '@firebase/util';
const UserDetails = ({ navigation }) => {
    const [userName, setUserName] = useState('')
    
    // useEffect( async () => {
        
    //     const docRef = doc(db, "userDetails", auth.currentUser.uid);
    //     const docSnap = await getDoc(docRef).then((data) => {
    //         setUserName(data.data().name)
    //     })
            
    //     return docSnap
    // }, [])

    return (
        <>
            <Appbar style={{ backgroundColor: "#1e90ff", minHeight: 100 }}>
                <Text style={{ fontSize: 20 }}>
                    User Details
                </Text>
            </Appbar>
            <ScrollView style={styles.mainMenu}>
                <View style={styles.container}>
                    <Text style={styles.textOptions}>
                        User Details
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.textOptions}>
                        Name
                    </Text>
                    <Text style={styles.textOptions}>
                        {/* {userName} */}
                    </Text>
                    
                </View>
                
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({

})
export default UserDetails