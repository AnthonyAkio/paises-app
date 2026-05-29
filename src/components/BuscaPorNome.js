import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { buscarPaisPorNome } from "../services/countriesApi";

export default function BuscaPorNome() {
  const [nomePais, setNomePais] = useState("");
  const [pais, setPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  function pesquisar() {
    if (!nomePais.trim()) {
      setMensagemErro("Digite o nome de um país.");
      return;
    }

    setCarregando(true);
    setPais(null);
    setMensagemErro("");

    buscarPaisPorNome(nomePais)
      .then((resultado) => {
        setPais(resultado);
        setCarregando(false);
      })
      .catch(() => {
        setMensagemErro("País não encontrado.");
        setCarregando(false);
      });
  }

  function abrirOpenStreetMap() {
    const link = pais?.maps?.openStreetMaps;

    if (link) {
      Linking.openURL(link);
    }
  }

  const nomeRusso =
    pais?.translations?.rus?.common ||
    pais?.translations?.rus?.official ||
    "Não disponível";

  const linkOpenStreetMap = pais?.maps?.openStreetMaps;

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Busca por nome do país</Text>

      <TextInput
        style={styles.input}
        placeholder="Exemplo: Brazil"
        value={nomePais}
        onChangeText={setNomePais}
        onSubmitEditing={pesquisar}
      />

      <Button title="Buscar por nome" onPress={pesquisar} />

      {carregando && <ActivityIndicator style={styles.loading} />}

      {mensagemErro ? <Text style={styles.erro}>{mensagemErro}</Text> : null}

      {pais && (
        <View style={styles.resultado}>
          <Text style={styles.label}>Nome comum do país:</Text>
          <Text style={styles.texto}>{pais.name?.common}</Text>

          <Text style={styles.label}>Nome oficial do país:</Text>
          <Text style={styles.texto}>{pais.name?.official}</Text>

          <Text style={styles.label}>Nome do país traduzido para russo:</Text>
          <Text style={styles.texto}>{nomeRusso}</Text>

          <Text style={styles.label}>Link do país no OpenStreetMap:</Text>

          {linkOpenStreetMap ? (
            <Pressable onPress={abrirOpenStreetMap}>
              <Text style={styles.link}>{linkOpenStreetMap}</Text>
            </Pressable>
          ) : (
            <Text style={styles.texto}>Não disponível</Text>
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
  link: {
    color: "#0066cc",
    marginTop: 6,
    textDecorationLine: "underline",
    fontSize: 15,
  },
});