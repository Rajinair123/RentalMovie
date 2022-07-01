import axios from "../../axios.common";

const create = (data) => {
  return axios.post("/users", data);
};
const registerService = {
  
  create,
  
};
export default registerService;
