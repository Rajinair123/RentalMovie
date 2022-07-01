import axios from "../../axios.common";

const create = (data) => {
  return axios.post("/login", data);
};


const loginService = {
 
  create,
 
};
export default loginService;
