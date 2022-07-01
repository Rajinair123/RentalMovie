import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../../Component/service/registerService";

const initialState = {
  isRegister: false,
};
export const createregister = createAsyncThunk(
  "users/create",
  async ({ name, email,password }) => {
    const res = await registerService.create({ name,email,password });
    return res.data;
  }
);


export const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    [createregister.fulfilled]: (state, action) => {
      state.isRegister=true;
    },
}
});

export const { reducer } = registerSlice;
export default reducer;
