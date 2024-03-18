import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
   const [userInfo, setUserInfo] = useState({})
  const fetchUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      let userDetails = JSON.parse(userInfo);
      setUserInfo(userDetails)
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  
  fetchUserInfo();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/profilepage.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.username}>{userInfo?.name}</Text>
      <Text style={styles.bio}>Software Developer</Text>
      <View style={styles.detailsContainer}>
        <Text style= {{color: '#000'}}>Email:{" "}{userInfo?.email}</Text>
        <Text style= {{color: '#000'}}>Company: ITS</Text>
        <Text style= {{color: '#000'}}>Location: Chennai</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius:100,
    marginBottom: 20,
    resizeMode: 'cover'
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
  },
  bio: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'flex-start',
  },
});

export default ProfileScreen;
