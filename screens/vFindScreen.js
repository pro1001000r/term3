import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
import VitInput from "../components/vinput";

import axios from "axios";

export default function FindScreen({ navigation }) {
  const [nomen, setNomen] = useState([]);

  const [barcode, setBarcode] = useState("");
  const [nomenred, setNomenred] = useState([]);

  const getSite2 = (vt) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobile: vt };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        setNomen(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        setNomen(error);
      });
  };

  const vRenderMap = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.vText}
        onPress={() => {
          // console.log("------------");
          //console.log(item);
          //setNomenred(item);
          //setModalVisible(true);
          navigation.navigate("Main", { nomenFind: item }); //Переносим на главную
        }}
      >
        <Text>
          <Text style={styles.vTextB}>{item.name}</Text>
          {"\n"}
          {item.comment}
          {"\n"}
          кодБЭСТ: {item.code1c}
          {"\n"}
          штрихкод: {item.barcode}
          {"\n"}
          ЦЕНА: <Text style={styles.vTextB}>{item.price}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.vcontainer}>
      <View style={styles.vcontainer2}>
        <View style={styles.vleft}>
          {nomen.length ? (
            <FlatList
              data={nomen}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => vRenderMap({ item })}
            />
          ) : (
            <Text style={{ fontSize: 25 }}>Ничего не найдено</Text>
          )}
        </View>
      </View>
      <View style={styles.vfind}>
        <Button
          title="на главную"
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
        <VitInput
          FuncText={getSite2}
          TitleButton="Поиск"
          style={styles.vleft}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //backgroundColor: "#808080",
    justifyContent: "center",
    //alignItems: "center",
  },
  vcontainer2: {
    flex: 1,
    //backgroundColor: "#fff",
    //justifyContent: "center",
    //alignItems: "center",
  },
  vfind: {
    //flex: 1,
    // width: 100,
  },
  vleft: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //left: 10,
  },
  vText: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    //alignItems: "center",
    //justifyContent: "center",
    //left: 10,
  },
  vTextB: {
    fontWeight: "700",
  },
});
