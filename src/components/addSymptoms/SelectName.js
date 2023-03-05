import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { useRef, useState } from "react";
import { existingSymptoms } from "./SelectorsData";
import styles from "./AddSymptoms.scss";

let index = 0;
const SelectName = (props) => {
  const [items, setItems] = useState(existingSymptoms);
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
      <Select
        style={{ width: "60vw" }}
        className="select"
        placeholder="Please select the symptom"
        onChange={props.onChange}
        listItemHeight={30}
        listHeight={500}
        type="text"
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
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add custom symptom
              </Button>
            </Space>
          </>
        )}
        options={items.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </div>
  );
};
export default SelectName;
