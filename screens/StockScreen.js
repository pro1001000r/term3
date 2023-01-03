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
import axios from "axios";

const StockScreen = () => {

    const [stock,setStock]  = useState([]);

  const getStocktaking = (vt) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { getstocktaking: 1 };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        setStock(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        setStock(error);
      });
  };

  const vRenderMap = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.vBorder}
        onPress={() => {
          // console.log("------------");
          //console.log(item);
          //setNomenred(item);
          //setModalVisible(true);
          //navigation.navigate("Main", { nomenFind: item }); //Переносим на главную
        }}
      >
        <Text>
          {item.name}
          {"\n"}
          {item.comment}
          {"\n"}
          кодБЭСТ: {item.code1c}
          {"\n"}
          штрихкод: {item.barcode}
          {"\n"}
          ЦЕНА: {item.price}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={stock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => vRenderMap({ item })}
      />
    </View>
  );
};

export default StockScreen;

const styles = StyleSheet.create({
  vRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  vBorder: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    //alignItems: "center",
    //justifyContent: "center",
    //left: 10,
  },
});
