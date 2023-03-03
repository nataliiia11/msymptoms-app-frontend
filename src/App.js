import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Forgot from "./pages/authorisation/forgotPassword/Forgot";
import Login from "./pages/authorisation/login/Login";
import LoginWithCode from "./pages/authorisation/loginWithCode/LoginWithCode";
import Register from "./pages/authorisation/register/Register";
import Verify from "./pages/authorisation/verifyAccount/Verify";
import ChangePassword from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import Sidebar from "./components/layout/sidebar/Sidebar";
import SymptomsList from "./pages/symptomsList/SymptomList";
import NewsList from "./pages/news/NewsList";
import Contact from "./pages/contact/Contact";
import NotFoundPage from "./pages/404/404";
import Dashboard from "./components/dashboard/Dashboard";
import AddSymptoms from "./pages/addSymptoms/AddSymptoms";
import Reset from "./pages/authorisation/resetPassword/Reset";
export const URL = process.env.REACT_APP_BACKEND_URL;

const prepareApp = () => {
  axios.defaults.withCredentials = true;
};

prepareApp();

const appPaths = {
  home: "/",
  login: "/login",
  register: "/register",
  forgot: "/forgot",
  resetPassword: "/resetPassword/:resetToken",
  loginWithCode: "/loginWithCode/:email",
  symptomslist: "/symptomslist",
  symptoms: "/symptoms",
  verify: "/verify/:verificationToken",
  news: "/news",
  profile: "/profile",
  changePassword: "/changePassword",
  termsAndConditions: "/terms-and-conditions",
  dashboard: "/dashboard",
  privacyPolicy: "/privacy-policy",
  support: "/support",
  notFound: "*",
};

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={appPaths.forgot} element={<Forgot />} />

          <Route path={appPaths.notFound} element={<NotFoundPage />} />

          <Route path={appPaths.resetPassword} element={<Reset />} />
          <Route path={appPaths.loginWithCode} element={<LoginWithCode />} />
          <Route
            path={appPaths.symptomslist}
            element={
              <Layout>
                <Sidebar>
                  <SymptomsList />
                </Sidebar>
              </Layout>
            }
          />
          <Route
            path={appPaths.symptoms}
            element={
              <Layout>
                <Sidebar>
                  <AddSymptoms />
                </Sidebar>
              </Layout>
            }
          />
          <Route
            path={appPaths.verify}
            element={
              <Layout>
                <Verify />
              </Layout>
            }
          />

          <Route
            path={appPaths.news}
            element={
              <Layout>
                <Sidebar>
                  <NewsList />
                </Sidebar>
              </Layout>
            }
          />

          <Route
            path="/profile"
            element={
              <Layout>
                <Sidebar>
                  <Profile />
                </Sidebar>
              </Layout>
            }
          />

          <Route
            path={appPaths.changePassword}
            element={
              <Layout>
                <Sidebar>
                  <ChangePassword />
                </Sidebar>
              </Layout>
            }
          />

          <Route
            path={appPaths.termsAndConditions}
            element={
              <Layout>
                <TermsAndConditions />
              </Layout>
            }
          />

          <Route
            path={appPaths.dashboard}
            element={
              <Layout>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </Layout>
            }
          />

          <Route
            path={appPaths.privacyPolicy}
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path={appPaths.support}
            element={
              <Layout>
                <Sidebar>
                  <Contact />
                </Sidebar>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
