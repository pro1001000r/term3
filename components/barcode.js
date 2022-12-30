import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Button, Vibration } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";


const Barcode = ({ setVcode, scanvisible, setScan }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    setScan(false);
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Тип штрих кода: ${type} Данные: ${data}`);
    Vibration.vibrate(400);
    setVcode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (scanvisible) {
    return (
      <View style={styles.vstyle}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Скан"}
            onPress={() => {
              setScanned(false);
              setScan(true);
            }}
          />
        )}
      </View>
    );
  } else {
    //setScanned(true);
    return <Text>Нажмите еще раз</Text>;
  }
};

const styles = StyleSheet.create({
  vstyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //top: '-50%',
    //left: 100,
    //height: 200,
    width: 200,
    //position: 'absolute',
  },
});

export default Barcode;
