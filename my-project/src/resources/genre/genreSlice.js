
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import genreService from "../../Component/service/genreServices";

const initialState = {
  genres: [],
  count : "",
  
};
export const createGenre = createAsyncThunk(
  "genres/create",
  async ({ name }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token
    const res = await genreService.create({ name },token);
    console.log(res.data)
    return res.data;
  }
);
export const retrieveGenres = createAsyncThunk("genres/retrieve", async () => {
  const res = await genreService.getAll();
  return res.data;
});
export const updateGenre = createAsyncThunk(
  "genres/update",
  async ({ _id, name },thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    console.log(token)
    const res = await genreService.update(_id, { name },token);
    //console.log(res.data)
    return res.data;
  }
);
export const deleteGenre = createAsyncThunk("genres/delete", async (id,thunkAPI) => {
  const token = thunkAPI.getState().loginReducer.token;
  console.log(token)
  const res = await genreService.remove(id,token);
  if(res.data)
  {
    const response = await genreService.pfs({
      currentPage : 1,
     pageSize :3 
  });
  return response.data;
  }
});

export const getGenres = createAsyncThunk("genres/pfs",async(data)=>{
  const res = await genreService.pfs(data)
  return res.data
})

export const getCount = createAsyncThunk("genres/count",async()=>{
  const res = await genreService.getCount()
  console.log("get count response dta",res.data);
  return res.data
})



export const genreSlice = createSlice({
  name: "genres",
  initialState,
  extraReducers: {
    [createGenre.fulfilled]: (state, action) => {
      state.genres.push(action.payload);
    },
    [retrieveGenres.fulfilled]: (state, action) => {
      console.log("action in retrieveGenres", action);
      
      return { genres: [...action.payload] };
    },
   [getGenres.fulfilled]:(state,action)=>{
     state.genres = [...action.payload];
   },
   [getCount.fulfilled]:(state,action)=>{
     state.genresCount = action.payload.genresCount
   },


    [updateGenre.fulfilled]: (state, action) => {
      const index = state.findIndex((genre) => genre._id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteGenre.fulfilled]: (state, action) => {
      // let index = state.genres.findIndex(
      //   (genre) => genre._id === action.payload._id
      // );
      // state.genres.splice(index, 1);
      state.genres = action.payload;
    },
  },
});

export const { reducer } = genreSlice;
export default reducer;
