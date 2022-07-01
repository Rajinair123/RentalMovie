import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector, } from "react-redux";
import {createGenre,updateGenre} from "../../resources/genre/genreSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";



const GenreForm = () => {
  const params = useParams();
  const genres = useSelector((state) => state.genreReducer.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().min(3).max(10).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  
  const onSubmitHandler = (data) => {
    if (!data._id) {
      data._id = nanoid();
      dispatch(createGenre(data));
    } else {
      dispatch(updateGenre(data));
    }
    navigate("/genres");
  };
  useEffect(() => {
    const genreId = params.genreId;
    if (!genreId) return;
    const genre = genres.find((g) => g._id === params.genreId);
    if (!genre) return;
    setValue("name", genre.name);
   
  }, []);

return (

   <div className="flex items-center  justify-center min-h-screen bg-gray-100">
     <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg">

  <form onSubmit={handleSubmit (onSubmitHandler)}>
  <h2 className="text-2xl font-bold text-cente">Add new Genre</h2>
  <br />

  <div class="mt-6  m-7">
    <label class="block">Name</label>
  
  <input
    {...register("name")}
    placeholder class="name password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
    type="name"
    required
  />
  <p>{errors.name?.message}</p>
  </div>
  <br />
  

  <div className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
  <button type="submit">Add Genre</button>
  </div>
</form>
</div>
</div>
);

};

export default GenreForm;