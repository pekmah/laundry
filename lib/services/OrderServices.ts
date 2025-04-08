import { ILaundryOrderReportResponse } from "lib/types/laundry";
import axios, { setAuthToken } from "./AxiosServices";

import { ILaundryOrder, LaundryOrderType } from "types/laundry";
import { NewOrder } from "types/order";
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

export interface IOrderCreateResponse {
  message: string;
  data: NewOrder;
}
/**
 * @description creates new order
 */
const create = async (
  payload: CreateOrderPayload
): Promise<IOrderCreateResponse> => {
  setAuthToken(axios);
  const response = await axios.post("/orders", payload);

  return response.data;
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
}: IOrderPaymentPayload): Promise<unknown> => {
  setAuthToken(axios);
  const response = await axios.post(`/orders/${orderNumber}/payment`, {
    ...payload,
  });

  return response.data;
};

/**
 * @description fetches all created orders
 */
const fetchAll = async (): Promise<ILaundryOrder[]> => {
  setAuthToken(axios);
  const response = await axios.get("/orders");

  return response.data;
};

/**
 * @description fetches single created order
 */
const fetchSingle = async (id: string): Promise<LaundryOrderType> => {
  setAuthToken(axios);

  const response = await axios.get(`/orders/${id}`);

  return response.data;
};

// Get orders report
export interface OrderReportFilters {
  from: Date;
  to: Date;
}
/**
 * @description fetches orders report
 * @param filters - filters to apply
 * @param page - page number
 * @returns - orders report
 */
const fetchOrdersReport = async (
  filters: OrderReportFilters,
  page: number
): Promise<ILaundryOrderReportResponse> => {
  const _page = page || 1;
  setAuthToken(axios);
  const url = new URL("/orders/report", axios.defaults.baseURL);

  url.searchParams.append("from", filters.from.toISOString());
  url.searchParams.append("to", filters.to.toISOString());
  url.searchParams.append("page", _page.toString());

  const response = await axios.get(url.toString());

  return response.data;
};

/**
 * @description updates the status of an order
 * @param orderId - Order number
 * @param status - completed | collected
 * @returns - IOrderCreateResponse
 */
const updateStatus = async (
  orderId: string,
  status: string
): Promise<IOrderCreateResponse> => {
  setAuthToken(axios);
  const response = await axios.put(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

const OrderServices = {
  pay,
  create,
  fetchAll,
  fetchSingle,
  fetchOrdersReport,
  updateStatus,
};

export default OrderServices;
