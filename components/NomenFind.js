import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import VitInput from "./vinput";

import axios from "axios";

export default function NomenFind({ Barcode, setNomenred, scaned}) {
  
  const [vbar, setBar] = useState(null);
  const [mess, setMess] = useState(null);
  
  const FindNomen = (vbarloc) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobileFindBarcode: vbarloc };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        console.log(response.data);
        const res = response.data;

        if (res['error'] == true) {
          //alert("не найдено товара");
          setMess("Не найдено товара");
        } else {
          setNomenred(res);
          setMess(res.name);
        }
      })
      .catch(function (error) {
      });
  };

  useEffect(() => {

    if (scaned) {
      //if (scaned && vbar != Barcode) {
        setBar(Barcode);
      FindNomen(Barcode);
    }
  }, [Barcode]);

  return <View><Text>{mess}</Text></View>;
}
