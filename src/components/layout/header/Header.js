import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, ConfigProvider } from "antd";
import { logout, RESET } from "../../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../../protect/hiddenLink";
import { UserName } from "../../../pages/profile/Profile";
import "./Header.scss";
import Link from "antd/es/typography/Link";

const activeLink = ({ isActive }) => (isActive ? "active" : "");
const logo = require("../../../assets/logo.png");
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <nav>
          <div className="logo" onClick={goHome}>
            <img src={logo} alt="Logo" width="150px" />
          </div>
          <ul className="home-links">
            <ShowOnLogin>
              <li className="--flex-center">
                <FaUserCircle size={20} />
                <UserName />
              </li>
            </ShowOnLogin>
            <ShowOnLogout>
              <li>
                <Button
                  aria-label="Navigates to login"
                  onClick={navigateToLogin}
                  className="--btn --btn-primary"
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  aria-label="Navigates to register"
                  className="--btn --btn-secondary"
                  onClick={navigateToRegister}
                >
                  Register
                </Button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <Link
                  style={{ fontFamily: "Montserrat" }}
                  onClick={navigateToProfile}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button
                  aria-label="Logout from the application"
                  onClick={logoutUser}
                  className="--btn --btn-secondary"
                >
                  Logout
                </Button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </ConfigProvider>
    </header>
  );
};

export default Header;
