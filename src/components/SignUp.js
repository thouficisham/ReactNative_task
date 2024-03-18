import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MyAppApi} from '../api/myAppapi';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('userInfo');

        if (user) {
          navigation.navigate('TabNavigator');
        } else {
          navigation.navigate('SignUp');
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();
    getUsers();
  }, []);

  const getUsers = () => {
    const url = MyAppApi.myAppUsers;
    axios
      .get(url)
      .then(res => setUserData(res.data))
      .catch(err => Alert.alert(err))
      .finally(() => {});
  };
  const handleInputChange = (feild, value) => {
    setFormInput({...formInput, [feild]: value});
  };

  const handleSignUp = async () => {
    let valid = true;
    const isUserNamevalidate = formInput.name.trim() === '';
    const isEmailvalidate =
      formInput.email.trim() === '' || !EMAIL_REGEX.test(formInput.email);
    const ispassWord = formInput.password.trim() === '';
    const checkIsUserValidation = userData.find(
      item => item.email === formInput.email,
    );
    if (isUserNamevalidate) {
      return Alert.alert('Please fill user name');
    }
    if (isEmailvalidate) {
      return Alert.alert('Invalid Email');
    }
    if (checkIsUserValidation) {
      return Alert.alert('Email Already Exists');
    }
    if (ispassWord) {
      return Alert.alert('Invalid Password');
    }

    if (valid) {
      let url = MyAppApi.myAppUsers;
      await axios
        .post(url, formInput)
        .then(res => {
          Alert.alert('Registered');
          setFormInput('');
        })
        .catch(err => Alert.alert(err))
        .finally(() => navigation.navigate('login'));
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.signUpContainer}>
        <View style={styles.form}>
          <View style={{marginVertical: 20}}>
            <Text style={styles.title}>Create New Account</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="Name"
              placeholderTextColor={'#6b7280'}
              value={formInput.name}
              onChangeText={event => handleInputChange('name', event)}
            />
            {validation && (
              <Text style={{color: 'red', fontSize: 13}}>
                please enter valid email
              </Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="abcExample@.com"
              placeholderTextColor={'#6b7280'}
              value={formInput.email}
              onChangeText={event => handleInputChange('email', event)}
            />
            {validation && (
              <Text style={{color: 'red', fontSize: 13}}>
                please enter valid email
              </Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="******"
              placeholderTextColor={'#6b7280'}
              value={formInput.password}
              onChangeText={event => handleInputChange('password', event)}
            />
            {validation && (
              <Text style={{color: 'red', fontSize: 13}}>
                please enter valid password
              </Text>
            )}
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={() => handleSignUp()}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.LoginContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.LoginText}>
              Already have an account?{' '}
              <Text style={{color: '#82A3FF'}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#242424',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 0,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#242424',
    marginBottom: 10,
  },
  inputControl: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#242424',
    width: 300,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formAction: {
    marginVertical: 20,
  },
  btn: {
    backgroundColor: '#82A3FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#82A3FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: 300,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  LoginContainer: {
    alignItems: 'center',
  },
  LoginText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
});
