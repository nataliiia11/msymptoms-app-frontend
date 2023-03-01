/*+
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
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../../redux/features/auth/authSlice";
import { Form, Button, Input, Divider, ConfigProvider, Checkbox } from "antd";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { EyeTwoTone } from "@ant-design/icons";
import Card from "../../../components/card/Card";
import PasswordInput from "../../../components/authorisation/passwordInput/PasswordInput";
import Loader from "../../../components/loader/Loader";
import image from "../../../assets/Sandy_Bus-32_Single-12.jpg";
import Link from "antd/es/typography/Link";
import "../Auth.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="var(--color-red)" id="" size={15} />;
  const checkIcon = <BsCheck2All color="var(--light-green)" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }

    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const registerUser = async (e) => {
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  const onFinish = (values) => {
    registerUser();
    console.log("Success:", values);
  };

  const onFinishFailed = () => {
    return toast.error("Something went wrong, please try again");
  };

  const dataSubmit = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return dataSubmit();
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="login-page">
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
            {isLoading && <Loader />}
            <Form
              name="login-form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Register</p>
              <p></p>
              <Form.Item name="name">
                <Input
                  placeholder="Please enter your name"
                  name="name"
                  required
                  value={name}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                  className="email"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item name="password" placeholder="Password">
                <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <AiOutlineEyeInvisible />
                  }
                />
              </Form.Item>
              <Form.Item>
                <PasswordInput
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Cannot paste into input field");
                    return false;
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Card className="form-list" cardClass="group">
                  <ul>
                    <li>
                      <span className="indicator">
                        {switchIcon(uCase)}
                        &nbsp; Lowercase & Uppercase
                      </span>
                    </li>
                    <li>
                      <span className="indicator">
                        {switchIcon(num)}
                        &nbsp; Number (0-9)
                      </span>
                    </li>
                    <li>
                      <span className="indicator">
                        {switchIcon(sChar)}
                        &nbsp; Special Character (!@#$%^&*)
                      </span>
                    </li>
                    <li>
                      <span className="indicator">
                        {switchIcon(passLength)}
                        &nbsp; At least 6 Character
                      </span>
                    </li>
                  </ul>
                </Card>
              </Form.Item>
              .
              <Form.Item>
                <Divider />
                <Checkbox type="checkbox" onClick={onCheckboxClick}>
                  {" "}
                  I have read and agreed to the{" "}
                  <a href="/terms-and-conditions" className="link">
                    Terms and Conditions
                  </a>{" "}
                  and the{" "}
                  <a className="link" href="/privacy-policy">
                    Privacy Policy
                  </a>{" "}
                  of MSymptoms.
                </Checkbox>
                <Divider />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={isDisabled}
                >
                  Register
                </Button>
                <Link
                  to="/login"
                  className="forgotpass"
                  onClick={navigateToLogin}
                  style={{ color: "var(--color-red)" }}
                >
                  Already registered? Login
                </Link>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Register;
