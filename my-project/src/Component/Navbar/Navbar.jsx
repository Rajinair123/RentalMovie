import {Link,Outlet} from "react-router-dom"



function Navbar() {
  return (
    <div>
     <nav className=" flex items-center justify-between flex-wrap bg-teal-500 p-6 m-3  px-2 py-3">
  <div className="flex items-center flex-shrink-0 text-white mr-6 container  flex-wrap justify-between  mx-auto">
 <span class="font-semibold text-xl tracking-tight m-4">Movie Rental</span>
    
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto  space-x-10 mr-auto justify-center font-bold text-lg ml-17">
      
    <Link to="/genres">Genres</Link> {" "}
      <Link to="/movies">Movies</Link> {" "}
      <Link to="/customers">Customers</Link> {" "}
        <Link to="/rental">Rental</Link> {" "}
        <Link to="/login">Login</Link> {" "}
        <Link to="/Register">Register</Link> {" "}
        

        <div class="flex justify-center">
  <div class="mb-3 xl:w-65">
    <div class="input-group relative flex flex-wrap items-stretch w-full mt-5 ml-20 back bg-gradient-to-r from-cyan-500 to-blue-500">
     
    </div>
  </div>
</div>

    </div>
  </div>
</nav>
<Outlet/>
    </div>
  );
}

export default Navbar;
