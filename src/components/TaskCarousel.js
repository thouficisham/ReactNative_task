import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from './theme';
// import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TOP_TASK = [
    {
      id: 1,
      image: require('../assets/Task.jpg'),
    },
    {
      id: 2,
      image: require('../assets/taskImage.jpg'),
    },
    {
      id: 3,
      image: require('../assets/officeTask.png'),
    }
  ];

const TaskCarousel = () => {
  return (
    <FlatList
      data={TOP_TASK}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: 24,
              marginRight: index === TOP_TASK.length - 1 ? 24 : 0,
            }}>
            <View style={[styles.card, shadow.dark]}>
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
//   titleBox: {
//     position: 'absolute',
//     top: CARD_HEIGHT - 80,
//     left: 16,
//   },
});

export default TaskCarousel;
