import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DocumentTitle } from "react-document-title";
import { ConfigProvider, Form } from "antd";
import { Link } from "react-router-dom";
import image from "../../assets/Sandy_Bus-05_Single-05.jpg";
import "./Home.scss";

const Home2 = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <DocumentTitle title="Home page">
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
              <Form name="login-form">
                <p className="form-title">
                  MSypmtoms. Get your disease under control.
                </p>
                <p></p>
                <Form.Item>
                  <p>
                    Introducing the Symptom tracking Web Application - the
                    ultimate solution for monitoring your health and wellbeing.
                    With this easy-to-use platform, you can track and manage
                    your symptoms, stay informed, and make the right decisions
                    about your health.
                  </p>
                </Form.Item>
                <Form.Item>
                  <p>
                    This powerful tool enables you to log and analyse a variety
                    of symptoms including headaches, body pain, fatigue, and
                    many others. You'll have all the tools you need to stay in
                    control of your health.
                  </p>
                </Form.Item>
                <Form.Item>
                  <p>
                    <b>So why wait?</b> Start tracking your symptoms today, and
                    take control of your health with the Symptoms Tracker Web
                    Application
                  </p>
                </Form.Item>

                <Form.Item>
                  <Button
                    aria-label="Navigate to register page"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={navigateToRegister}
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    aria-label="Navigate to login page"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ backgroundColor: "var(--color-red)" }}
                    onClick={navigateToLogin}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </>
    </DocumentTitle>
  );
};

export default Home2;
