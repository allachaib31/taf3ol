import axios from "axios";
import { authAdminRoute } from "./apiRoutes";

axios.defaults.withCredentials = true;

// Function to get the token from local storage
const getToken = () => {
    return localStorage.getItem("token");
};

// Function to set the token in Axios headers
const setAuthorizationHeader = () => {
    const token = getToken();
    if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"]; // Remove header if no token
    }
};

export const saveToken = (token) => {
    localStorage.setItem("token", token);
    setAuthorizationHeader(); // Set the header after saving the token
};

export const postMethode = async (url, data) => {
    setAuthorizationHeader(); // Set the header before the request
    const response = await axios.post(url, data);
    if(url == authAdminRoute) saveToken(response.data.token); // Save the token from response
    return response;
};

export const getMethode = async (url) => {
    setAuthorizationHeader(); // Set the header before the request
    const response = await axios.get(url);
    return response;
};

export const putMethode = async (url, data) => {
    setAuthorizationHeader(); // Set the header before the request
    const response = await axios.put(url, data);
    return response;
};

export const patchMethode = async (url, data) => {
    setAuthorizationHeader(); // Set the header before the request
    const response = await axios.patch(url, data);
    return response;
};

export const deleteMethode = async (url) => {
    setAuthorizationHeader(); // Set the header before the request
    const response = await axios.delete(url);
    return response;
};
