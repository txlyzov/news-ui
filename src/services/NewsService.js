import axios from "axios";
import { NEWS_API } from "../utils/Constants";

export const getLatestItems = async () => {
  try {
    const response = await axios.get(`${NEWS_API.LATEST()}`);

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getItemById = async (itemId) => {
  try {
    const response = await axios.get(NEWS_API.ITEM(itemId));

    return response.data;
  } catch (error) {
    return undefined;
  }
};

export const getItemsByIdArray = async (idsArray) => {
  try {
    const items = [];
    const promises = idsArray.map((itemId) =>
      new Promise((resolve, reject) => {
        try {
          resolve(getItemById(itemId));
        } catch (error) {
          reject(error);
        }
      }).then((response) => {
        items.push(response);
      })
    );

    await Promise.all(promises);

    return items;
  } catch (error) {
    return [];
  }
};
