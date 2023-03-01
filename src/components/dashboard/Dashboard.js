import React from "react";
import Data from "./Data";
import DataDougnut from "./DataDougnut";

import "./Dashboard.scss";
import BodyPartDiagram from "./BodyPartDiagram";

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="dashboardcontainer">
          <h1>Dashboard</h1>
          <div>
            <Data />
            <DataDougnut />
            <BodyPartDiagram />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
