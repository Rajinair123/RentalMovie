import React ,{useEffect} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
//import {createRentals,updateRentals} from "../../resources/rental/rentalSlice"
import { retrieveCustomers } from "../../resources/customer/customerSlice";
import { retrieveMovies } from "../../resources/movie/movieSlice";
import { createRentals } from "../../resources/rental/rentalSlice";

const schema = yup.object().shape({
  customerId : yup.string().required(),
  movieId :yup.string().required(),
});

function RentalForm () {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm({ resolver: yupResolver(schema) });
      const movies = useSelector((state)=> state.movieReducer.movies);
    const customers = useSelector((state)=> state.customerReducer.customers);
    const rentals = useSelector((state)=> state.rentalReducer.rentals);
      
    useEffect(()=>{
      dispatch(retrieveCustomers());
      dispatch(retrieveMovies());
      const rentalId = params.rentalId;
      if(!rentalId) return;
      const rental = rentals.find(r => r._id === params.rentalId);
       if(!rental)return;
          setValue("customerId",rental.customer._id);
          setValue("movieId",rental.movie._id);
          
        }, []);
        const onSubmitHandler = (data)=>{
          console.log(data)
        {
          dispatch(createRentals(data))
        }
  


        navigate("/rental");
        };

 return (
  <div className="flex items-center  justify-center min-h-screen bg-gray-100">
  <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg">

<form onSubmit={handleSubmit (onSubmitHandler)}>
<h2 className="text-2xl font-bold text-cente"> MANAGE RENTALS</h2>
<br />
       <select className="w-full px-4 py-2 mt-2 border rounded-md
       focus:outline-none focus:ring-1 focus:ring-blue-600"
       {...register("customerId")}
         
        >
            <option value="" disabled selected> select customer</option>
         {customers.map((c)=>(
     <option  key={c._id} value={c._id}> {c.name}</option>
     
 ))}
</select>
<select className="w-full px-4 py-2 mt-2 border rounded-md
       focus:outline-none focus:ring-1 focus:ring-blue-600"
       {...register("movieId")}
         
        >
            <option value="" disabled selected> select Movie</option>
         {movies.map((m)=>(
     <option  key={m._id} value={m._id}> {m.title}</option>
     
 ))}
</select>
<div className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
       <button type="submit">Add Rental</button>

       
</div>
  
</form>
     </div>
     </div>
);
                }            

 



export default RentalForm;