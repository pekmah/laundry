import axios, { setAuthToken } from "./AxiosServices";

import { PricingFormData, PricingType } from "types/pricing";

/**
 * creates new pricing
 */
const create = async (payload: PricingFormData): Promise<PricingType> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/laundry/categories", payload);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description fetches all pricings
 */
const fetchAll = async (): Promise<PricingType[]> => {
  try {
    setAuthToken(axios);
    const response = await axios.get("/laundry/categories");

    // remove unnecessary keys

    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 * @description udpates pricing
 */
const update = async ({
  id,
  payload,
}: {
  id: number;
  payload: PricingFormData;
}): Promise<PricingType> => {
  try {
    setAuthToken(axios);

    const response = await axios.patch(`/laundry/categories/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const PricingServices = {
  create,
  fetchAll,
  update,
};

export default PricingServices;
