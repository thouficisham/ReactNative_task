import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import AnotherIcon from 'react-native-vector-icons/Feather'

const HeaderComponent = () => {
    const [userInfo, setUserInfo] = useState({})
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userInfo');
                if (userData) {
                    setUserInfo(JSON.parse(userData));
                } else {
                    console.log('User data not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData()
    }, [])

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('userInfo')
            navigation.navigate('SignUp')
        } catch (error) {
            console.log("errorLoggingout", error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Hi, {userInfo.name}</Text>
                <Text style={styles.headerMyApp}>My TaskApp</Text>
                <AnotherIcon
                    name='log-out'
                    onPress={() => handleLogOut()}
                    color={'#fff'}
                    size={20}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#82A3FF'
    },
    header: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        marginHorizontal: 10,
        elevation: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    headerMyApp: {
     color: '#fff',
     fontSize: 20,
     fontWeight: 'bold',
     marginRight: 50
    }
});

export default HeaderComponent;
