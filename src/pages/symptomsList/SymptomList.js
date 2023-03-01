import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, DatePicker, Space, Button, ConfigProvider, Form } from "antd";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import { FaFilePdf } from "react-icons/fa";
import { Input } from "antd";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import "./Symptom.scss";

const { Search } = Input;

const { RangePicker } = DatePicker;

const SymptomsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Body part",
      key: "bodyPart",
      dataIndex: "bodyPart",
      responsive: ["sm"],
    },
    {
      title: "Intensity",
      key: "intensity",
      dataIndex: "intensity",
      responsive: ["sm"],
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      responsive: ["sm"],
    },
  ]);
  const [dataSource, setDataSource] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bodyPart: "",
    intensity: 0,
    date: new Date(),
    note: "",
  });

  const getSymptoms = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/symptoms`
      );
      setDataSource(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e === undefined) {
      console.log(e);
      return;
    }
    let { name, value } = e.target;

    setFormData((formData) => {
      return { ...formData, [name]: value };
    });
  };

  const onChange = async (_, dates) => {
    try {
      if (dates[0] && dates[1]) {
        const startDate = new Date(dates[0]).toISOString();
        const endDate = new Date(dates[1]).toISOString();

        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/symptoms/filter`,
          {
            data: {
              endDate,
              startDate,
            },
          }
        );

        setDataSource(data);
      } else {
        toast.error("No symtopms were added at that time");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  console.log("formData", formData);
  const updateSymptom = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/symptoms/${id}`,
        formData
      );
      setFormData({ name: "", bodyPart: "", intensity: "" });
      getSymptoms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSymptom = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/symptoms/${id}`
      );
      getSymptoms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSearch = async (value) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/symptoms/name`,
        { name: value }
      );

      setDataSource(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getSymptoms();
  }, []);

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
          <div className="illustration-wrapper">
            <Form name="login-form">
              <p className="form-title">Symptoms list</p>
              <p></p>
              <Form.Item>
                {" "}
                <RangePicker onChange={onChange} />
              </Form.Item>
              <Form.Item>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                />
              </Form.Item>
              <Form>
                {" "}
                <Form.Item className="download-buttons">
                  <Button type="primary" className="csvbutton">
                    <CSVLink
                      filename={"Expense_Table.csv"}
                      data={dataSource}
                      onClick={() => {
                        toast.success("The file is downloading");
                      }}
                    >
                      Export to CSV
                    </CSVLink>
                  </Button>
                  <Button onClick={handlePrint} className="pdfbutton">
                    <FaFilePdf />
                    Export to PDF
                  </Button>
                </Form.Item>
              </Form>
            </Form>
          </div>
          <Space size={20}> </Space>
          <div className="login-page-table">
            <div className="login-box-table">
              <div className="table">
                <Table
                  ref={componentRef}
                  columns={[
                    ...columns,
                    {
                      title: "Actions",
                      key: "actions",

                      render: (record) => {
                        return (
                          <>
                            <DropdownMenu
                              symptom={record}
                              deleteSymptom={deleteSymptom}
                              updateSymptom={updateSymptom}
                              handleInputChange={handleInputChange}
                            />
                          </>
                        );
                      },
                    },
                  ]}
                  dataSource={dataSource}
                />
              </div>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </>
  );
};

export default SymptomsList;
