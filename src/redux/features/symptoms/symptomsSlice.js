import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import symptomsService from "./symptomsService";

const initialState = {
  isLoggedIn: false,
  user: null,
  symptoms: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isVerified: false,
  message: "",
};

export const getSymptomsWithDate = createAsyncThunk(
  "symptoms/getSymptomsWithDate",
  async (date, thunkAPI) => {
    try {
      const response = await symptomsService.getSymptomsWithDate(date);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSymptoms = createAsyncThunk(
  "symptoms/getSymptoms",
  async (_, thunkAPI) => {
    try {
      const response = await symptomsService.getSymptoms();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSymptomsToday = createAsyncThunk(
  "symptoms/getSymptomsToday",
  async (_, thunkAPI) => {
    try {
      const response = await symptomsService.getSymptomsToday();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSymptomsByName = createAsyncThunk(
  "symptoms/name",
  async (name, thunkAPI) => {
    try {
      const response = await symptomsService.getSymptomsByName(name);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSymptomsByBodyPart = createAsyncThunk(
  "symptoms/bodyPart",
  async (bodyPart, thunkAPI) => {
    try {
      const response = await symptomsService.getSymptomsByBodyPart(bodyPart);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSymptomsByDateRange = createAsyncThunk(
  "symptoms/getSymptomsByDateRange",
  async ({ endDate, startDate }, thunkAPI) => {
    try {
      const response = await symptomsService.responseGetSymptomsByDateRange({
        endDate,
        startDate,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSymptom = createAsyncThunk(
  "symptoms/deleteSymptom",
  async (id, thunkAPI) => {
    try {
      const response = await symptomsService.deleteSymptom(id);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSymptom = createAsyncThunk(
  "symptoms/createSymptom",
  async (formData, thunkAPI) => {
    try {
      const response = await symptomsService.createSymptom(formData);
      console.log("createSymptom", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSymptom = createAsyncThunk(
  "symptoms/updateSymptom",
  async (id, formData, thunkAPI) => {
    try {
      const response = await symptomsService.updateSymptom(id, formData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const symptomsSlice = createSlice({
  name: "symptoms",
  initialState,
  reducers: {
    RESET(state) {
      state.twoFactor = false;
      state.symptoms = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSymptomsWithDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptomsWithDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptomsWithDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSymptomsByDateRange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptomsByDateRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptomsByDateRange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSymptoms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSymptomsByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptomsByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptomsByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSymptomsByBodyPart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptomsByBodyPart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptomsByBodyPart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createSymptom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSymptom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(createSymptom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateSymptom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSymptom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(updateSymptom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSymptomsToday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSymptomsToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.symptoms = action.payload;
      })
      .addCase(getSymptomsToday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});
export const { RESET } = symptomsSlice.actions;

export default symptomsSlice.reducer;
