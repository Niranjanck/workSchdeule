import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminChat from './AdminChat';
import AdminNotification from './AdminNotification';
import AdminSettings from './AdminSettings';
import AdminSchedule from './AdminSchedule';
import { Ionicons , FontAwesome } from "@expo/vector-icons";
import AdminLeaveSansaction from './AdminLeaveSansaction';


const Tab = createBottomTabNavigator();

const AdminHome = ({ navigation }) => {
    
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
                component={AdminChat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='chatbubble' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Leave"
                component={AdminLeaveSansaction}
                options={{
                    tabBarLabel: 'Leave',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='envelope-open-o' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={AdminSchedule}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='calendar' color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={AdminSettings}
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
export default AdminHome;