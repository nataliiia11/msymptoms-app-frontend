import React, { useRef } from "react";
import Data from "../../components/dashboard/Data";
import DataDougnut from "../../components/dashboard/DataDougnut";
import BodyPartDiagram from "../../components/dashboard/BodyPartDiagram";
import { useReactToPrint } from "react-to-print";
import { FaFilePdf } from "react-icons/fa";
import { Button, Form, ConfigProvider } from "antd";
import "./Dashboard.scss";

const Dashboard = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7FA62D",
            },
          }}
        >
          <div className="dashboardcontainer">
            <h1 style={{ marginLeft: "10vw", marginTop: "5%" }}>Dashboard</h1>
            <Form>
              <Form.Item className="download-buttons">
                <Button
                  style={{
                    marginLeft: "10vw",
                    marginTop: "5%",
                    marginBottom: "5%",
                    height: "50px",
                  }}
                  onClick={handlePrint}
                  className="pdfbutton"
                >
                  <FaFilePdf />
                  Export to PDF
                </Button>
              </Form.Item>
            </Form>
            <div ref={componentRef}>
              <Form>
                <Form.Item>
                  <Data />
                </Form.Item>
                <Form.Item>
                  <DataDougnut />
                </Form.Item>
                <Form.Item>
                  <BodyPartDiagram />
                </Form.Item>
              </Form>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Dashboard;
