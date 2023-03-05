import { Card, Form } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./404.scss";

const NotFoundPage = () => {
  return (
    <div className="login-page">
      <div className="login-box-profile">
        <Form>
          <Form.Item>
            {" "}
            <Helmet>
              <title>404</title>
              <meta name="text" content="Page is not found :( " />
            </Helmet>
          </Form.Item>
          <Form.Item>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
          </Form.Item>

          <Form.Item>
            <Link className="notfoundlinks" to="/">
              Home
            </Link>
            <Link className="notfoundlinks" to="/login">
              Login
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NotFoundPage;
