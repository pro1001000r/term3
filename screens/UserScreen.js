import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function UserScreen({ navigation }) {
  const Func = (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
    const data = { mobileLogin: { login: log, password: pass } };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return <Text>arg</Text>;
  };

  return (
    <View style={styles.vcontainer}>
      <View style={styles.vcontainer}>
        <Text>Новый модуль</Text>
      </View>
      <View>
        <Button
          title="на главную"
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
});
