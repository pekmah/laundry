import { flattenAttributes } from "utils/strapi";
import axios, { setAuthToken } from "./AxiosServices";

import { PricingFormData, PricingType } from "types/pricing";

/**
 * creates new pricing
 */
const create = async (payload: PricingFormData): Promise<PricingType> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/pricings", { data: payload });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * fetches all pricings
 */
const fetchAll = async (): Promise<PricingType[]> => {
  try {
    setAuthToken(axios);
    const response = await axios.get("/pricings");

    // remove unnecessary keys
    const { data } = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

const PricingServices = {
  create,
  fetchAll,
};

export default PricingServices;
