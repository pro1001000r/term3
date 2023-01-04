import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

export default function GetName({ table, id }) {
  const [name, setName] = useState("");
  const getname = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
    const data = { mobileGetName: { table: table, id: id } };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        setName(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return <Text></Text>;
  };
  useEffect(() => {
    getname();
  }, []);

  return <Text>{name}</Text>;
}
