import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmpSettings from './EmpSettings';
import UserDetails from './UserDetails';
import UserLeave from './UserLeave';
import { Ionicons , FontAwesome } from "@expo/vector-icons";
import EmpGroup from './EmpGroup';
import EmpChat from './EmpChat';
import EmpScheduleList from './EmpScheduleList';


const Tab = createBottomTabNavigator();

const EmpHome = ({ navigation }) => {
    return (
        <>
            
        <Tab.Navigator
                initialRouteName="AdminChat"
                screenOptions={{
                    headerShown:false,
                }}
        >
            <Tab.Screen
                name="Home" 
                component={EmpChat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='chatbubble' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Leave"
                component={UserLeave}
                options={{
                    tabBarLabel: 'Leave',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='envelope-open-o' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={EmpScheduleList}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='calendar' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={EmpSettings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='settings' color={color} size={size} />
                    ),
                }}
            />
            </Tab.Navigator>
            </>
    );
}


export default EmpHome;