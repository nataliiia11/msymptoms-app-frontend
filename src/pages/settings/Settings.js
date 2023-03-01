/*
  =========================================================
  * ZINOTRUST ACADEMY 
  =========================================================
  * Email: zinotrust@gmail.com
  * Copyright 2021 AKPAREVA EWOMAZINO
  * 
  =========================================================
  * This code was reviewed and changed by Nataliia Azarnykh
  * 
  * for non-commercials study purposes
*/
import React, { useState } from "react";
import PasswordInput from "../../components/authorisation/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";
import { Form, Button, ConfigProvider, Input } from "antd";
import image from "../../assets/Sandy_Bus-02_Single-06.jpg";
import DeleteAccount from "../../components/settings/DeleteAccount";
import "./Settings.scss";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const Settings = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    // e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password changed",
      send_to: user.email,
      reply_to: "azarnykhna@gmail.com",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    // await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box-profile">
          <div className="illustration-wrapper">
            <img src={image} alt="Woman shows her profile" />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#7FA62D",
              },
            }}
          >
            <Form name="login-form" onSubmit={updatePassword}>
              <p className="form-title">Change Password</p>
              <p></p>
              <Form.Item>
                <PasswordInput
                  placeholder="Old Password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <PasswordInput
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item name="password2">
                <Input
                  placeholder="Confirm new Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                />
              </Form.Item>

              {isLoading ? (
                <Spinner />
              ) : (
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={updatePassword}
                  >
                    Change Password
                  </Button>
                </Form.Item>
              )}
              <Form.Item>
                <DeleteAccount />
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Settings;
