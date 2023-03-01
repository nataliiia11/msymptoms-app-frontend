import { Card } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./404.scss";

const NotFoundPage = () => {
  return (
    <div className="mainDiv">
      <Helmet>
        <title>404</title>
        <meta name="text" content="Page is not found :( " />
      </Helmet>
      <Card className="notfoundcard">
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link className="notfoundlinks" to="/">
          Home
        </Link>
        <Link className="notfoundlinks" to="/login">
          Login
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;
