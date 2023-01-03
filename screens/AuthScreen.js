import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import axios from "axios";

export default function MainScreen({ navigation, route }) {
  //console.log("route");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const vAuth = (log, pass) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobileLogin: { login: log, password: pass } };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        //setNomen(response.data);
        console.log(response.data);
        if (response.data != null){
          let userItem = response.data;
            navigation.navigate("Main",{userItem: userItem});
        }
      })
      .catch(function (error) {
        //setNomen(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* картинка   */}
      <Image
        style={styles.vImage}
        source={require("../assets/terminalIcon.png")}
      />
      <Text>{"\n"}</Text>
      {/* здесь делаем вход */}
      <TextInput
        style={styles.text}
        value={login}
        onChangeText={setLogin}
        placeholder="Введите логин"
      />
      <TextInput
        style={styles.text}
        value={password}
        onChangeText={setPassword}
        placeholder="Введите пароль"
      />
      {/* <Button title="Вход" onPress={() => navigation.navigate("Find")} /> */}
      <Button style={styles.vButton} title="Вход" onPress={() => vAuth(login, password)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    padding: 3,
    margin: 3,
    borderWidth: 1,
    width: 250,
    borderRadius: 5,
    fontSize: 16,
    textAlign: "center",
  },
  vImage: {
    flex: 1,
    width: "90%",
    height: "50%",
    resizeMode: "contain",
  },
  vButton: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
  },
});
