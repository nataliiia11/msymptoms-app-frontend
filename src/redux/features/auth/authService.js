import {
  responseChangePassword,
  responseDeleteUser,
  responseForgotPassword,
  responseGetUser,
  responseLogin,
  responseLoginStatus,
  responseLoginWithCode,
  responseRegister,
  responseResetPassword,
  responseSendLoginCode,
  responseUpdateUser,
  responseVerificationEmail,
  responseVerifyUser,
  responseLogout,
} from "../../api/api";

//Source of the regex:
// https://stackoverflow.com/questions/54916150/how-to-make-this-email-validation-regex-from-regular-expressions-info-work-in-ja
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const register = async (userData) => {
  const response = await responseRegister(userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await responseLogin(userData);
  console.log("response.data", response.data);
  return response.data;
};

const logout = async () => {
  const response = await responseLogout();
  return response.data.message;
};

const getLoginStatus = async () => {
  const response = await responseLoginStatus();
  return response.data;
};

const getUser = async () => {
  const response = await responseGetUser();
  return response.data;
};

const updateUser = async (userData) => {
  const response = await responseUpdateUser(userData);
  return response.data;
};

const sendVerificationEmail = async () => {
  const response = await responseVerificationEmail();
  return response.data.message;
};

const verifyUser = async (verificationToken) => {
  const response = await responseVerifyUser(verificationToken);
  return response.data.message;
};

const changePassword = async (userData) => {
  const response = await responseChangePassword(userData);
  return response.data.message;
};

const resetPassword = async (password, resetToken) => {
  const response = await responseResetPassword(password, resetToken);
  return response.data.message;
};

const forgotPassword = async (userData) => {
  const response = await responseForgotPassword(userData);
  return response.data.message;
};

const deleteUser = async (id) => {
  const response = await responseDeleteUser(id);
  return response.data.message;
};

const sendLoginCode = async (email) => {
  const response = await responseSendLoginCode(email);
  return response.data.message;
};

const loginWithCode = async (code, email) => {
  const response = await responseLoginWithCode(code, email);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
  sendLoginCode,
  loginWithCode,
};

export default authService;
