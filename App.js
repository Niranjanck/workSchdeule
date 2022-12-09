import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReactDOM } from 'react';


import UserLogin from './pages/UserLogin';
import AdminChat from './pages/Admin/AdminChat';
import AdminNotification from './pages/Admin/AdminNotification';
import AdminSchedule from './pages/Admin/AdminSchedule';
import AdminHome from './pages/Admin/AdminHome';
import AdminSettings from './pages/Admin/AdminSettings';
import AddUsers from './pages/Admin/AddUser';
import AddDepartment from './pages/Admin/AddDepartment';
import AdminChangePass from './pages/Admin/AdminChangePass';
import EmployeeList from './pages/Admin/EmployeeList';
import RemoveUserAndDept from './pages/Admin/RemoveUserAndDept';
import AdminLeaveSansaction from './pages/Admin/AdminLeaveSansaction';
import GroupChat from './pages/Admin/GroupChat';
import UserChat from './pages/Admin/UserChat';
import ChatWithAdmin from './pages/Employees/ChatWithAdmin';
import ChangePassword from './pages/ChangePassword';

import EmpHome from './pages/Employees/EmpHome';
import EmpSettings from './pages/Employees/EmpSettings';
import UserDetails from './pages/Employees/UserDetails';
import EmpChat from './pages/Employees/EmpChat';
import EmpGroup from './pages/Employees/EmpGroup';
import UserLeave from './pages/Employees/UserLeave';
import EmpScheduleList from './pages/Employees/EmpScheduleList';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserLogin"
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen name='UserLogin' component={UserLogin} />
        <Stack.Screen name='AdminChat' component={AdminChat} />
        <Stack.Screen name='AdminNotification' component={AdminNotification} />
        <Stack.Screen name='AdminSchedule' component={AdminSchedule} />
        <Stack.Screen name='AdminHome' component={AdminHome} />
        <Stack.Screen name='AdminSettings' component={AdminSettings} />
        <Stack.Screen name='AddUsers' component={AddUsers} />
        <Stack.Screen name='AddDepartment' component={AddDepartment} />
        <Stack.Screen name='AdminChangePass' component={AdminChangePass} />
        <Stack.Screen name='EmployeeList' component={EmployeeList} />
        <Stack.Screen name='RemoveUserAndDept' component={RemoveUserAndDept} />
        <Stack.Screen name='AdminLeaveSansaction' component={AdminLeaveSansaction} />
        <Stack.Screen name='GroupChat' component={GroupChat} />
        <Stack.Screen name='UserChat' component={UserChat} />
        {/* Users Page */}
        <Stack.Screen name='EmpHome' component={EmpHome} />
        <Stack.Screen name='EmpSettings' component={EmpSettings} />
        <Stack.Screen name='UserDetails' component={UserDetails} />
        <Stack.Screen name='UserLeave' component={UserLeave} />
        <Stack.Screen name='EmpChat' component={EmpChat} />
        <Stack.Screen name='EmpGroup' component={EmpGroup} />
        <Stack.Screen name='EmpScheduleList' component={EmpScheduleList} />
        
        <Stack.Screen name='ChatWithAdmin' component={ChatWithAdmin} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
