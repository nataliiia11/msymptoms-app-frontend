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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { Button, Form, ConfigProvider } from "antd";
import { verifyUser, RESET } from "../../../redux/features/auth/authSlice";
import image from "../../../assets/Sandy_Tech-02_Single-05.jpg";
import { toast } from "react-toastify";
import "../Auth.scss";

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  const onFinish = () => {
    verifyAccount();
  };

  const onFinishFailed = () => {
    return toast.error("Something went wrong, please try again");
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Account Verification</p>
              <p>To verify your account, click the button below...</p>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={verifyAccount}
                >
                  Verify Account
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Verify;
