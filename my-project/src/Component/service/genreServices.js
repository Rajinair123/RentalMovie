import axios from "../../axios.common";
const getAll = () => {
  return axios.get("/genres");
};
const get = (id) => {
  return axios.get(`/genres/${id}`);
};
const create = (data,token) => {
  return axios.post("/genres", data,{
    headers:{"x-auth-token":token},
  });
  
};


const getCount = ()=>{
  return axios.get("genres/count")
}


const pfs = (data)=>{
  return axios.post('/genres/pfs',data)

}


const update = (id, data,token) => {
 return axios.put(`/genres/${id}`, data,{
    headers:{"x-auth-token":token},
  });
};
const remove = (id,token) => {
  console.log(id);
  return axios.delete(`/genres/${id}`,{headers:{"x-auth-token":token}});
  
};

const genreService = {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
  pfs
};
export default genreService;
