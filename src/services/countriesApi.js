import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export function buscarPaisPorNome(nome) {
  const termo = encodeURIComponent(nome.trim());

  return api
    .get(`/name/${termo}?fields=name,translations,maps`)
    .then((resposta) => {
      return resposta.data[0];
    });
}

export function buscarPaisPorCapital(capital) {
  const termo = encodeURIComponent(capital.trim());

  return api
    .get(`/capital/${termo}?fields=name,flags`)
    .then((resposta) => {
      return resposta.data[0];
    });
}