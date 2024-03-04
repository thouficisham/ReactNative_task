import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

const SectionHeader = ({title, onPress, buttonTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button style={styles.seeallButton} title={buttonTitle}  onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginHorizontal: 25,
         marginTop: 20,
         marginBottom: 10
    },
    title: {
      fontSize: 18,
      fontWeight:'bold',
      color: '#000'
    }
})

export default SectionHeader