import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import App from './App';
import Movies from "./Component/Navbar/movies";
import Login from "./Component/Navbar/login";
import Rental from "./Component/Navbar/rental";
import Genres from "./Component/Navbar/genres";
import Register from "./Component/Navbar/Register";
import Customers from "./Component/Navbar/customers";
import Genreform from "./Component/Navbar/genreForm"
import Customerform from './Component/Navbar/customerForm';
import MovieForm from './Component/Navbar/movieForm'
import RentalForm from './Component/Navbar/rentalForm';

import { Provider } from 'react-redux';
import {store} from './store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} >
    <Route path="customers" element={<Customers />} />
    <Route path="customerForm/:customerId" element={<Customerform />} />
    <Route path="genres" element={<Genres />} />
    <Route path="movies" element={<Movies />} />
    <Route path="login" element={<Login />} />
    <Route path="Register" element={<Register />} />
    <Route path="rental" element={<Rental />} />
    <Route path="genreForm/:genreId" element={<Genreform />} />
    <Route path="genreForm/new" element={<Genreform />} />
 <Route path="customerForm" element={<Customerform />} />
 <Route path="movieForm/:movieId" element={<MovieForm />} />
 <Route path="movieForm/new" element={<MovieForm />} />
 <Route path="rentalForm/new" element={<RentalForm />} />
 <Route path="rentalForm/:rentalId" element={<RentalForm />} />
 
 
 </Route>
 

  </Routes>
</BrowserRouter>
</Provider>
);

