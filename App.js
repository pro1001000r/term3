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
import AuthScreen from "./screens/AuthScreen";
import StockScreen from "./screens/StockScreen";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "./screens/UserScreen";

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Вход" }}
        />
         <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "Главная" ,headerBackVisible: false,}}
        />
        <Stack.Screen
          name="Find"
          component={FindScreen}
          options={{ title: "Поиск" }}
        />
        <Stack.Screen
          name="Stocktaking"
          component={StockScreen}
          options={{ title: "Инвентаризация" }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: "Личный кабинет" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // const [barcode, setBarcode] = useState('');
  // const [nomenred, setNomenred] = useState([]);

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Main"
  //         component={MainScreen}
  //         options={{ title: "Главная" }}
  //       />
  //       <Stack.Screen
  //         name="Find"
  //         component={FindScreen}
  //         options={{ title: "Поиск" }}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
