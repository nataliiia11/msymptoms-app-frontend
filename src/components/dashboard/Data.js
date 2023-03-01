import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import { DatePicker, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import {
  getSymptoms,
  getSymptomsByName,
  //  getSymptomsByDateRange,
} from "../../redux/features/symptoms/symptomsSlice";

import Card from "../../components/card/Card";
import "./Dashboard.scss";
import axios from "axios";

const { RangePicker } = DatePicker;

const Data = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  const formattedDate = (date) => {
    return date
      .toLocaleDateString("default", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
  };

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

  useEffect(() => {
    getAllSymptoms();
  }, []);

  const getAllSymptomsByName = async (value) => {
    try {
      setIsLoading(true);
      const data = await dispatch(getSymptomsByName(value)).then((action) => {
        const symptomsData = action.payload;
        return symptomsData;
      });
      setDataSource(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getAllSymptomsByDateRange = async (_, dates) => {
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
        if (data) {
          setDataSource(data);
        } else {
          toast.error("No symtopms were added at that time");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const intensityArr = () => {
    let arr = [];
    dataSource.forEach((symptom) => {
      arr.push(parseInt(symptom.intensity));
    });
    console.log(arr);
    return arr;
  };

  const dateArr = () => {
    let arr = [];
    dataSource.forEach((symptom) => {
      const date = symptom.date.slice(0, symptom.date.indexOf("T"));
      arr.push(date);
    });
    console.log(arr);
    return arr;
  };

  const data = {
    labels: dateArr(),
    datasets: [
      {
        label: "Second dataset",
        data: intensityArr(),
        fill: false,
        borderColor: "#BF705E",
      },
    ],
  };

  return (
    <>
      <div style={{ width: "40%", height: "30%" }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7FA62D",
            },
          }}
        >
          <Card cardClass="card" id="cardlinedataid">
            <RangePicker
              getAllSymptomsByDateRange={getAllSymptomsByDateRange}
            />

            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="small"
              onSearch={getAllSymptomsByName}
            />
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </Card>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Data;
