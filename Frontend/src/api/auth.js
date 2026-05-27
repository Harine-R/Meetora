import axios from "axios";

const API = "http://127.0.0.1:8000";

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};

export const signupUser = (data) => {
  return axios.post(`${API}/signup`, data);
};

export const createEvent = (data) => {
  return axios.post(`${API}/events`, data);
};

export const getEvents = () => {
  return axios.get(`${API}/events`);
};