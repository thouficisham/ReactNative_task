import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../assets/todolist.png")}
        style={{
          height: 400,
          width: 400,
        }}
      />
      <Text style={{ fontSize: 25, fontWeight: "700", color: "black" }}>
        Todo Task List
      </Text>
    </View>
  );
};

export default Fallback;