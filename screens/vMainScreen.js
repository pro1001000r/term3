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
import GetNomen from "../components/GetNomen";

export default function MainScreen({ navigation, route }) {
  const [barcode, setBarcode] = useState("");
  const [nomenred, setNomenred] = useState([]);
  const [user, setUser] = useState([]);
  const [userparams, setUserparams] = useState([]);
  const [count, setCount] = useState(0);
  const [countText, setCountText] = useState("");
  
  const [isscan, setIsscan] = useState(false);
  const [scaned, setScaned] = useState(false);
  const [scanvisible, setScanvisible] = useState(true);
  

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
        setCount(count+1);
        GetCount(userparams.box_id,nomenFind.id,count);
      }

      // устанавливаем пользователь
      if (userItem != undefined) {
        const user1 = JSON.stringify(userItem);
        //console.log(user1);
        setUser(userItem);
        console.log(userItem.id); //вывод
        GetUser(userItem.id, setUserparams);
        console.log(userparams); //вывод
      }
    }
  }, [route]);

  // nomenred,
  // setNomenred,
  // barcode,
  // setBarcode,

  const CountPlus = () => {
    let col = count;
    setCount(count+1);
    console.log(col); //вывод
    SetStocktaking(userparams, nomenred, count+1);
  };

  const CountMinus = () => {
    let col = count;
    setCount(count-1);
    console.log(count); //вывод
    SetStocktaking(userparams, nomenred, count-1);
  };

  const CountRed = () => {
    console.log('Проверка'); //вывод
    setCount(Number(countText));
    SetStocktaking(userparams, nomenred, Number(countText));
    setCountText(0);
  
  };

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
          isscan = {isscan}
          setIsscan = {setIsscan}

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
          <GetNomen id={nomenred.id} />

          <View style={styles.vRowB}>
            <Button title=" - " onPress={() => CountMinus()} />
            <Text>{count}</Text>
            <TextInput
              style={styles.vBorder}
              value = {countText}
              onChangeText={(text)=>setCountText(text)}
              onSubmitEditing={CountRed}
              placeholder={'0'}
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
          <Button title="Скан" onPress={() => setIsscan(true)} />

          <Button title="Поиск" onPress={() => navigation.navigate("Find")} />
          <Button
            title="Инв"
            onPress={() => navigation.navigate("Stocktaking")}
          />
          <Button
            title="Наст"
            onPress={() => navigation.navigate("User", { userparams: userparams })}
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
