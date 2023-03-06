import React, { useState } from "react";

import { Modal, ConfigProvider, InputNumber, Card, Form } from "antd";
import SelectBodyPart from "../addSymptoms/SelectBodyPart";
import SelectName from "../addSymptoms/SelectName";

const UpdateSymptom = ({ updateSymptom, symptom, handleInputChange }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    await updateSymptom(symptom._id);
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
          <p className="editButton" onClick={showModal}>
            Edit symptom
          </p>

          <Modal
            title="Edit symptom"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form onFinish={updateSymptom} className="form">
              <Card cardClass="card">
                <label>Name of the symptom</label>
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
                <label>Body part</label>
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
                <label>Intensity</label>
                <InputNumber
                  type="text"
                  size="small"
                  placeholder="Add a severity"
                  name="intensity"
                  style={{ width: "110%", height: "5vh" }}
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
                  defaultValue={0}
                />
              </Card>
            </Form>
          </Modal>
        </>
      </ConfigProvider>
    </>
  );
};

export default UpdateSymptom;
