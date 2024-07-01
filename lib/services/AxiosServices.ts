import axios from "axios";
import { BASE_URL } from "constants/Configs";

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const setAuthToken = async instance => {
//   const mmkvToken = JSON.parse(ZustandStorage.getItem('_state_auth'))?.state
//     ?.state?.user?.token;
//   const {token: AsyncToken} =
//     !mmkvToken && (await JSON.parse(await AsyncStorageService.getData('user')));
//   const token = mmkvToken || AsyncToken;

//   if (instance?.defaults) {
//     if (token) {
//       instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete instance.defaults.headers.common['Authorization'];
//     }
//   }
// };

export default AxiosUtility;
