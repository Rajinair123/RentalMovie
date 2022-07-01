import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteGenre, getGenres, retrieveGenres,getCount } from "../../resources/genre/genreSlice";
import {Link} from "react-router-dom";
import Pagination from "./pagination";
const Genres = () =>{
    const genres = useSelector((state)=>state.genreReducer.genres);
    const Count = useSelector((state)=>state.genreReducer.genresCount)
   // console.log("total genrescount",)
    const dispatch =useDispatch();
 
    const [currentPage,setCurrentapage]=useState(1);
    const [pageSize,setPageSize] = useState(3);

     useEffect(() => {
        dispatch(getCount());
        dispatch(getGenres({currentPage:currentPage,pageSize:pageSize}))
        //dispatch(retrieveGenres());
      }, []);

     const handleChange = (page) =>{
          setCurrentapage(page);
          dispatch(getGenres({ currentPage: currentPage, pageSize: pageSize}))
      }
      
    const handleDelete=(id)=>{
        setCurrentapage(1);
        dispatch(deleteGenre(id));
      }


    return (
   <div className="flex-col  flex items-center justify-center m-auto mb-20">
    <h2 className="text-black-500  font-bold  font-serif text-center text-3xl m-10 ">Genres</h2>
   <table className="shadow-lg white mb-20 w-80 ">
       <thead>
           <th className="bg-blue-100 border text-left px-8 py-4 ">Name</th>
           <th className="bg-blue-100 border text-left px-8 py-4 ">Delete</th>
        <th></th>
       </thead>
       <tbody>
           {genres.map((g)=>(
               <tr key={g._id}>
                   <td className="border px-8 py-4">
                   <Link to={`/genreForm/${g._id}`}>{g.name}</Link>
                       </td>
                   <td className="border px-8 py-4">
                       <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                       onClick={()=>dispatch(handleDelete(g._id))}>Delete</button>
                   </td>
               </tr>
           ))}
       </tbody>
   </table>
   <Link to ="/genreForm/new"><button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-15">+</button></Link>
  
   <Pagination
    count ={Count}
    pageSize={pageSize}
    currentPage={currentPage}
    onPageChange={handleChange}
    /> 

   

</div>

    
   
    );

}
    
  export default Genres;
