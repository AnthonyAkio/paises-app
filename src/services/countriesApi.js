import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export async function buscarPaisPorNome(nome) {
  const termo = encodeURIComponent(nome.trim());

  const resposta = await api.get(
    `/name/${termo}?fields=name,translations,maps`
  );

  return resposta.data[0];
}

export async function buscarPaisPorCapital(capital) {
  const termo = encodeURIComponent(capital.trim());

  const resposta = await api.get(
    `/capital/${termo}?fields=name,flags`
  );

  return resposta.data[0];
}