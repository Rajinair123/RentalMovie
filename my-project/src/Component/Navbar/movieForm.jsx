import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import  {getGenres}  from "../../Component/service/genres";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateMovies,createMovies} from "../../resources/movie/movieSlice";



const schema = yup.object().shape({
  title:yup.string().min(5).max(255).required(),
  dailyRentalRate: yup.number().min(0).max(255).required(),
  numberInStock: yup.number().min(0).max(255).required(),
  liked : yup.boolean(),
  genreId:yup.string().required()
 });


const MovieForm= () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch();
 const params = useParams();
  console.log(params.movieId);

  
  const { register, handleSubmit, formState: { errors }, setValue} = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmitHandler = (data) => {
        console.log({ data });
        data._id
          ? dispatch(updateMovies(data))
          : dispatch(createMovies(data))
    

         navigate('/movies')
    };


    const movies = useSelector((state)=> state.movieReducer.movies);
    const genres = useSelector((state)=> state.genreReducer.genres);
    
    useEffect(()=>{
    const movieId = params.movieId;
    if(!movieId) return;
    const movie = movies.find(m => m._id === params.movieId);
     if(!movie)return;
        setValue("title",movie.title);
        setValue("_id",movie._id);
        setValue("numberInStock",movie.numberInStock);
        setValue("dailyRentalRate",movie.dailyRentalRate)
        setValue("genreId",movie.genre._id);
        setValue("liked",movie.liked)
      }, []);

      return (

        <div className="flex items-center  justify-center min-h-screen">
          <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg">
     
       <form onSubmit={handleSubmit (onSubmitHandler)}>
       <h2 className="text-2xl font-bold text-cente">Manage Movie</h2>
       <br />
     
       <div class="mt-6  m-7">
         <label class="block">Title</label>
       
       <input
         {...register("title")}
         placeholder class="name password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
         type="title"
         required
       />
       <p>{errors.title?.message}</p>
       </div>
       <br />
       
    <div class="mt-6  m-7">
         <label class="block">Number In Stock</label>
       <input {...register("numberInStock")} placeholder class ="email password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="number" required />
       <p>{errors.numberInStock?.message}</p>
       <br />
       </div>
     
     
     
       <div class="mt-6  m-7">
         <label class="block">Daily Rental Rate</label>
       <input
         {...register("dailyRentalRate")}
         placeholder class ="password password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
         type="number"
         required
       />
       <p>{errors.dailyRentalRate?.message}</p>
     <br/>
     <div >
             <input
         {...register("liked")}
        type = "checkbox"
         
       />Like
       </div>

     <br />
     <select className="w-full px-4 py-2 mt-2 border rounded-md
              focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register("genreId")}
                
               >
                   <option value="" disabled selected> select genre</option>
                {genres.map((g)=>(
            <option  key={g._id} value={g._id}> {g.name}</option>
            
        ))}
       </select>
             
          {/* <p> {errors.title?.message}</p> */}

           
    <div className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
       <button type="submit">Add Movie</button>
       
       </div>
       </div>
     </form>
     </div>
     <br />
     
     </div>
      
     );
     

     };
     
     
     export default MovieForm
    
