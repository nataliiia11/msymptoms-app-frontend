import { Space, ConfigProvider, Button } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
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
          <div className="legal-buttons">
            <Space size={10}>
              <Button className="t-and-c-button" to="/terms-and-conditions">
                Terms and Conditions
              </Button>
            </Space>
            <Button to="/privacy-policy">Privacy Policy</Button>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Footer;
