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
import Notification from "../../components/profile/verificationBanner/Notification";
import { Form, Button, Input, ConfigProvider } from "antd";
import TextArea from "antd/es/input/TextArea";
import image from "../../assets/Sandy_Bus-01_Single-10.jpg";
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
  const [profile, setProfile] = useState(initialState);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    try {
      // Save profile to MongoDB
      const userData = {
        name: profile.name,
        bio: profile.bio,
      };
      const { TextArea } = Input;

      dispatch(updateUser(userData));
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

  const onFinish = (values) => {
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
            <Form
              name="login-form"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Profile</p>
              <p></p>
              <Form.Item> {!profile.isVerified && <Notification />}</Form.Item>
              <Form.Item name="name">
                <Input
                  placeholder="Please enter your name"
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  type="email"
                  name="email"
                  value={profile?.email}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Item>
              <Form.Item>
                <TextArea
                  showCount
                  maxLength={100}
                  style={{ height: 120, marginBottom: 24 }}
                  name="bio"
                  value={profile?.bio}
                  onChange={handleInputChange}
                ></TextArea>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Update Profile
                </Button>
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
