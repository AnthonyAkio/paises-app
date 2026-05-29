import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BuscaPorNome from "./src/components/BuscaPorNome";
import BuscaPorCapital from "./src/components/BuscaPorCapital";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Consulta de Países</Text>

        <BuscaPorNome />
        <BuscaPorCapital />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  conteudo: {
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