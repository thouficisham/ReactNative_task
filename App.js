import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/components/Login'
import Todo from './src/components/Todo'

const stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
      <stack.Screen name="login" component={Login } />
      <stack.Screen name='Todo' component={Todo} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App