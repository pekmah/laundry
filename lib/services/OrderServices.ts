import axios, { setAuthToken } from "./AxiosServices";

import {
  LaundryFormData,
  LaundryOrderFormData,
  LaundryOrderType,
} from "types/laundry";
import { OrderPaymentFormData } from "types/payment";
import { flattenAttributes } from "utils/strapi";

/**
 * @description creates new order
 */
const create = async (
  payload: {
    amount: number;
    laundry: LaundryFormData[];
    code: string;
  } & LaundryOrderFormData
): Promise<LaundryOrderType> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/orders", {
      data: payload,
      params: {
        populate: {
          payments: true,
        },
      },
    });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description pays for an order
 */
const pay = async (
  payload: { order: number; balance: number } & OrderPaymentFormData
): Promise<any> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/payments", { data: payload });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
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
      params: {
        sort: ["createdAt:desc"],
        populate: {
          payments: true,
        },
      },
    });

    // remove unnecessary keys
    const { data } = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description fetches single created order
 */
const fetchSingle = async (
  id: number | null = 0
): Promise<LaundryOrderType> => {
  try {
    setAuthToken(axios);
    const response = await axios.get(`/orders/${id}`, {
      params: {
        populate: {
          payments: true,
        },
      },
    });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

const OrderServices = {
  pay,
  create,
  fetchAll,
  fetchSingle,
};

export default OrderServices;
