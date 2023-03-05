import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space, ConfigProvider } from "antd";
import { useRef, useState } from "react";
import { existingBodyParts } from "./SelectorsData";
import styles from "./AddSymptoms.scss";

let index = 0;
const SelectBodyPart = (props) => {
  const [items, setItems] = useState(existingBodyParts);
  const [name, setName] = useState("");

  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className={styles.symptomsformselect}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <Select
          type="text"
          className="select"
          placeholder="custom dropdown render"
          onChange={props.onChange}
          listItemHeight={30}
          listHeight={500}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <Space
                style={{
                  padding: "0 8px 4px",
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                />
                <Button
                  aria-label="Add the custom body part"
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                >
                  Add custom body part
                </Button>
              </Space>
            </>
          )}
          options={items.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </ConfigProvider>
    </div>
  );
};
export default SelectBodyPart;
