import {
  responseGetSymptoms,
  responseGetSymptomsByDateRange,
  responseGetSymptomsByName,
  responseGetSymptomsWithDate,
  responseGetSymptomsByBodyPart,
  responseDeleteSymptom,
  responseCreateSymptom,
  responseUpdateSymptom,
  responseGetSymptomsToday,
} from "../../api/api";

const getSymptomsWithDate = async (date) => {
  const response = await responseGetSymptomsWithDate(date);
  return response;
};

const getSymptoms = async () => {
  const response = await responseGetSymptoms();
  return response;
};

const getSymptomsByName = async (value) => {
  const response = await responseGetSymptomsByName(value);
  return response;
};

const getSymptomsByDateRange = async (endDate, startDate) => {
  const response = await responseGetSymptomsByDateRange({ endDate, startDate });
  return response;
};

const getSymptomsByBodyPart = async (value) => {
  const response = await responseGetSymptomsByBodyPart(value);
  return response;
};

const getSymptomsToday = async () => {
  const response = await responseGetSymptomsToday();
  return response;
};

const deleteSymptom = async (id) => {
  const response = await responseDeleteSymptom(id);
  return response;
};

const createSymptom = async (formData) => {
  const response = await responseCreateSymptom(formData);
  return response;
};

const updateSymptom = async (id, formData) => {
  const response = await responseUpdateSymptom(id, formData);
  return response;
};

const symptomsService = {
  getSymptomsWithDate,
  getSymptoms,
  getSymptomsByName,
  getSymptomsByDateRange,
  getSymptomsByBodyPart,
  deleteSymptom,
  createSymptom,
  updateSymptom,
  getSymptomsToday,
};

export default symptomsService;
