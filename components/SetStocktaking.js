import axios from "axios";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SetStocktaking(user, nomen, count) {
  //Получаем все параметры:
  if (user == undefined || nomen == undefined || count == undefined) {
    return;
  }

  const data = {
    stocktaking: {
      userid: user.userid,
      storageid: user.storageid,
      boxid: user.boxid,
      nomenid: nomen.id,
      count: count,
    },
  };

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
