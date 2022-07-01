import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createregister } from "../../resources/register/registerSlice";

const schema = yup.object().shape({
  name : yup.string().min(5).max(50).required(),
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(5).max(255).required(),
  
  isAdmin: yup.boolean().required()
});


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
const { register, handleSubmit, formState: { errors }, reset } = useForm({
  resolver: yupResolver(schema),
});

const onSubmitHandler = (data) => {
  console.log('here');
  console.log(data);
    dispatch(createregister(data));

  navigate("/login");
};
return (
  <div className ="flex flex-col items-center  justify-center min-h-screen  bg-gray-100">
    <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg ">
  <form onSubmit={handleSubmit(onSubmitHandler)}>
  <h2 className="text-2xl font-bold text-center">Lets Register in.</h2>
  <br />
  
  <div class="mt-6  m-7">
    <label class="block">Name</label>
  <input {...register("name")}  class="name password w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 " type="name" required />
  <br />
  <p>{errors.name?.message}</p><br />
  </div>


  <div class="mt-6  m-7">
    <label class="block">Email</label>
  <input {...register("email")}  class ="email password w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="email" required />
  <br />
  <p>{errors.email?.message}</p><br />
  </div>



  <div class="mt-6  m-7">
    <label class="block">Password</label>
  <input
    {...register("password")}
     class ="password password w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
    type="password"
    required
  />
<br/>
<p>{errors.password?.message}</p><br />
</div>

<div className="mb-20">
  <input
  {...register("isAdmin")} type ="checkbox" />isAdmin<br />
  <br />
  
  <div className="px-2 py-2   text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
  <button type="submit">Register</button>
  </div>
  </div>
</form>
</div>
</div>
);

};

export default Register;