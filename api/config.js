export const versionCode = "1"
export const username = "user";
export const password = "pebwop-difxYp-sejwo6";

export const baseUrl = import.meta.env.VITE_BASE_URL;
export const shortBaseUrl = import.meta.env.VITE_SHORT_BASE_URL;
//export const shortBaseUrl = "/api/d4e6d8eqkidno1rq7bf4"

if (import.meta.env.DEV) {
  console.log("Running in development mode");
}

if (import.meta.env.PROD) {
  console.log("Running in production mode");
}