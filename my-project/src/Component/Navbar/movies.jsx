import React ,{ useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteMovies,getMovies,getCount} from "../../resources/movie/movieSlice";
import Pagination from "./pagination";
import Listgroup from "./listGroup";
import SearchTitle from "./searchtitle";
import { retrieveGenres } from "../../resources/genre/genreSlice";
import MovieTable from "./movieTable";


const Movies = () =>    {
    const movies = useSelector((state)=>state.movieReducer.movies);
    const moviesCount = useSelector((state)=>state.movieReducer.moviesCount);
    const genres = useSelector((state) => state.genreReducer.genres)
    const error = useSelector((state) => state.movieReducer.error);
    const dispatch = useDispatch();

    const [currentPage, setCurrentapage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [title, setTitle] = useState("");
    const [genreName, setGenreName] = useState("");
    const [sortColumn, setSortColumn]= useState({path:'title',order:1})

    useEffect(() => {
        let gName = "";
        if (genreName !== "All Genres") {
          gName = genreName;
        }
        dispatch(getCount({gName,title}));
      }, [movies]);

    useEffect(()=>{
        //dispatch(retrieveMovies());
        dispatch(getCount());
        dispatch(getMovies({currentPage:currentPage,pageSize:pageSize,genreName,title:title,sortColumn:sortColumn}))
        dispatch(retrieveGenres())
    },[]);

    const handleChange = (page) => {
        let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
        setCurrentapage(page);
        setTitle(title);
        dispatch(getMovies({ currentPage: currentPage, pageSize: pageSize,genreName,sortColumn: 
          gName ,title:title,sortColumn}));
      };    
       
      

      const handleGenreSelection = (genreName) => {
        let gName = "";
        if (genreName !== "All Genres") {
          gName = genreName;
        }
        setGenreName(genreName);
        setCurrentapage(1);
        setTitle(title);
        dispatch(getMovies({ pageSize, currentPage: 1, genreName: gName,title:title ,sortColumn:sortColumn}));
      };

      const handleSearch = (title) => {
        let gName = "";
        if (genreName !== "All Genres") {
          gName = genreName;
        }
        setTitle(title);
        setCurrentapage(1);
        dispatch(getMovies({ pageSize, currentPage: 1, genreName: gName,title:title,sortColumn:sortColumn }));
      }

      const handleSort=(sortColumn)=>{
        let gName = "";
        if (genreName !== "All Genres") {
          gName = genreName;
        }
        setSortColumn(sortColumn);
        console.log('sorting',sortColumn)
        dispatch(getMovies({ pageSize, currentPage: 1, genreName: gName,title:title,sortColumn }));
      }

    const handleDelete=(id)=>{
      setCurrentapage(1);
      dispatch(deleteMovies(id));
    }


    return (
            
        <div className="container-fluid flex felx-row justify-evenly ">
            <div className="filter-section">

               <SearchTitle
                 onSearch={handleSearch}/>
                    
                    
              
            <Listgroup
       items={[{ _id: "", name: "All Genres" }, ...genres]}
       onItemSelect={handleGenreSelection}
         selectedItem={genreName}
     />

      
                 
            </div>
        
           
           
        <div className="flex-col  flex items-center ml-20  border-gray-700  ">
        
       <div className="items-center">
    <h2 className="text-black-500  font-bold  font-serif text-center text-3xl m-2 ">Movies</h2>
    
    {error && <h4 style={{ color: "red"  }}>Something Failed</h4>}
          {movies && movies.length > 0 ? (
      <MovieTable  movies ={movies}
     onSort={handleSort}
     sortColumn={sortColumn}
     onDelete={handleDelete}
    />) : (
      <p>No movies found in the database</p>
    )}
   
   <Link to ="/movieForm/new"><button className="text-white bg-gradient-to-r from-teal-500 via-teal-500 to-teal-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10 mr-10">+</button></Link>
  
   
    <Pagination
    count ={moviesCount}
    pageSize={pageSize}
    currentPage={currentPage}
    onPageChange={handleChange}
    /> 

  
    </div>
   
    </div>
<div>
</div>
</div>



    );

}
    
  export default Movies;
