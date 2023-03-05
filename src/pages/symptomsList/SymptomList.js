import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, DatePicker, Space, Button, ConfigProvider, Form } from "antd";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import { FaFilePdf } from "react-icons/fa";
import { Input } from "antd";
import { useDispatch } from "react-redux";

import {
  RESET,
  getSymptoms,
  deleteSymptom,
  updateSymptom,
  getSymptomsByDateRange,
  getSymptomsByName,
} from "../../redux/features/symptoms/symptomsSlice";
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
  const dispatch = useDispatch();

  const getAllSymptoms = async () => {
    setIsLoading(true);
    try {
      const data = await dispatch(getSymptoms()).then((action) => {
        const symptomsData = action.payload;
        return symptomsData;
      });
      setDataSource(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
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
        const symptomsDates = { endDate, startDate };
        const data = await dispatch(getSymptomsByDateRange(symptomsDates)).then(
          (action) => {
            const symptomsData = action.payload;
            return symptomsData;
          }
        );

        setDataSource(data);
      } else {
        toast.error("No symtopms were added at that time");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOneSymptom = async (id) => {
    try {
      const updateSymptomData = { id, formData };
      await dispatch(updateSymptom(updateSymptomData));
      setFormData({ ...formData, name: "" });
      getSymptoms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteOneSymptom = async (id) => {
    try {
      await dispatch(deleteSymptom(id));

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
      const data = await dispatch(getSymptomsByName(value)).then((action) => {
        const symptomsData = action.payload;
        return symptomsData;
      });

      setDataSource(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllSymptoms();
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
                              deleteSymptom={deleteOneSymptom}
                              updateSymptom={updateOneSymptom}
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
