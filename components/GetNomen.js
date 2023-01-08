import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GetNomen({ id }) {
  const [nomen, setNomen] = useState([]);

  const getNomen = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobileGetNomen: id };
    console.log(data);

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        setNomen(response.data);

        console.log("Получено по айди");
        console.log(response.data);
      })
      .catch(function (error) {
        setNomen(error);
      });
  };

  useEffect(() => {
    getNomen(id);
  }, [id]);

  console.log(nomen);
  if (nomen == null) {
    return (
      <View style={styles.vborder}>
        <Text> Товар не выбран </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.vborder}>
        <View>
          <Text>
            <Text style={styles.vB}>{nomen.name}</Text>
            {"\n"}
            {nomen.comment}
            {"\n"}
            кодБЭСТ: {nomen.code1c}
            {"\n"}
            штрихкод: {nomen.barcode}
            {"\n"}
            ЦЕНА: <Text style={styles.vB}>{nomen.price}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  vborder: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    //alignItems: "center",
    //justifyContent: "center",
    //left: 10,
  },
  vB: {
    fontWeight: "700",
  },
});
