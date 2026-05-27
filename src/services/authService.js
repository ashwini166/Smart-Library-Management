import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const loginUser = async (data) => {
  return axios.post(`${API}/login`, data);
};

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data);
};