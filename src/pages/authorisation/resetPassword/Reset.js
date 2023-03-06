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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, ConfigProvider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, RESET } from "../../../redux/features/auth/authSlice";
import Header from "../../../components/layout/header/Header";
import PasswordInput from "../../../components/authorisation/passwordInput/PasswordInput";
import "../Auth.scss";
import image from "../../../assets/Sandy_Gen-03_Single-07.jpg";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const { isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetUserPassword = async () => {
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    await dispatch(resetPassword({ password, resetToken })).then((action) => {
      return action.payload;
    });
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }
    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  const onFinishFailed = (errorInfo) => {
    return toast.error("Something went wrong, please try again");
  };
  return (
    <>
      <Header />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <div className="login-page">
          <div className="login-box-profile">
            <div className="illustration-wrapper">
              <img
                src={image}
                alt="Man holding pencil demonstrate pages and ideas."
              />
            </div>
            <Form name="login-form" onFinishFailed={onFinishFailed}>
              <p className="form-title">Reset Password</p>
              <p></p>
              <Form.Item>
                <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  onPaste={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <PasswordInput
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={resetUserPassword}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Reset;
