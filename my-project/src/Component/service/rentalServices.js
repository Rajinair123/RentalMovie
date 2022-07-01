import axios from "../../axios.common";
const getAll =() =>{
    return axios.get("/rentals");
}
const get =(id) =>{
    return axios.get(`/rentals/${id}`);

}
const create =(data)=>{
    return axios.post('/rentals',data)
}

const patch = (id,data)=>{
    return axios.patch(`/rentals/${id}`,data);
}

const pfs = (data)=>{
    return axios.post("/rentals/pfs",data)
}

const getCount = ()=>{
    return axios.get("/rentals/count")
}



const remove = (id) =>{
  return axios.delete(`/rentals/${id}`)
}

const rentalServices = {
    getAll,
    get,
    create,
    patch,
    remove,
    pfs,
    getCount
};
export default rentalServices;