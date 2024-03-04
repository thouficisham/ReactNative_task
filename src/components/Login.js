import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MyAppApi } from "../api/myAppapi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation, route }) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState(false);
  const [userData, setUserData] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    const url = MyAppApi.myAppUsers;
    axios.get(url)
      .then((res) => setUserData(res.data))
      .catch((err) => Alert.alert(err))
      .finally(() => { })
  }

  const handleInputChange = (field, value) => {
    setFormInput({ ...formInput, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const validUser = userData.find(
        (item) => item.email === formInput.email && item.password === formInput.password
      );

      if (validUser) {
        console.log(validUser, "validUser");
        await AsyncStorage.setItem('userInfo', JSON.stringify(validUser));
        setFormInput({ email: '', password: '' });
        setValidation(false);
        Alert.alert('Login successfully');
        navigation.navigate("TabNavigator");
      } else {
        Alert.alert('Invalid login credentials');
        setValidation(true);
      }
    } catch (error) {
      console.error('Error handling login:', error);
    }
  };
  return (

    <View
      style={{
        height: '100%',
        backgroundColor: "#e8ecf4",
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <KeyboardAvoidingView behavior="padding">
        <View>
          <Text style={styles.title}>Sign in to MyApp</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="johnExample@.com"
              placeholderTextColor={"#6b7280"}
              value={formInput.email}
              onChangeText={(event) => handleInputChange("email", event)}
            />
            {validation && (
              <Text style={{ color: "red", fontSize: 13 }}>
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
              placeholderTextColor={"#6b7280"}
              value={formInput.password}
              onChangeText={(event) => handleInputChange("password", event)}
            />
            {validation && (
              <Text style={{ color: "red", fontSize: 13 }}>
                please enter valid password
              </Text>
            )}
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.SignUpContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account {" "}<Text style={{ color: '#82A3FF' }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>

  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    fontWeight: "700",
    textAlign: "center",
    padding: 50,
    color: '#242424'
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#242424",
    marginBottom: 10,
  },
  inputControl: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#242424",
  },
  form: {
    marginBottom: 24
  },
  formAction: {
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#82A3FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#82A3FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  SignUpContainer: {
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 17,
    fontWeight: "700",
    color: '#000',
  }
});
