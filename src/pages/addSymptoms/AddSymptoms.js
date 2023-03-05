import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Symptom from "../../components/addSymptoms/Symptom";
import SymptomsForm from "../../components/addSymptoms/SymptomsForm";
import { useDispatch } from "react-redux";
import { RESET } from "../../redux/features/symptoms/symptomsSlice";
import { DocumentTitle } from "react-document-title";

import {
  getSymptoms,
  createSymptom,
  updateSymptom,
  deleteSymptom,
  getSymptomsToday,
} from "../../redux/features/symptoms/symptomsSlice";
import "./AddSymptoms.scss";

const AddSymptoms = () => {
  const [symptoms, setSymptoms] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    bodyPart: "",
    intensity: "",
    date: new Date(),
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { name } = formData;
  const dispatch = useDispatch();

  const getAllSymptoms = async () => {
    setIsLoading(true);
    try {
      const data = await dispatch(getSymptoms()).then((action) => {
        const symptomsData = action.payload;
        return symptomsData;
      });

      setSymptoms(data);
      setIsLoading(false);
      await dispatch(RESET);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const getAllSymptomsToday = async () => {
    setIsLoading(true);
    try {
      const data = await dispatch(getSymptomsToday()).then((action) => {
        const symptomsData = action.payload;
        return symptomsData;
      });

      setSymptoms(data);
      setIsLoading(false);
      await dispatch(RESET);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (e === undefined) {
      return;
    }
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const deleteOneSymptom = async (id) => {
    try {
      await dispatch(deleteSymptom(id));
      getAllSymptoms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOneSymptom = async (id) => {
    if (name === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      const updateSymptomData = { id, formData };
      await dispatch(updateSymptom(updateSymptomData));
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getAllSymptoms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleSymptom = async (symptom) => {
    try {
      setFormData({
        name: symptom.name,
        bodyPart: symptom.bodyPart,
        intensity: symptom.intensity,
        date: symptom.date,
        note: symptom.note,
      });
      setIsEditing(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createOneSymptom = async () => {
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await dispatch(createSymptom(formData));

      toast.success("Symptom added successfully");
      getAllSymptoms();

      //clean the form
      setFormData({
        ...formData,
        name: "",
        bodyPart: "",
        intensity: "",
        date: new Date(),
        note: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllSymptomsToday();
  }, []);

  return (
    <DocumentTitle title="Add symptom">
      <div>
        <div className="symptomslistcontainer">
          <div className="inputform">
            <SymptomsForm
              className="inputform"
              name={name}
              handleInputChange={handleInputChange}
              createSymptom={createOneSymptom}
              isEditing={isEditing}
            />
          </div>
          <h1>Recent symptoms</h1>
          <div className="text">
            <p>
              In this section you can see all symptoms you added in the last 24
              hours.
            </p>
          </div>
          <div className="symptomcards">
            {!isLoading && symptoms.length === 0 ? (
              <p className="--py">No symptoms added. Please add a symptom.</p>
            ) : (
              <>
                {symptoms.map((symptom, index) => {
                  return (
                    <>
                      <div className="symptomcard">
                        <Symptom
                          key={index}
                          symptom={symptom}
                          bodyPart={symptom.bodyPart}
                          index={index}
                          deleteSymptom={deleteOneSymptom}
                          updateSymptom={updateOneSymptom}
                          intensity={symptom.intensity}
                          onChange={(value) => this.changeHandler(value)}
                          name={symptom.name}
                          handleInputChange={handleInputChange}
                          getSingleSymptom={getSingleSymptom}
                        />
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

export default AddSymptoms;
