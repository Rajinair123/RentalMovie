import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customerService from "../../Component/service/customerService";

const initialState = {
  customers: [],
  count : "",
};
export const createCustomer = createAsyncThunk(
  "customers/create",
  async ({ name,phoneNo,isGold },thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token
    const res = await customerService.create({ name,phoneNo,isGold },token);
    return res.data;
  }
);
export const retrieveCustomers = createAsyncThunk("customers/retrieve", async () => {
 const res = await customerService.getAll();
  return res.data;
});
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ _id, name,phoneNo,isGold},thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token
    const res = await customerService.update(_id, { name,phoneNo,isGold },token);
    return res.data;
  }
);
export const deleteCustomer = createAsyncThunk("customers/delete", async (id,thunkAPI) => {
  console.log("delete customer");
 const token = thunkAPI.getState().loginReducer.token;
  const res = await customerService.remove(id,token);
  if(res.data){
    const response = await customerService.pfs({
      currentPage :1,
      pageSize :3
    });
  
  return response.data;
  }
});

export const getCustomers = createAsyncThunk("customers/pfs",async(data)=>{
  const res = await customerService.pfs(data)
  return res.data
});
export const getCount = createAsyncThunk("customers/count",async()=>{
  const res = await customerService.getCount()
  return res.data
})


export const customerSlice = createSlice({
  name: "customers",
initialState,
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.customers.push(action.payload);
    },
    [retrieveCustomers.fulfilled]: (state, action) => {
      return { customers: [...action.payload] };
    },
    [updateCustomer.fulfilled]: (state, action) => {
      const index = state.customers.findIndex((customer) => customer._id === action.payload.id);
      state.customers.splice(index,1,action.payload)
    },

   [getCustomers.fulfilled]:(state,action)=>{
     state.customers = [...action.payload]
   },
   [getCount.fulfilled]:(state,action)=>{
     state.customersCount = action.payload.customersCount
   },



    [deleteCustomer.fulfilled]: (state, action) => {
      // let index = state.customers.findIndex(
      //   (customer) => customer._id === action.payload._id
      // );
      // state.customers.splice(index, 1);
      state.customers = action.payload;
    },
  },
});

export const { reducer } = customerSlice;
export default reducer;
