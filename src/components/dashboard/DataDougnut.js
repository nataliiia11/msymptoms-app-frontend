import React, { useEffect, useState } from "react";

import Card from "../../components/card/Card";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import { DatePicker, ConfigProvider } from "antd";
import { CategoryScale } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import StreamingPlugin from "chartjs-plugin-streaming";
import Chart from "chart.js/auto";

import {
  getSymptoms,
  getSymptomsByDateRange,
} from "../../redux/features/symptoms/symptomsSlice";
import { useDispatch } from "react-redux";

import "./Dashboard.scss";
import axios from "axios";

const { RangePicker } = DatePicker;
Chart.register(CategoryScale);
Chart.register(StreamingPlugin);

const DataDougnut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [chart, setChart] = useState([]);
  const dispatch = useDispatch();

  const getAllSymptoms = async () => {
    setIsLoading(true);
    const data = await dispatch(getSymptoms()).then((action) => {
      const symptomsData = action.payload;
      return symptomsData;
    });
    setChart(data);
    setDataSource(data);
    setIsLoading(false);
  };

  const getAllSymptomsByDateRange = async (_, dates) => {
    setIsLoading(true);
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
          setIsLoading(false);
        } else {
          toast.error("No symtopms were added at that time");
        }
      } else {
        toast.error("No symtopms were added at that time");
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const nameArr = () => {
    let arr = [];
    dataSource.forEach((symptom) => {
      arr.push(symptom.name);
    });
    return arr;
  };

  const symptomsAmount = () => {
    const myArray = nameArr();
    let uniqueElements = [...new Set(myArray)];
    const elementCounts = uniqueElements.map(
      (value) => myArray.filter((str) => str === value).length
    );

    return elementCounts;
  };

  useEffect(() => {
    getAllSymptoms();
  }, []);

  const data = {
    labels: nameArr(),
    datasets: [
      {
        label: "# of Votes",
        data: symptomsAmount(),
        backgroundColor: [
          "#142601",
          "#7FA62D",
          "#47591E",
          "#D9D3B4",
          "#BF705E",
          "#E5E5E5",
          "#89966A",
          "#F8FBEF",
          "#928355",
        ],
        borderColor: "#000000",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "50vw", marginLeft: "10vw" }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <Card
          cardClass="card"
          id="dougnutid"
          style={{ width: "60vw", marginLeft: "10vw" }}
        >
          <h2 style={{ fontSize: "25px", marginBottom: "30px" }}>Symptom</h2>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            To see which symptoms were added in a certain period, select the
            start date and the end date.
          </p>
          <RangePicker
            onChange={getAllSymptomsByDateRange}
            style={{ height: "40px", marginBottom: "30px" }}
          />

          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default DataDougnut;
