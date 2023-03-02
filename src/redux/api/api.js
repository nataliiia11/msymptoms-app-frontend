import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = "https://msymptoms-backend.onrender.com/api/";

// user api
export const responseRegister = async (userData) => {
  const response = await axios.post(API_URL + "users/register", userData);
  return response;
};

export const responseLogin = async (userData) => {
  const response = await axios.post(API_URL + "users/login", userData);
  return response;
};

export const responseLogout = async () => {
  const response = await axios.get(API_URL + "users/logout");
  return response;
};

export const responseLoginStatus = async () => {
  const response = await axios.get(API_URL + "users/loginStatus");
  return response;
};

export const responseGetUser = async () => {
  const response = await axios.get(API_URL + "users/getUser");
  console.log("api response", response);
  return response;
};

export const responseUpdateUser = async (userData) => {
  const response = await axios.patch(API_URL + "users/updateUser", userData);
  return response;
};

export const responseVerificationEmail = async () => {
  const response = await axios.post(API_URL + "users/sendVerificationEmail");
  return response;
};

export const responseVerifyUser = async (verificationToken) => {
  const response = await axios.patch(
    API_URL + `users/verifyUser/${verificationToken}`
  );
  return response;
};

export const responseChangePassword = async (userData) => {
  const response = await axios.patch(
    API_URL + "users/changePassword",
    userData
  );
  return response;
};

export const responseResetPassword = async (password, resetToken) => {
  const response = await axios.patch(
    API_URL + `users/resetPassword/${resetToken}`,
    { password: password }
  );
  return response;
};

export const responseForgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "users/forgotPassword", userData);
  return response;
};

export const responseSendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `users/sendLoginCode/${email}`);
  return response;
};

export const responseDeleteUser = async (id) => {
  const response = await axios.delete(API_URL + `users/deleteUser/${id}`);
  return response;
};

export const responseLoginWithCode = async (code, email) => {
  const response = await axios.post(
    API_URL + `users/loginWithCode/${email}`,
    code
  );
  return response;
};

// symptoms api

export const responseGetSymptomsWithDate = async (date) => {
  const response = await axios.post(API_URL + "symptoms", date);
  return response;
};

export const responseGetSymptoms = async () => {
  const response = await axios.get(API_URL + "symptoms");
  return response;
};

export const responseGetSymptomsByName = async (value) => {
  const response = await axios.post(API_URL + "symptoms/name", {
    name: value,
  });
  return response;
};

export const responseGetSymptomsByDateRange = async (endDate, startDate) => {
  const response = await axios.post(API_URL + "symptoms/filter", {
    data: {
      endDate,
      startDate,
    },
  });
  return response;
};

export const responseGetSymptomsByBodyPart = async (value) => {
  const response = await axios.post(API_URL + "symptoms/bodyPart", {
    name: value,
  });
  return response;
};

export const responseDeleteSymptom = async (id) => {
  const response = await axios.delete(API_URL + `symptoms/${id}`);
  return response;
};

export const responseCreateSymptom = async (formData) => {
  const response = await axios.post(API_URL + `symptoms`, formData);
  return response;
};

export const responseUpdateSymptom = async (id, formData) => {
  const response = await axios.post(API_URL + `symptoms/${id}`, formData);
  return response;
};

export const responseGetSymptomsToday = async () => {
  const response = await axios.get(API_URL + `symptoms/today`);
  return response;
};
