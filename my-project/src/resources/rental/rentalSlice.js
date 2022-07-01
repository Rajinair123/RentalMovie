import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import rentalServices from "../../Component/service/rentalServices";
const initialState={
    rentals :[],
    count: "",
};
export const createRentals = createAsyncThunk(
    "rentals/create",
    async(data)=>{
        const res = await rentalServices.create(data);
        return res.data
    }
);
export const retrieveRentals = createAsyncThunk(
    "rentals/retrieve",
    async() =>{
        const res = await rentalServices.getAll()
        return res.data
    }
);


export const getRentals = createAsyncThunk("rentals/pfs",
async(data)=>{
    const res = await rentalServices.pfs(data)
    return res.data
})


export const getCount = createAsyncThunk("rentals/count",
async()=>{
    const res = await rentalServices.getCount()
    return res.data
})



export const rentalPatch = createAsyncThunk("rentals/patch",
async({_id, ...dateIn})=>{
    const res = await rentalServices.patch(_id,dateIn);
 
    return res.data;
}

);

export const deleteRentals = createAsyncThunk("rentals/delete", 
async (id) => {
 //const token = thunkAPI.getState().loginReducer.token;
  const res = await rentalServices.remove(id);
  if (res.data){
      const response = await rentalServices.pfs({
       currentPage :1,
       pageSize :3
  
    })
    return response.data
  }

});

export const rentalSlice = createSlice({
    name :'rentals',
    initialState,


    extraReducers:{
        [createRentals.fulfilled]:(state,action)=>{
        state.rentals.push(action.payload)
    },
    [retrieveRentals.fulfilled]:(state,action)=>{
        return {rentals:[...action.payload]}
    },



    [getRentals.fulfilled]:(state,action)=>{
        state.rentals = [...action.payload]

    },

   [getCount.fulfilled]:(state,action)=>{
       state.rentalsCount = action.payload.rentalsCount

   },

    
    [rentalPatch.fulfilled]:(state,action)=>{
    let index = state.rentals.findIndex(
        (rental)=> rental._id === action.payload._id
    );
    state.rentals.splice(index,1,action.payload);

    },
    [deleteRentals.fulfilled]:(state,action)=>{
        // let index = state.rentals.findIndex(
        //     (rental) => rental._id === action.payload._id
        //   );
        //   state.rentals.splice(index, 1)
        state.rentals = action.payload
    },
},
});
export const {reducer}= rentalSlice;
export default reducer;