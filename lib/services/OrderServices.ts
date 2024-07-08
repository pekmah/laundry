import axios, { setAuthToken } from "./AxiosServices";

import {
  LaundryFormData,
  LaundryOrderFormData,
  LaundryOrderType,
} from "types/laundry";
import { flattenAttributes } from "utils/strapi";

/**
 * @description creates new order
 */
const create = async (
  payload: {
    amount: number;
    laundry: LaundryFormData[];
  } & LaundryOrderFormData
): Promise<LaundryOrderType> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/orders", { data: payload });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
    console.log(error?.response?.data);
    throw error;
  }
};

/**
 * @description fetches all created orders
 */
const fetchAll = async (): Promise<LaundryOrderType[]> => {
  try {
    setAuthToken(axios);
    const response = await axios.get("/orders", {
      params: { sort: ["createdAt:desc"] },
    });

    // remove unnecessary keys
    const { data } = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

const OrderServices = {
  create,
  fetchAll,
};

export default OrderServices;
