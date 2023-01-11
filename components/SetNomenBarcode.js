import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";
import axios from "axios";

export default function SetNomenBarcode({ nomenred, setNomenred, barcode }) {
  const [mess, setMess] = useState('');

  const AddBarcode = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobileAddBarcode: { barcode: barcode, item: nomenred,} };
    console.log(data);
    console.log(nomenred);
    console.log(nomenred.count);
    if (barcode != null && nomenred != null) {
      axios
        .post(apiUrl, data, config)
        .then(function (response) {
          //setNomenred(response.data);
          console.log(response.data);
          Alert.alert(response.data);
        })
        .catch(function (error) {
          console.log('error');
          console.log(error);
        });
    }
  };

  return (
    <View>
      <Button
        title={"+ штрих"}
        onPress={() => {
          AddBarcode();
        }}
      />
      {/* <Text>{mess}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
});
