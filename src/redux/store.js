import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import emailReducer from "../redux/features/email/emailSlice";
import symptomsReducer from "../redux/features/symptoms/symptomsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    symptoms: symptomsReducer,
  },
});
