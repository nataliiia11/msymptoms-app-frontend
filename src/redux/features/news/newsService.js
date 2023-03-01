
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

const getNews = async () => {
  const response = await axios.get(API_URL + "news");
  return response.data;
};

export default getNews;
