import { Space, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <hr className="--color-dark" />
      <div className="--flex-center --py2 --bg-grey">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7FA62D",
            },
          }}
        >
          <div className="">
            <Space size={10}>
              <Link
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  color: "#7FA62D",
                  fontSize: "16px",
                }}
                className="t-and-c-button"
                to="/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </Space>
            <Link
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                color: "#7FA62D",
                fontSize: "16px",
              }}
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Footer;
