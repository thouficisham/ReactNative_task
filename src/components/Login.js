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
  import React, { useState } from "react";
//   import { useNavigation } from "@react-navigation/native";
  
  const userData = [
    {
      id: 1,
      email: "thoufic@gmail.com",
      password: "12345",
    },
    {
      id: 2,
      email: "isham@gmail.com",
      password: "12345",
    },
  ];
  const Login = ({navigation}) => {
    const [formInput, setFormInput] = useState({
      email: "",
      password: "",
    });
    const [validation, setValidation] = useState(false);
    // const navigation = useNavigation();
  
    const handleInputChange = (field, value) => {
      setFormInput({ ...formInput, [field]: value });
    };
  
    const handleSubmit = () => {
      const valid = userData.find(
        (item) =>
          item.email === formInput.email && item.password === formInput.password
      );
  
      if (valid) {
        setFormInput({ email: "", password: "" });
        Alert.alert("login sucessfully");
        setValidation(false);
        navigation.navigate("Todo");
      } else {
        Alert.alert("Entered wrong Login Credential");
        setValidation(true);
      }
    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
        <View
          style={{
            height: 500,
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          <KeyboardAvoidingView behavior="padding">
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 27,
      fontWeight: "700",
      textAlign: "center",
      padding: 50,
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 17,
      fontWeight: "500",
      color: "#222",
      marginBottom: 10,
    },
    inputControl: {
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: "500",
      color: "#222",
    },
    form: {
      marginBottom: 24,
      flex: 1,
    },
    formAction: {
      marginVertical: 24,
    },
    btn: {
      backgroundColor: "#b76cfd",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#b76cfd",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    btnTxt: {
      fontSize: 18,
      fontWeight: "600",
      color: "#fff",
    },
  });
  