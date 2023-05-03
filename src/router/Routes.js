/* eslint-disable react/react-in-jsx-scope */
import MainPage from "../ui/pages/main-page/MainPage";
import NewsPage from "../ui/pages/news-page/NewsPage";
import { PATH_VARIBLES } from "../utils/Constants";

const ROUTES = [
  { path: PATH_VARIBLES.MAIN(), element: <MainPage />, exact: true },
  { path: PATH_VARIBLES.NEWS(":newsId"), element: <NewsPage />, exact: true }
];

export default ROUTES;
