import React, { useState } from "react";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SidebarData } from "../../data/sidebar";
import "./Sidebar.scss";
const SidebarElement = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout">
      <div className="" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="">
          <div
            className=""
            style={{ display: isOpen ? "block" : "none" }}
          ></div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <Menu
              className="sidebar"
              style={{ width: isOpen ? "230px" : "60px" }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={[window.location.pathname]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={SidebarData}
              onClick={({ key }) => {
                navigate(key);
              }}
            >
              <Button
                aria-label="Opens the page of the application"
                type="primary"
                onClick={toggleCollapsed}
                style={{
                  marginBottom: 16,
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                click me
              </Button>
              {SidebarData}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarElement;
