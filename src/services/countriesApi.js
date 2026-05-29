const BASE_URL = "https://restcountries.com/v3.1";

async function buscarNaApi(endpoint) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar os dados.");
  }

  return resposta.json();
}

export async function buscarPaisPorNome(nome) {
  const termo = encodeURIComponent(nome.trim());

  const dados = await buscarNaApi(
    `/name/${termo}?fields=name,translations,maps`
  );

  return dados[0];
}