import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, shadow, sizes, spacing } from './theme';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const taskList = [
    {
      id: 1,
      image: require('../assets/registerpage.jpg'),
      title: 'Register Page',
      location: 'task-1',
    },
    {
      id: 2,
      image: require('../assets/login.png'),
      title: 'Login Page',
      location: 'task-2',
    },
    {
      id: 3,
      image: require('../assets/bottomnavigation.png'),
      title: 'Bottom Navigation',
      location: 'task-3',
    },
    {
      id: 4,
      image: require('../assets/homescreen.png'),
      title: 'Home Screen',
      location: 'task-4',
    },
    {
        id: 5,
        image: require('../assets/carousel.png'),
        title: 'Carousel',
        location: 'task-5',
      },
      {
        id: 6,
        image: require('../assets/tasktodo.jpg'),
        title: 'Todo Page',
        location: 'task-6',
      },
      {
        id: 7,
        image: require('../assets/Task.jpg'),
        title: 'Router Navigation',
        location: 'task-7',
      },
      {
        id: 8,
        image: require('../assets/profile.jpg'),
        title: 'Profile page',
        location: 'task-8',
      },
      {
        id: 9,
        image: require('../assets/officeTask.png'),
        title: 'Asycn storage',
        location: 'task-9',
      },
      {
        id: 10,
        image: require('../assets/jsonserver.jpg'),
        title: 'Json-server',
        location: 'task-10',
      },
  ];
const TaskList = () => {
  return (
    <View style={styles.container}>
    {taskList.map((item) => {
        return(
            <TouchableOpacity style={styles.cardContainer} key={item.id}>
            <View style={[styles.card, shadow.light]}>
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image} />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
              </View>
              </View>
            </TouchableOpacity>
        )
    })}
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
 },
 cardContainer: {
    marginLeft: 24,
    marginBottom: 24
 },
 card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
})
export default TaskList