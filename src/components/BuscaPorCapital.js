import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { buscarPaisPorCapital } from "../services/countriesApi";

export default function BuscaPorCapital() {
  const [capital, setCapital] = useState("");
  const [pais, setPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  async function pesquisar() {
    if (!capital.trim()) {
      setMensagemErro("Digite o nome de uma capital.");
      return;
    }

    try {
      setCarregando(true);
      setPais(null);
      setMensagemErro("");

      const resultado = await buscarPaisPorCapital(capital);
      setPais(resultado);
    } catch (erro) {
      setMensagemErro("Não foi encontrado um país com essa capital.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Busca por capital</Text>

      <TextInput
        style={styles.input}
        placeholder="Exemplo: Brasilia"
        value={capital}
        onChangeText={setCapital}
        onSubmitEditing={pesquisar}
      />

      <Button title="Buscar por capital" onPress={pesquisar} />

      {carregando && <ActivityIndicator style={styles.loading} />}

      {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

      {pais && (
        <View style={styles.resultado}>
          <Text style={styles.label}>Nome oficial do país:</Text>
          <Text style={styles.texto}>{pais.name?.official}</Text>

          <Text style={styles.label}>Bandeira do país:</Text>

          {pais.flags?.png && (
            <Image
              source={{ uri: pais.flags.png }}
              style={styles.bandeira}
              resizeMode="contain"
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    maxWidth: 700,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  loading: {
    marginTop: 15,
  },
  erro: {
    marginTop: 12,
    color: "red",
  },
  resultado: {
    marginTop: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15,
  },
  texto: {
    fontSize: 16,
    marginTop: 4,
  },
  bandeira: {
    width: "100%",
    height: 160,
    marginTop: 10,
  },
});