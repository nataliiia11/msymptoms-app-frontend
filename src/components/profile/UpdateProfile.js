import React, { useState } from "react";

import { Modal, ConfigProvider, Button, Input, Card, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const UpdateSymptom = ({ saveProfile, profile, handleInputChange }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    saveProfile(profile);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <>
          <Button
            aria-label="Update profile"
            type="primary"
            className="login-form-button"
            onClick={showModal}
          >
            Edit profile
          </Button>

          <Modal
            title="Edit profile"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form onFinish={saveProfile} className="form">
              <Card cardClass="card">
                <Form.Item>
                  <h3>Name</h3>
                  <Input
                    type="text"
                    placeholder="Please enter your name"
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <Form.Item>
                  <h3>Bio</h3>
                  <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                    name="bio"
                    onChange={handleInputChange}
                  ></TextArea>
                </Form.Item>
              </Card>
            </Form>
          </Modal>
        </>
      </ConfigProvider>
    </>
  );
};

export default UpdateSymptom;
