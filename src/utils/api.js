import axios from "axios";

export const getCategory = () =>
  axios.get("http://52.88.137.206:9001/category");

export const getAgeTypes = () => axios.get("./data/Age.json");

export const getGenderTypes = () => axios.get("./data/Gender.json");

export const fetchYojanaList = (params) =>
  axios.post("http://52.88.137.206:9001/filteredYojanas", params);

export const fetchYojanaNames = () =>
  axios.get("http://52.88.137.206:9001/listofYojanas");
