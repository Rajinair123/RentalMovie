import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createlogin } from "../../resources/login/loginSlice";



const schema = yup.object().shape({ 
  email: yup.string().email().required(),
  password: yup.string().min(5).max(32).required(),
});

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
const { register, handleSubmit, formState: { errors },  } = useForm({
  resolver: yupResolver(schema),
});
const onSubmitHandler = (data) => {
  console.log({ data });
  dispatch(createlogin({
  email: data.email,
  password: data.password,
  
}));
navigate('/genres')
}
return (
  <div className ="flex flex-col items-center  justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mb-12 text-left bg-white shadow-lg">
  <form onSubmit={handleSubmit (onSubmitHandler)}>
  <h2 className="text-2xl font-bold text-center">Lets sign you in.</h2>
  <br />
  <div class="mt-6  m-7">
    <label class="block">Email</label>
  <input {...register("email")} placeholder class="email w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="email" required />
  <br />
</div>
<div class="mt-6  m-7">
    <label class="block m-2">Password</label>
  <input
    {...register("password")}
    placeholder class="password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="password" 
    required
  />
  </div>
  <br />
  <p>{errors.password?.message}</p>
    <div className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900 text-center">
  <button type="submit">Sign in</button>
  </div>
</form>
</div>
</div>
);

};

export default Login;