import axios from "axios";
import { BASE_URL } from "constants/Configs";
import { ZustandStorage } from "lib/storage/mmkv";

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (instance) => {
  const token =
    JSON.parse(ZustandStorage.getItem("_state_auth") ?? "{}")?.state?.token ??
    null;

  if (instance?.defaults) {
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  }
};

export default AxiosUtility;
