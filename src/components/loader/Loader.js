import React from "react";
import "./Loader.scss";
import ReactDOM from "react-dom";
import { Spin } from "antd";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <Spin
          tip="Loading"
          size="large"
          styles={{ color: "var(--light-green)" }}
        >
          <div className="content" />
        </Spin>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>{" "}
    </div>
  );
};

export default Loader;
