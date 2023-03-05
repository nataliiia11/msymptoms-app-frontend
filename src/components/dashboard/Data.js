import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import { ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import {
  getSymptoms,
  getSymptomsByName,
} from "../../redux/features/symptoms/symptomsSlice";

import Card from "../../components/card/Card";
import "./Dashboard.scss";
import axios from "axios";

const Data = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
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
    return arr;
  };

  const data = {
    labels: dateArr(),
    datasets: [
      {
        label: "Symptom intensity",
        data: intensityArr(),
        fill: false,
        borderColor: "#BF705E",
      },
    ],
  };

  return (
    <>
      <div style={{ width: "50vw", marginLeft: "10vw" }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7FA62D",
            },
          }}
        >
          <Card cardClass="card" id="cardlinedataid">
            <h2 style={{ fontSize: "25px", marginBottom: "30px" }}>
              Intensity
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "30px" }}>
              To find out the intensity of a particular symptom, enter the
              symptom name in the Search field.
            </p>
            <Search
              style={{ height: "60px" }}
              placeholder="Input the name of the symptom"
              allowClear
              enterButton="Search"
              size="small"
              onSearch={getAllSymptomsByName}
            />
            <Line
              data={data}
              options={{
                responsive: true,
              }}
            />
          </Card>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Data;
