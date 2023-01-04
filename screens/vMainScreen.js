import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import Barcode from "../components/barcode";
import NomenFind from "../components/NomenFind";
import SetNomenBarcode from "../components/SetNomenBarcode";
import GetUser from "../components/GetUser";
import GetName from "../components/GetName";
import SetStocktaking from "../components/SetStocktaking";
import GetCount from "../components/GetCount";

export default function MainScreen({ navigation, route }) {
  const [barcode, setBarcode] = useState("");
  const [nomenred, setNomenred] = useState([]);
  const [user, setUser] = useState([]);
  const [userparams, setUserparams] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("сработал роут");
    if (route.params != undefined) {
      const { nomenFind } = route.params;
      const { userItem } = route.params;
      //console.log(JSON.stringify(nomenFind));
      //console.log(JSON.stringify(userItem));

      // устанавливаем номенклатуру
      if (nomenFind != undefined) {
        setNomenred(nomenFind);

        SetStocktaking(userparams, nomenFind, 1);
        console.log(userparams); //вывод
        console.log(nomenFind); //вывод
        GetCount(userparams.box_id,nomenFind.id,setCountN);
      }

      // устанавливаем пользователь
      if (userItem != undefined) {
        const user1 = JSON.stringify(userItem);
        //console.log(user1);
        setUser(userItem);
        console.log(userItem.id); //вывод
        GetUser(userItem.id, setUserparams);
      }
    }
  }, [route]);

  // nomenred,
  // setNomenred,
  // barcode,
  // setBarcode,

  const setCountN = (arg) => {
    setCount(Number(arg));
  };

  const CountPlus = () => {
    let col = count;
    setCount(count+1);
    console.log(count); //вывод
    SetStocktaking(userparams, nomenred, count);
  };

  const CountMinus = () => {
    let col = count;
    setCount(count-1);
    console.log(count); //вывод
    SetStocktaking(userparams, nomenred, count);
  };

  const CountRed = () => {
    console.log(count); //вывод
    SetStocktaking(userparams, nomenred, count);
  };

  const [scaned, setScaned] = useState(false);
  const [scanvisible, setScanvisible] = useState(true);

  const visScan = () => {
    const vscv = !scanvisible;
    setScanvisible(vscv);
    setBarcode("");
  };

  useEffect(() => {
    setScaned(false);
  }, []);

  return (
    <SafeAreaView style={styles.vcontainer}>
      <StatusBar />
      {/* <Button title="Поиск" onPress={() => navigation.navigate("Find")} /> */}
      <View style={styles.vcenter}>
        <Text>
          Пользователь: {user.name}
          Склад: <GetName table="storage" id={userparams.storage_id} />
          Место: <GetName table="box" id={userparams.box_id} />
        </Text>

        <Barcode
          setVcode={setBarcode}
          scanvisible={scanvisible}
          setScan={setScaned}
        />
        <Button title="Обновить" onPress={visScan} />
        <Text>Сканированный Штрихкод: {barcode}</Text>
        <Text>
          <NomenFind
            Barcode={barcode}
            setNomenred={setNomenred}
            scaned={scaned}
          />
        </Text>
      </View>
      <View style={styles.vRow}>
        <View style={styles.vLeft}>
          <Text>Выбранный товар:</Text>

          <Text style={styles.vBorder}>
            {"     "}
            {nomenred.name}
            {"\n"}
            {nomenred.comment}
            {"\n"}
            штрихкод: {nomenred.barcode}
            {"\n"}
            кодБЭСТ: {nomenred.code1c}
            {"\n"}
            ЦЕНА: {nomenred.price}
          </Text>
          <View style={styles.vRowB}>
            <Button title=" - " onPress={() => CountMinus()} />
            <TextInput
              style={styles.vBorder}
              value={count}
              onChangeText={(text)=>setCountN(text)}
              onSubmitEditing={CountRed}
              placeholder={String(count)}
              keyboardType="numeric"
            />
            <Button title=" + " onPress={() => CountPlus()} />
          </View>
        </View>
        <View style={styles.vRight}>
          <SetNomenBarcode
            barcode={barcode}
            nomenred={nomenred}
            setNomenred={setNomenred}
          />
          <Button title="Поиск" onPress={() => navigation.navigate("Find")} />
          <Button
            title="Инвентаризация"
            onPress={() => navigation.navigate("Stocktaking")}
          />
          <Button
            title="Настройки"
            onPress={() => navigation.navigate("User")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //backgroundColor: "#808080",
    //justifyContent: "center",
    alignItems: "center",
  },
  vcontainer2: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: "center",
    //alignItems: "center",
  },

  vRow: {
    flex: 1,
    //justifyContent: "space-around",
    // alignItems: "center",
    flexDirection: "row",
  },

  vRowB: {
    //flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "row",
  },

  vLeft: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    flexDirection: "column",
  },
  vRight: {
    flex: 0.2,
    //justifyContent: "space-around",
    //alignItems: "center",
    flexDirection: "column",
  },

  vcenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  vBorder: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 2,
    //alignItems: "center",
    //justifyContent: "center",
    //left: 10,
  },
});
