import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserScreen() {
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
    <View style={styles.container}>
      <Text>Новый модуль</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
