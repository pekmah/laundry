import axios from "./AxiosServices";

import {
  AuthResponse,
  RegistrationPayload,
  SigninFormData,
} from "lib/types/auth";

/**
 * signs in user
 */
const signIn = async (payload: SigninFormData): Promise<AuthResponse> => {
  try {
    const response = await axios.post("/auth/login", payload);
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
): Promise<AuthResponse> => {
  try {
    const response = await axios.post("/auth/signup", payload);
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
