/*
  =========================================================
  * ZINOTRUST ACADEMY 
  =========================================================
  * Email: zinotrust@gmail.com
  * Copyright 2021 AKPAREVA EWOMAZINO
  * 
  =========================================================
  * This code was reviewed and changed by Nataliia Azarnykh
  * for non-commercials study purposes
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import emailService from "./emailService";

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: "",
};

// Send Automated Email
export const sendAutomatedEmail = createAsyncThunk(
  "email/sendAutomatedEmail",
  async (userData, thunkAPI) => {
    try {
      return await emailService.sendAutomatedEmail(userData);
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

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSent = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // sendAutomated email
      .addCase(sendAutomatedEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = true;
        state.emailSent = true;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendAutomatedEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.msg = action.payload;
        toast.success(action.payload);
      });
  },
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
