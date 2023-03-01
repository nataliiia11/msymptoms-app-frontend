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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button, Input, ConfigProvider } from "antd";
import { validateEmail } from "../../../redux/features/auth/authService";
import { forgotPassword, RESET } from "../../../redux/features/auth/authSlice";
import Header from "../../../components/layout/header/Header";
import Loader from "../../../components/loader/Loader";
import image from "../../../assets/Sandy_Tech-02_Single-05.jpg";
import "../Auth.scss";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    forgot();
    form.validateFields();
  };

  const onFinishFailed = (errorInfo) => {
    return toast.error("Something went wrong, please try again");
  };

  return (
    <>
      <Header />
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Forgot Password</p>
              <p></p>
              <Form.Item>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Get Reset Email
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Forgot;
