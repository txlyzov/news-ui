export const APP_NAME = process.env.REACT_APP_NAME;

export const PATH_VARIBLES = {
  MAIN: () => `${APP_NAME}/`,
  NEWS: (newsId) => `${APP_NAME}/news/${newsId}`,
};

const HOST_SETTINGS = {
  TRANSFER_PROTOCOL: process.env.REACT_APP_TRANSFER_PROTOCOL,
  HOST_URL: process.env.REACT_APP_HOST_URL,
  API_VER: process.env.REACT_APP_API_VER,
};

const HOST_ADRESS = `${HOST_SETTINGS.TRANSFER_PROTOCOL}://${HOST_SETTINGS.HOST_URL}/${HOST_SETTINGS.API_VER}`;

export const NEWS_API = {
  LATEST: () => `${HOST_ADRESS}/newstories.json`,
  ITEM: (itemId) => `${HOST_ADRESS}/item/${itemId}.json`,
};
