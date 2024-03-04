import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from './theme';
import TaskCarousel from './TaskCarousel';
import ScreenHeader from './ScreenHeader';
import SectionHeader from './SectionHeader';
import TaskList from './TaskList';

const LandingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScreenHeader mainTitle="Find Your" secondTitle="Productive Task" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TaskCarousel />
        <SectionHeader 
             title={"Popular Tasks"} 
             buttonTitle={"See All"} 
             onPress={() => navigation.navigate("Todo")} />
        <TaskList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default LandingPage;
