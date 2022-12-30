import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import Barcode from "../components/barcode";
import NomenFind from "../components/NomenFind";
import SetNomenBarcode from "../components/SetNomenBarcode";

export default function MainScreen({ navigation, route }) {
  //console.log(route);
  //const { itemId, otherParam } = route.params;
  const [barcode, setBarcode] = useState("");
  const [nomenred, setNomenred] = useState([]);
  //const {nomenFind} = route.params;
  
  useEffect(() => {
    // console.log("открытие главной 2");
    // console.log(route.params);
    if (route.params != undefined) {
      //const {nomenFind} = route.params;
      // console.log(JSON.stringify(nomenFind));
      // setNomenred(nomenFind);
      // if (nomenFind != []) {
      //   const nom = JSON.stringify(nomenFind);
      //   console.log(nom);
      //   setNomenred(nomenFind);
      //   console.log(nomenred);

      // }
    }
  }, []);
  // nomenred,
  // setNomenred,
  // barcode,
  // setBarcode,

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
    <View style={styles.vcontainer}>
      {/* <StatusBar /> */}
      <Button title="Поиск" onPress={() => navigation.navigate("Find")} />
      <View style={styles.vcenter}>
        <Barcode
          setVcode={setBarcode}
          scanvisible={scanvisible}
          setScan={setScaned}
        />
        <Button title="Обновить" onPress={visScan} />
        <Text>
          Штрихкод: {"\n"} {barcode}
        </Text>
        <Text>
          <NomenFind
            Barcode={barcode}
            setNomenred={setNomenred}
            scaned={scaned}
          />
        </Text>
      </View>
      <View style={styles.vcontainer2}>
        <View style={styles.vleft}>
          <Text>Поиск по штрихкоду</Text>
          <SetNomenBarcode
            barcode={barcode}
            nomenred={nomenred}
            setNomenred={setNomenred}
          />
        </View>
        <View style={styles.vleft}>
          <Text>
            {"     "}
            {nomenred.name}
            {"\n"}
            !!!: {nomenred.comment}
            {"\n"}
            штрихкод: {nomenred.barcode}
            {"\n"}
            кодБЭСТ: {nomenred.code1c}
            {"\n"}
            ЦЕНА: {nomenred.price}
          </Text>
        </View>

        {/* <Button title="Поиск" onPress={() => navigation.navigate("Find")} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //backgroundColor: "#808080",
    //justifyContent: "center",
    //alignItems: "center",
  },
  vcontainer2: {
    flex: 1,
    backgroundColor: "#fff500",
    //justifyContent: "center",
    //alignItems: "center",
  },
  vcenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vleft: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    left: 10,
  },
});
