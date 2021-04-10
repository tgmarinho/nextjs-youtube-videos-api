import GhostContentAPI from "@tryghost/content-api";

let cachedAPI = null;

export default function ghostConnection() {
  if (cachedAPI) {
    return cachedAPI;
  }

  const api = new GhostContentAPI({
    url: `https://blog.rocketseat.com.br`,
    key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY,
    version: `v3`,
  });

  cachedAPI = api;

  return api;
}
