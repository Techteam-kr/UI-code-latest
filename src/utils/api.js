import axios from "axios";

const localhost = "http://localhost:9001";
const devserver = "http://15.207.110.59:9002";

export const getCategory = () => axios.get(devserver + "/category");

export const getAgeTypes = () => axios.get("./data/Age.json");

export const getGenderTypes = () => axios.get("./data/Gender.json");
export const getMartialStatus = () => axios.get("./data/martialStatus.json");
export const getReligionType = () => axios.get("./data/Religion.json");
export const fetchYojanaList = (params) =>
  axios.post(devserver + "/filteredYojanas", params);
// axios.get("./data/MasterYojanaJSON.json");

export const fetchYojanaNames = () => axios.get(devserver + "/listofYojanas");
export const searchYojanas = (params) =>
  axios.post(devserver + "/searchYojanas", params);
export const yojanaForm = (params) =>
  axios.post(devserver + "/saveform", params);
// export const searchYojanas = () => axios.get("./data/YojanaDetail.json");
