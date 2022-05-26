import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, toast, navigate }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Signed In Successfully.");
      navigate("/");
      return response.data;
      //   console.log(formValue);
    } catch (error) {
      console.log(error);
    }
  }
);

const INITIAL_STATE = {
  user: null,
  error: "",
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
