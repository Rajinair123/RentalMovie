import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "../../Component/service/movieServices";

const initialState = {
  movies: [],
  count : "",
  error :"",
};
export const createMovies = createAsyncThunk(
  "movies/create",
  async ( data , thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token
    const res = await movieService.create(data,token);
    return res.data;
  }
);
export const retrieveMovies = createAsyncThunk("movies/retrieve", async () => {
  const res = await movieService.getAll();
  return res.data;
});


export const getMovies = createAsyncThunk("movies/pfs",async(data) =>{
  const res = await movieService.pfs(data)
  console.log("This is getmovies",res.data);
  return res.data;
  
})


export const getCount =createAsyncThunk("movies/count",async(data)=>{
  const res = await movieService.getCount(data.gName,data.title);
  return res.data;
})





export const updateMovies= createAsyncThunk(
  "movies/update",  
  async ( {_id, ...data} ,thunkAPI) => {
     const token = thunkAPI.getState().loginReducer.token;
     console.log("before");

   
  const res = await movieService.update(_id,data,token);
    console.log("after");

    console.log("This is update data",res.data);
    return res.data;
  }
);
export const deleteMovies = createAsyncThunk("movies/delete", 
async (id,thunkAPI) => {
 const token = thunkAPI.getState().loginReducer.token;
  const res = await movieService.remove(id,token);
   if(res.data)
   {
     const response = await movieService.pfs({
       currentPage : 1,
      pageSize :3
     });
    
   return response.data;
   }
});

export const movieSlice = createSlice({
  name: "movies",
initialState,
  extraReducers: {
    [createMovies.fulfilled]: (state, action) => {
      state.movies.push(action.payload);
    },
    [createMovies.rejected]: (state, action) => {
      state.error ="something failed"
    },
    [retrieveMovies.fulfilled]: (state, action) => {
      return { movies: [...action.payload] };
    },
    [getMovies.fulfilled]: (state, action) => {
      state.movies= [...action.payload];
      
    },
    [getCount.fulfilled]: (state, action) => {
      state.moviesCount = action.payload.moviesCount;
    },
    [updateMovies.fulfilled]: (state, action) => {
      const index = state.movies.findIndex((movie) => movie._id === action.payload.id);
      state.movies.splice(index,1,action.payload)
     
    },
    [deleteMovies.rejected]: (state, action) => {
      state.error = "something failed";
    },
    [deleteMovies.fulfilled]: (state, action) => {
      // let index = state.movies.findIndex(
      //   (movie) => movie._id === action.payload._id
      // );
      //  state.movies.splice(index, 1)
      state.movies = action.payload;
    },

   },
});

export const { reducer } = movieSlice;
export default reducer;