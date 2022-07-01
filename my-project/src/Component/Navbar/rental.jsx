import React ,{useEffect, useState}from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveRentals,deleteRentals, rentalPatch, getRentals,getCount } from "../../resources/rental/rentalSlice";
import Pagination from "./pagination";

const Rental=()=>{
  const rentals = useSelector((state)=>state.rentalReducer.rentals);
  const Count = useSelector((state)=>state.rentalReducer.rentalsCount);
  const dispatch = useDispatch();
  const[currentPage, setCurrentapage]= useState(1);
  const[pageSize,setPageSize]= useState(3);

  
  useEffect(()=>{
    dispatch(getCount());
     //dispatch(retrieveRentals())
    dispatch(getRentals({currentPage:currentPage,pageSize:pageSize}));
    
  },[])

  const handleChange = (page) =>{
    setCurrentapage(page);
    dispatch(getRentals({ currentPage: currentPage, pageSize: pageSize}))
}
const handleDelete = (id)=>{
    setCurrentapage(1)
    dispatch(deleteRentals(id))

}



 return(

  <div className="flex-col  flex items-center justify-center m-auto mb-20">
 
 <table className="shadow-lg white mb-20 w-80 ">
     <thead>
         <th className="bg-blue-100 border text-left px-8 py-4 ">Customer</th>
         <th className="bg-blue-100 border text-left px-8 py-4 ">Movies</th>
         <th className="bg-blue-100 border text-left px-8 py-4 ">DateIn</th>
         <th className="bg-blue-100 border text-left px-8 py-4 ">DateOut</th>
         <th className="bg-blue-100 border text-left px-8 py-4 ">RentalFee</th>
         <th className="bg-blue-100 border text-left px-2 py-4 ">Delete</th>
      
     </thead>
     <tbody>
         {rentals.map((r)=>(
             <tr key={r._id}>
                 <td className="border px-8 py-4">
                 <Link to={`/rentalForm/${r._id}`}>{r.customer.name}</Link>
                     </td>
                     <td className="border px-8 py-4">
                 {r.movie.title}
                 
                     </td>
                     <td className="border px-8 py-4">
                 {r.dateIn}
                     </td><td className="border px-8 py-4">
                 {r.dateOut}
                     </td><td className="border px-8 py-4">
                 {r.rentalFee}
                     </td>
                     <td className="border px-8 py-4">
                       <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                       onClick={()=>dispatch(handleDelete(r._id))}>Delete</button>
                   </td>
                   <td className="border px-8 py-4">
                       <button className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-red-700 dark:focus:ring-yellow-900"
                       onClick={()=>
                    dispatch(
                        rentalPatch({
                            _id:r._id,
                            dateIn: new Date().getTime(),
                        })
                    )
                    } 
                       >Return</button>
                   </td>
                  </tr>
         ))}
         
     </tbody>
 </table>
 <Link to ="/rentalForm/new"><button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">+</button></Link>

 <Pagination
 count = { Count}
 currentPage={currentPage}
 pageSize={pageSize}
 onPageChange={handleChange}
 />

</div>

 )

}
export default Rental;