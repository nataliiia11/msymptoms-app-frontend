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
import "./Contact.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, Button, Input, ConfigProvider } from "antd";
import image from "../../assets/Wavy-C_Bus-07_Single-08.jpg";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const { TextArea } = Input;

  const sendEmail = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/support`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    sendEmail();
    form.validateFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="login-page">
        <div className="login-box-profile">
          <div className="illustration-wrapper">
            <img
              src={image}
              alt="Cup of coffee, a pen and a computer monitor with web site"
            />
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Contact Us</p>
              <p></p>
              <Form.Item>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <TextArea
                  showCount
                  maxLength={100}
                  cols="30"
                  rows="10"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></TextArea>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Contact;
