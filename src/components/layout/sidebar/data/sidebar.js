import React from "react";
import {
  UserOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const SidebarData = [
  {
    path: "/profile",
    title: "Profile",
    icon: <UserOutlined classtitle="icon" />,
  },
  {
    path: "/symptomslist",
    title: "Symptoms list",
    icon: <FileTextOutlined classtitle="icon" />,
  },
  {
    path: "/symptoms",
    title: "Add symptom",
    icon: <PlusCircleOutlined classtitle="icon" />,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <BarChartOutlined classtitle="icon" />,
  },
  {
    path: "/news",
    title: "News",
    icon: <ReadOutlined classtitle="icon" />,
  },
  {
    path: "/support",
    title: "Support",
    icon: <QuestionCircleOutlined classtitle="icon" />,
  },
  {
    path: "/changePassword",
    title: "Settings",
    icon: <SettingOutlined classtitle="icon" />,
  },
];

export default SidebarData;
