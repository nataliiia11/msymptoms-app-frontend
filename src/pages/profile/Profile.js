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
import React, { useEffect, useLayoutEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "./Profile.scss";
import { Form, ConfigProvider } from "antd";
import image from "../../assets/Sandy_Bus-01_Single-10.jpg";
import UpdateProfile from "../../components/profile/UpdateProfile";
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    isVerified: user?.isVerified || false,
  };
  const [formData, setFormData] = useState(initialState);
  const [profile, setProfile] = useState(initialState);

  const { name, email, bio } = profile;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...profile, [name]: value });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [form] = Form.useForm();

  const saveProfile = async () => {
    try {
      // Save profile to MongoDB
      //const userData = formData;

      await dispatch(updateUser(formData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        bio: user.bio,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  const onFinish = () => {
    saveProfile();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="login-page">
        <div className="login-box-profile">
          <div className="illustration-wrapper">
            <img src={image} alt="Woman shows her profile" />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#7FA62D",
              },
            }}
          >
            <Form name="login-form" form={form}>
              <p className="form-title">Profile</p>
              <p></p>
              <Form.Item>
                <ul>
                  <h4 style={{ color: "#d3d3d3" }}>Name </h4>
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <li>
                      <h3>{name}</h3>
                    </li>
                  </div>
                  <h4 style={{ color: "#d3d3d3" }}>Email </h4>
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <li>
                      <h3>{email}</h3>
                    </li>
                  </div>
                  <h4 style={{ color: "#d3d3d3" }}>Bio </h4>
                  <div
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <li>
                      <h3>{bio}</h3>
                    </li>
                  </div>
                </ul>
                <UpdateProfile
                  saveProfile={saveProfile}
                  handleInputChange={handleInputChange}
                  profile={profile}
                />
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export const UserName = () => {
  const user = useSelector(selectUser);

  const username = user?.name || "...";

  return <p className="--color-white">Hi, {shortenText(username, 9)} |</p>;
};

export default Profile;
