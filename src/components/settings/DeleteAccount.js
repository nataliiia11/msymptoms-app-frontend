import { Button, Form, Modal, ConfigProvider } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  getUser,
  RESET,
  deleteUser,
  logout,
} from "../../redux/features/auth/authSlice";
const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you sure you want to delete this account?"
  );
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  const handleOk = async () => {
    try {
      setModalText("We are sorry to see you go :( ");
      const user = await dispatch(getUser()).then((action) => {
        return action.payload;
      });
      await dispatch(deleteUser(user._id));

      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      logoutUser();
    } catch (error) {
      toast.error(
        "Something went wrong. Please write to our customer support."
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <Form>
          <Button
            aria-label="Delete account"
            onClick={showModal}
            styles={{ backgroundColor: "var(--color-red)" }}
            className="--btn --btn-danger"
          >
            Delete account
          </Button>
        </Form>

        <Modal
          title="Account deletion"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DeleteAccount;
