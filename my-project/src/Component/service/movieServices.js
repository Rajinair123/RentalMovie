import axios from "../../axios.common";
const getAll = () => {
  return axios.get("/movies");
};
const get = (id) => {
  return axios.get(`/movies/${id}`);
};


const getCount = (genreName,title) =>{
  return axios.get(`/movies/count?genreName=${genreName}&title=${title}`);

}

const pfs =(data) =>{
  return axios.post('/movies/pfs',data)
}


const create = (data,token) => {
  return axios.post("/movies", data,{
 headers:{"x-auth-token":token}
  })
};
const update = (id, data,token) => {
  return axios.put(`/movies/${id}`,data,{
    headers:{"x-auth-token":token}
  }
  )};

const remove = (id,token) => {

  return axios.delete(`/movies/${id}`,{
    headers:{"x-auth-token":token}
  });
};

const movieService = {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
  pfs
};
export default movieService;


