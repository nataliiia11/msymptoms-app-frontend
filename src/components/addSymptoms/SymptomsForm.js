import React from "react";
import { Form, Button, ConfigProvider } from "antd";
import { toast } from "react-toastify";
import SelectName from "./SelectName";
import SelectBodyPart from "./SelectBodyPart";
import { InputNumber } from "antd";
import image from "../../assets/Sandy_Tech-13_Single-06.jpg";
import "./AddSymptoms.scss";

const SymptomsForm = ({ createSymptom, handleInputChange }) => {
  const [form] = Form.useForm();

  const onFinishFailed = () => {
    return toast.error("Something went wrong, please try again");
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box-profile">
          <div className="illustration-wrapper">
            <img
              src={image}
              alt="Cup of coffee, a pen and a computer monitor with web site"
            />
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
              onFinish={createSymptom}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Add symptom</p>
              <p></p>
              <Form.Item name="name">
                <label htmlFor="namedInput">
                  Please select or add a symptom name
                </label>
                <SelectName
                  type="text"
                  onChange={(value) => {
                    handleInputChange({
                      target: {
                        name: "name",
                        value: value,
                      },
                    });
                  }}
                />
              </Form.Item>

              <Form.Item name="bodyPart">
                <label htmlFor="bodyPartInput">
                  Please select or add a body part
                </label>

                <SelectBodyPart
                  type="text"
                  onChange={(bodyPartValue) => {
                    handleInputChange({
                      target: {
                        name: "bodyPart",
                        value: bodyPartValue,
                      },
                    });
                  }}
                />
              </Form.Item>

              <Form.Item name="severity" styles={{ display: "block" }}>
                <label htmlFor="IntensityInput">
                  Please select intensity of the symptom
                </label>

                <InputNumber
                  type="text"
                  size="middle"
                  placeholder="Add a severity"
                  name="intensity"
                  onChange={(intensityValue) => {
                    handleInputChange({
                      target: {
                        name: "intensity",
                        value: intensityValue,
                      },
                    });
                  }}
                  min={1}
                  max={5}
                  defaultValue={3}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  aria-label="Add the symptom"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Add{" "}
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default SymptomsForm;
