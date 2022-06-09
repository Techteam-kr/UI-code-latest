import axios from "axios";

const localhost = "http://localhost:9001";
const devserver = process.env.REACT_APP_API_KEY;
export const getCategory = () => axios.get(devserver + "/category");

export const getAgeTypes = () => axios.get("./data/Age.json");

export const getGenderTypes = () => axios.get("./data/Gender.json");
export const getMartialStatus = () => axios.get("./data/martialStatus.json");
export const getReligionType = () => axios.get("./data/Religion.json");
export const getMinistryList = () => axios.get("./data/Ministry.json");
export const fetchYojanaList = (params) =>
  axios.post(devserver + "/filteredYojanas", params);
// axios.get("./data/MasterYojanaJSON.json");
export const fetchOtp = (params) => axios.post(devserver + "/inputmob", params);
export const verifyOtp = (params) =>
  axios.post(devserver + "/verifyotp", params);
export const fetchYojanaNames = () => axios.get(devserver + "/listofYojanas");
export const searchYojanas = (params) =>
  axios.post(devserver + "/searchYojanas", params);
export const yojanaForm = (params) =>
  axios.post(devserver + "/saveform", params);
// export const searchYojanas = () => axios.get("./data/YojanaDetail.json");
