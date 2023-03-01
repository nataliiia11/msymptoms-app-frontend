import React from "react";
import Data from "../../components/dashoboard/Data";
import DataDougnut from "../../components/dashboard/DataDougnut";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboardcontainer">
        <h1>Dashboard</h1>
        <div>
          <Data />
          <DataDougnut />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
