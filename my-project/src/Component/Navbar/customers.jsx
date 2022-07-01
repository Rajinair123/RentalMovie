import React ,{ useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteCustomer, retrieveCustomers,getCount, getCustomers}
 from "../../resources/customer/customerSlice";
import {Link} from "react-router-dom";
import Pagination from "./pagination";
const Customers = () =>{
    
    const customers = useSelector((state)=>state.customerReducer.customers);
    const Count = useSelector((state)=>state.customerReducer.customersCount)
    const dispatch =useDispatch();

    const[currentPage,setCurrentapage]=useState(1);
    const [pageSize,setPageSize]= useState(3);


    useEffect(() => {
        dispatch(getCustomers({currentPage:currentPage,pageSize:pageSize}))
        dispatch(getCount())
      }, []);

      const handleChange = (page) =>{
        setCurrentapage(page);
        dispatch(getCustomers({ currentPage: currentPage, pageSize: pageSize}))
    }
    const handleDelete=(id)=>{
        setCurrentapage(1)
        dispatch(deleteCustomer(id))
    }


    return (
   <div className="flex-col  flex items-center  ">
    <h2 className="text-black-500  font-bold  font-serif text-center text-3xl m-2 ">Customers</h2>
   <table className="shadow-lg white justify-center table-fixed">
       <thead>
           <th className="bg-blue-100 border text-left px-2 py-4 ">Name</th>
           <th className="bg-blue-100 border text-left px-2 py-4 ">Phone</th>
           <th className="bg-blue-100 border text-left px-2 py-4 ">isGold</th>
           <th className="bg-blue-100 border text-left px-2 py-4 ">Delete</th>
          
          
        <th></th>
       </thead>
       <tbody>
           {customers.map((c)=>(
               <tr key={c._id}>
                   <td className="border px-2 py-4">
                       <Link to={`/customerForm/${c._id}`}>{c.name}</Link></td>
                   <td className="border px-2 py-4">{c.phoneNo}</td>
                   <td className="border px-2 py-4">{c.isGold?"true":"false"}</td>

                   <td className="border px-2 py-4">
                       <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                       onClick={()=> dispatch(handleDelete(c._id))}>Delete</button>
                   </td>
               </tr>
           ))}
       </tbody>
   </table>
   <Link to ="/customerForm/new"><button className="text-white bg-gradient-to-r m-10 from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
       +</button></Link>
    

   <Pagination
    count ={Count}
    pageSize={pageSize}
    currentPage={currentPage}
    onPageChange={handleChange}
    /> 

    </div>

    );

}
    
  export default Customers;
