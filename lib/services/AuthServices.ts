import axios from "./AxiosServices";

import {
  RegistrationPayload,
  SigninFormData,
  UserType,
  tokenType,
} from "lib/types/signin";

/**
 * signs in user
 */
const signIn = async (
  payload: SigninFormData
): Promise<UserType & tokenType> => {
  try {
    const response = await axios.post("/auth/local", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Registers user
 */
const register = async (
  payload: RegistrationPayload
): Promise<UserType & tokenType> => {
  try {
    const response = await axios.post("/auth/local/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthServices = {
  signIn,
  register,
};

export default AuthServices;
