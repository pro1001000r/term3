import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import GetName from "../components/GetName";
import VitInput from "../components/vinput";
import axios from "axios";
import SetUserParams from "../components/SetUserParams";

export default function UserScreen({ navigation, route }) {
  const [userparams, setUserparams] = useState([]);
  const [databox, setDatabox] = useState([]);

  useEffect(() => {
    console.log("сработал роут на пользователе");
    if (route.params != undefined) {
      // устанавливаем пользователь
      const usermain = route.params.userparams;
      console.log(route.userparams);
      if (usermain != undefined) {
        setUserparams(usermain);
        getDataBox(usermain.storage_id);
      }
    }
  }, [route]);

  useEffect(() => {
     
  }, [userparams]);

  const AddBox = (nameBox) => {
    if (nameBox == "") {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
    const data = {
      mobileAddBox: { name: nameBox, storageid: userparams.storage_id },
    };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        console.log(response.data);
        
        let up = userparams;
        up['box_id'] = response.data;
        SetUserParams(up);
        setUserparams(up);

      })
      .catch(function (error) {
        console.log(error);
      });
    return <Text>arg</Text>;
  };

  const TouchBox = (box_id) =>{
    let up = userparams;
    up['box_id'] = box_id;
    SetUserParams(up);

    var userItem = {id:0};
    userItem.id = Number(userparams.users_id);
    
    navigation.navigate("Main",{userItem: userItem});
  };


  const getDataBox = (storageid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.jwt}`,
      },
    };

    const apiUrl = "http://terminal17.ru/Ajax/Obmen/}";
    const data = { mobileGetBox: storageid };

    axios
      .post(apiUrl, data, config)
      .then(function (response) {
        setDatabox(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        setDatabox(error);
      });
  };

  const vRenderMap = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.vBorder} onPress={() => {TouchBox (item.id)}}>
        <Text>
          <Text style={styles.vTextB}>{item.name}</Text>
          {"\n"}
          <Text style={styles.vTextB}>{item.id}</Text>

          <Text>
            <GetName table="storage" id={item.storage_id} />
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.vcontainer}>
      <View style={styles.vcontainer}>
        <Text>
          Пользователь:{" "}
          <Text style={styles.vTextB}>
            <GetName table="users" id={userparams.users_id} />
          </Text>
          {"\n"}
          Склад:{" "}
          <Text style={styles.vTextB}>
            <GetName table="storage" id={userparams.storage_id} />
          </Text>
          {"\n"}
          Место:{" "}
          <Text style={styles.vTextB}>
            <GetName table="box" id={userparams.box_id} />
          </Text>
        </Text>
        {databox.length ? (
          <FlatList
            data={databox}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => vRenderMap({ item })}
          />
        ) : (
          <Text style={{ fontSize: 25 }}>Ничего не найдено</Text>
        )}
      </View>
      <VitInput
        style={styles.vcontainer}
        FuncText={AddBox}
        TitleButton="+ место"
      />
      <View>
        <Button
          title="на главную"
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vcontainer: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  vTextB: {
    fontWeight: "700",
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
