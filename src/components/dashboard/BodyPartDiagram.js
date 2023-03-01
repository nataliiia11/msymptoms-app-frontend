import React, { useEffect, useState } from "react";
import axios from "axios";

import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import { DatePicker, ConfigProvider, Card } from "antd";
import { CategoryScale } from "chart.js";
import { useDispatch } from "react-redux";
import Chart from "chart.js/auto";
import StreamingPlugin from "chartjs-plugin-streaming";
import {
  getSymptoms,
  //  getSymptomsByName,
  // getSymptomsByDateRange,
} from "../../redux/features/symptoms/symptomsSlice";

import "./Dashboard.scss";
const { RangePicker } = DatePicker;
Chart.register(CategoryScale);
Chart.register(StreamingPlugin);

const BodyPartDiagram = () => {
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

  const onChange = async (_, dates) => {
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
          console.log(data);
          setDataSource(data);
          setIsLoading(false);
        } else {
          const emptyData = [];
          setDataSource(emptyData);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);

        toast.error("No symtopms were added at that time");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const bodyPartArr = () => {
    let arr = [];
    dataSource.forEach((symptom) => {
      arr.push(symptom.bodyPart);
    });
    return arr;
  };

  const symptomsAmount = () => {
    const myArray = bodyPartArr();
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
    labels: bodyPartArr(),
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
        ],
        borderColor: "#000000",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "40%", height: "20%" }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7FA62D",
          },
        }}
      >
        <Card cardClass="card" id="dougnutid">
          <RangePicker onChange={onChange} />

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

export default BodyPartDiagram;
