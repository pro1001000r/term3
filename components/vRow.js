import React from "react";
import { View, StyleSheet,} from "react-native";

export default function vRow({vcomp}) {
  
  return (
    <View style={styles.vRow}>
      {vcomp}
    </View>
  );
}
const styles = StyleSheet.create({
  vRow: {
    flex:1, 
    justifyContent: "center",
    alignItems: "center",   
    flexDirection: "row",
  },

});
