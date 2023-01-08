import React, { useState, } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";

export default function VitInput({ FuncText, TitleButton }) {
  const [textInput, setTextInput] = useState("");

  const onChange = (text) => {
    setTextInput(text);
    //console.log(text);
  };
  const FuncText2 = (text) => {
    //console.log('--- '+text);
    if (text != "") {
      FuncText(text);
    }
    // setTextInput("");
    //console.log(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        value = {textInput}
        onChangeText={onChange}
        placeholder="Введите текст"
      />
      <Text> </Text>
      <Button
        title={TitleButton}
        onPress={() => {
          FuncText2(textInput);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex:1,
    margin: 2,
    flexDirection: "row",
    justifyContent: "center",
    // left: 10,
  },
  text: {
    padding: 3,
    borderWidth: 2,
    borderRadius: 5,
    width: 250,
    // height: 50,
    fontSize: 22,
  },
});
