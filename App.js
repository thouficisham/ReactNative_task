import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/components/Login'
import Todo from './src/components/Todo'
import SignUp from './src/components/SignUp'
import BottomTab from './src/components/BottomTab'
import LandingPage from './src/components/LandingPage'

const stack = createNativeStackNavigator()
const App = () => {


  return (
    <>
      <NavigationContainer>
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="SignUp" component={SignUp} />
          <stack.Screen name="login" component={Login} />
          <stack.Screen name='TabNavigator' component={BottomTab} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App