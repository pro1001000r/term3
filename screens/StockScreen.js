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
import GetName from "../components/GetName";

const StockScreen = ({ navigation }) => {
  const [stock, setStock] = useState([]);

  const getStocktaking = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
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
          {item.date}
          {"\n"}
          {/* {item.nomen_id} */}
          <Text style={styles.vTextB}>
            <GetName table="nomen" id={item.nomen_id} />
          </Text>
          {"\n"}
          Пользователь:
          <GetName table="users" id={item.users_id} />
          {"\n"}
          Склад:
          <GetName table="storage" id={item.storage_id} />
          {"\n"}
          Место:
          <GetName table="box" id={item.box_id} />
          {"\n"}
          Комментарий: {item.comment}
          {"\n"}
          Количество: <Text style={styles.vTextB}>{item.count}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    getStocktaking();
  }, []);
  return (
    <SafeAreaView style={styles.vcontainer}>
      <View style={styles.vcontainer}>
        <FlatList
          data={stock}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => vRenderMap({ item })}
        />
      </View>
      <View>
        <Button
          title="на главную"
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default StockScreen;

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //backgroundColor: "#808080",
    justifyContent: "center",
    //alignItems: "center",
  },
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
  vTextB: {
    fontWeight: "700",
  },
});
