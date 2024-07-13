import { flattenAttributes } from "utils/strapi";
import axios, { setAuthToken } from "./AxiosServices";
import { LogPayloadData } from "lib/types/logs";
import { LogType } from "types/logs";

/**
 * creates new log
 */
const create = async (payload: LogPayloadData): Promise<LogType[]> => {
  try {
    setAuthToken(axios);
    const response = await axios.post("/logs", { data: payload });

    // remove unnecessary keys
    const data = flattenAttributes(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description fetches specific order logs
 */
const fetchByOrder = async (orderId: number): Promise<LogType[]> => {
  if (!orderId) return [];
  try {
    setAuthToken(axios);
    const response = await axios.get("/logs", {
      params: {
        sort: ["createdAt:asc"],
        filters: {
          order: {
            $eq: orderId,
          },
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

const LogServices = {
  create,
  fetchByOrder,
};

export default LogServices;
