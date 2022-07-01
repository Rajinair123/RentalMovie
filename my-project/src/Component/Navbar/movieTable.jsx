import  React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovies } from '../../resources/movie/movieSlice';
import TableHeader from './tableHeader';


const MovieTable = (props)=>{
 const {movies,onSort,sortColumn,onDelete} = props;
 const dispatch = useDispatch();

 const columns=[
{path:"title",header:"Title"},
 {path:"genre.name",header:"Genre"},
 {path:"numberInStock",header:"NumberInStock"},
 {path:"dailyRentalRate",header:"dailyRentalRate"},
 {key:"liked"},
 {key:"delete"}

 ];
  return(
    <table className="shadow-lg white justify-center table-fixed">

        <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn}
         onDelete = {onDelete}
        />
   
 <tbody>
    
        {movies.map((m)=>(
            <tr key={m._id}>
                <td className="border px-2 py-4">
                    <Link to={`/movieForm/${m._id}`}>{m.title}</Link></td>
                <td className="border px-2 py-4">{m.genre.name}</td>
                <td className="border px-2 py-4">{m.numberInStock}</td>
                <td className="border px-2 py-4">{m.dailyRentalRate}</td>
                <td className="border px-2 py-4">{m.liked}
               {m.liked ?(
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                 </svg>
               ):(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>)} 
             </td>

                <td className="border px-2 py-4">
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                  onClick={()=>dispatch(onDelete(m._id))}> Delete</button>
                </td>

            </tr>
        ))}
       
    </tbody>
</table>





  )





}
 export default MovieTable