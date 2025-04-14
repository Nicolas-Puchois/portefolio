/**
 *
 * @param {string} route
 * @param {string} api
 * @param {object} option - Peut inclure une propriété pour les query params
 * @returns  {Promise}
 */
export async function fetchData({ route, api = apiUrl, options = {} }) {
  // Préparation de l'entête 'headers' avec les clés - valeurs nécessaire pour l'appel [ Authorization: 'Bearer qs4dz68a4qz']
  const headers = { Accept: "application/json", ...options.headers };
  //  appel methode native fetch [ appels API]
  let queryString = "";
  if (options.params) {
    queryString = "?" + new URLSearchParams(options.params).toString();
    delete options.params;
  }
  const result = await fetch(`${api}${route}${queryString}`, {
    ...options,
    headers,
  });
  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
