import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../Component/service/loginServices";

const initialState = {
  token: "",
};
export const createlogin = createAsyncThunk(
  "login/create",
  async ({email,password}) => {
    const res = await loginService.create({email,password});
   sessionStorage.setItem("token",res.data)
    console.log(res.data);
    return res.data;
  }
);


export const loginSlice = createSlice({
  name: "logins",
  initialState,
reducers:{
  loadLogin: (state)=>{
    console.log('******');
    state.token = sessionStorage.getItem("token");

  }
},
extraReducers: {
    [createlogin.fulfilled]: (state, action) => {
      state.token = action.payload;
     
    },
}
});
export const {loadLogin} =loginSlice.actions;
export default loginSlice.reducer;

