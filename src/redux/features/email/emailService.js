/*
  =========================================================
  * ZINOTRUST ACADEMY 
  =========================================================
  * Email: zinotrust@gmail.com
  * Copyright 2021 AKPAREVA EWOMAZINO
  * 
  =========================================================
  * This code was reviewed and changed by Nataliia Azarnykh
  * for non-commercials study purposes
*/
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(API_URL + "sendAutomatedEmail", emailData);
  return response.data.message;
};

const emailService = {
  sendAutomatedEmail,
};

export default emailService;
