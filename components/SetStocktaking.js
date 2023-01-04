import axios from "axios";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SetStocktaking(userparams, nomen, count) {
  //Получаем все параметры:
  if (userparams == undefined || nomen == undefined || count == undefined) {
    return;
  }

  console.log(userparams); //вывод
  console.log(nomen); //вывод

  const data = {
    stocktaking: {
      userid: userparams.users_id,
      storageid: userparams.storage_id,
      boxid: userparams.box_id,
      nomenid: nomen.id,
      count: count,
    },
  };

  console.log(data); //вывод

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
  //const data = { stocktaking: { login: log, password: pass } };

  axios
    .post(apiUrl, data, config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}
