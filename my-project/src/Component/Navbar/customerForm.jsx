import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomer,updateCustomer } from "../../resources/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";


const schema = yup.object().shape({
  name:yup.string().min(3).max(20).required(),
  phoneNo:yup.string().required(),
  isGold:yup.boolean()
});
function CustomerForm(){
  const params = useParams();
  const {register,handleSubmit,formState:{errors},setValue} 
  =useForm({
      resolver:yupResolver(schema),
  });
  
  const customers = useSelector((state)=> state.customerReducer.customers)


  useEffect(()=>{
      const customerId = params.customerId;
      if(!customerId) return;
      const customer = customers.find(c=>c._id === params.customerId)
      if(!customer) return;
      setValue("name",customer.name);
      setValue("phoneNo",customer.phoneNo);
      setValue("_id",customer._id);
      setValue("isGold",customer.isGold)
  },[])
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const onSubmitHandler = (data) =>{
    console.log("this is customer id",data._id);
    if(!data._id){
      console.log("called create");
      dispatch(createCustomer(data))
    }else{
      console.log("called update");
      dispatch(updateCustomer(data))
    }
      navigate('/customers');

    };



return (

   <div className="flex items-center  justify-center min-h-screen bg-gray-100">
     <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg">

  <form onSubmit={handleSubmit(onSubmitHandler)}>
  <h2 className="text-2xl font-bold text-cente">Add new Customer</h2>
  <br />

  <div class="mt-6  m-7">
    <label class="block">Name</label>
  
  <input
    {...register("name")}
    placeholder class="name password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
    type="name"
    required
  />
  </div>
  <br />
  <p>{errors.name?.message}</p>
<div class="mt-6  m-7">
    <label class="block">Phone</label>
  <input
    {...register("phoneNo")}
    placeholder class =" w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
    type="phone"
    required
  />
<br/>
<p>{errors.phoneNo?.message}</p><br />
</div>

<input  {...register("isGold")} type ="checkbox" />isGold<br />

  <br />


  <div className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
  <button type="submit">Manage Customer</button>
  </div>
</form>
</div>
</div>
);

};

export default CustomerForm