import axios from "axios";

const localhost = "http://localhost:9001";
// const devserver = "http://52.88.137.206:9001";

export const getCategory = () => axios.get("./data/category.json");

export const getAgeTypes = () => axios.get("./data/Age.json");

export const getGenderTypes = () => axios.get("./data/Gender.json");
export const getMartialStatus = () => axios.get("./data/martialStatus.json");
export const getReligionType = () => axios.get("./data/Religion.json");
export const fetchYojanaList = (params) =>
  // axios.post(localhost + "/filteredYojanas", params);
  axios.get("./data/MasterYojanaJSON.json");

export const fetchYojanaNames = () => axios.get(localhost + "/listofYojanas");
// export const searchYojanas = () => axios.get(localhost + "/searchYojanas");
export const searchYojanas = () => axios.get("./data/YojanaDetail.json");
