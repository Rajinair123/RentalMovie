import {Link,Outlet} from "react-router-dom"
import './App.css';
import Navbar from "./Component/Navbar/Navbar"
import { loadLogin } from "./resources/login/loginSlice";
import {useEffect} from "react"
import {useDispatch} from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadLogin());
  },[dispatch]) ;
  
  return (
      <div >
        <Navbar/>

      </div>
  
  );
}

export default App;
