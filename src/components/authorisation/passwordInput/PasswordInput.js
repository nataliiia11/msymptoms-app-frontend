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
import "./PasswordInput.scss";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { EyeTwoTone } from "@ant-design/icons";
import { Input, ConfigProvider } from "antd";

const PasswordInput = ({ placeholder, value, onChange, name, onPaste }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <div className="password">
          <Input.Password
            className="password"
            type={passwordVisible ? "text" : "password"}
            placeholder={placeholder}
            required
            name={name}
            value={value}
            onChange={onChange}
            onPaste={onPaste}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone
                  style={{ color: "var(--color-red)", fontSize: "14px" }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  style={{ color: "var(--color-red)", fontSize: "14px" }}
                />
              )
            }
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default PasswordInput;
