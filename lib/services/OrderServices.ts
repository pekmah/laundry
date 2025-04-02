import axios, { setAuthToken } from "./AxiosServices";

import { ILaundryOrder, LaundryOrderType } from "types/laundry";
import { OrderPaymentFormData } from "types/payment";
import { flattenAttributes } from "utils/strapi";

interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentAmount: number;
  laundryItems: {
    laundryCategoryId: number;
    quantity: number;
  }[];
}
/**
 * @description creates new order
 */
const create = async (
  payload: CreateOrderPayload
): Promise<LaundryOrderType> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/orders", payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface IOrderPaymentPayload {
  paymentMethod: string;
  otherDetails?: string | null;
  amount: number;
  orderNumber: string;
}
/**
 * @description pays for an order
 */
const pay = async ({
  orderNumber,
  ...payload
}: IOrderPaymentPayload): Promise<any> => {
  try {
    setAuthToken(axios);
    const response = await axios.post(`/orders/${orderNumber}/payment`, {
      ...payload,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description fetches all created orders
 */
const fetchAll = async (): Promise<ILaundryOrder[]> => {
  try {
    setAuthToken(axios);
    const response = await axios.get("/orders");

    return response.data;
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
