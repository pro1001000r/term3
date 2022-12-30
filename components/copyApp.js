import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Modal,
  Button,
} from "react-native";
import MainScreen from "./screens/vMainScreen";
import FindScreen from "./screens/vFindScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {

  return (
    <SafeAreaView>
      <StatusBar />
      
      <Modal visible={modalVisible} animation>
        <View style={styles.container}>
          <Button
            title="Поиск"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <MainScreen
            nomenred={nomenred}
            setNomenred={setNomenred}
            barcode={barcode}
            setBarcode={setBarcode}
          />
        </View>
      </Modal>
      <Modal visible={!modalVisible}>
        <View style={styles.container}>
          <Button
            title="Главная"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <FindScreen
            nomenred={nomenred}
            setNomenred={setNomenred}
            setModalVisible={setModalVisible}
            //setBarcode={setBarcode}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
