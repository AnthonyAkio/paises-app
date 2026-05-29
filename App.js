import React from "react";
import { StyleSheet, Text, View } from "react-native";

import BuscaPorNome from "./src/components/BuscaPorNome";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de Países</Text>

      <BuscaPorNome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 24,
  },
});