import { configureStore } from "@reduxjs/toolkit";
import genreReducer from './resources/genre/genreSlice'
import customerReducer from './resources/customer/customerSlice'
import registerReducer from './resources/register/registerSlice'
import loginReducer from './resources/login/loginSlice'
import movieReducer from  './resources/movie/movieSlice'
import rentalReducer from './resources/rental/rentalSlice'
export const store = configureStore ({
    reducer: {
        genreReducer,customerReducer,registerReducer,loginReducer,movieReducer,rentalReducer,
    },
    devTools:true,
  })