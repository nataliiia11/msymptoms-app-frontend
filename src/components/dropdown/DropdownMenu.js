import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, ConfigProvider } from "antd";
import UpdateSymptom from "./UpdateSymptom";

const DropdownMenu = ({
  updateSymptom,
  symptom,
  deleteSymptom,
  handleInputChange,
}) => {
  const items = [
    {
      key: "1",
      label: (
        <>
          <UpdateSymptom
            updateSymptom={updateSymptom}
            symptom={symptom}
            handleInputChange={handleInputChange}
          />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <p className="deleteButton" onClick={() => deleteSymptom(symptom._id)}>
          Delete symptom
        </p>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <Dropdown
          style={{ color: "#7FA62D" }}
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              More
              <DownOutlined style={{ color: "#7FA62D" }} />
            </Space>
          </a>
        </Dropdown>
      </ConfigProvider>
    </>
  );
};
export default DropdownMenu;
