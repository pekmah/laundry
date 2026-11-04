// Supply the deployment's public HTTPS URL at build time.
export const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "https://api.fua.cruizp.com").replace(/\/$/, "");
