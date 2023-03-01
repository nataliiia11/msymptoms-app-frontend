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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Input, ConfigProvider } from "antd";
import image from "../../../assets/Sandy_Tech-02_Single-05.jpg";

import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../../redux/features/auth/authSlice";
import Loader from "../../../components/loader/Loader";
import "../Auth.scss";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    loginUserWithCode();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-page">
        {isLoading && <Loader />}

        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={image} alt="Login" />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#7FA62D",
              },
            }}
          >
            <Form
              name="login-form"
              form={form}
              initialValues={{
                remember: true,
              }}
              onSubmit={LoginWithCode}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Enter Access Code</p>
              <p></p>
              <Form.Item>
                <Input
                  required
                  name="loginCode"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="login-form-button"
                  onClick={loginUserWithCode}
                >
                  Proceed To Login
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  htmlType="submit"
                  onClick={sendUserLoginCode}
                  style={{ backgroundColor: "var(--color-red" }}
                >
                  Resend Code
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default LoginWithCode;
