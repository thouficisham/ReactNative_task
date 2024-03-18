import { View, Text, Animated, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskIcon from 'react-native-vector-icons/MaterialIcons'
import Todo from './Todo';
import Profile from './Profile';
import LandingPage from './LandingPage';
import HeaderComponent from './HeaderComponent';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <>
      <HeaderComponent />
      <Tab.Navigator initialRouteName='landingpage' screenOptions={{
        headerShown: false, tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar
      }}>
        <Tab.Screen
          name='landingpage'
          component={LandingPage}
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Icon name="home" size={30} color={focused ? "#fff" : '#000'} />
            ),
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontSize: 16
            }
          }}
        />
        <Tab.Screen
          name='Todo'
          component={Todo}
          options={{
            title: "Todo",
            tabBarIcon: ({ focused }) => (
              <TaskIcon name="task" size={30} color={focused ? "#fff" : '#000'} />
            ),
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontSize: 16
            }
          }}
        />
        <Tab.Screen
          name='profile'
          component={Profile}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Icon name="user" size={30} color={focused ? "#fff" : '#000'} />
            ),
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#000",
            tabBarLabelStyle: {
              fontSize: 16
            }
          }}
        />

      </Tab.Navigator>
    </>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  tabBar: {
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 60,
    height: 60,
    backgroundColor: '#82A3FF'
  }
})