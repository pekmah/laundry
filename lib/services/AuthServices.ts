import axios from "./AxiosServices";

import { RegistrationPayload, SigninFormData, UserType } from "lib/types/auth";

/**
 * signs in user
 */
const signIn = async (
  payload: SigninFormData
): Promise<{ user: UserType; jwt: string }> => {
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
): Promise<{ user: UserType; jwt: string }> => {
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
