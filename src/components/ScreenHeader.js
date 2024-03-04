import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sizes, spacing} from '../components/theme';

const ScreenHeader = ({mainTitle, secondTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.secondTitle}>{secondTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: '#000'
  },
  secondTitle: {
    fontSize: sizes.title,
    color: '#000'
  },
});

export default ScreenHeader;
