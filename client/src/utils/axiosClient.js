import axios from "axios";
import { token } from "morgan";
import {
  KEY_ACCESS_TOKEN,
  removingItemFromLocalStorage,
  gettingItemFromLocalStorage,
  settingItemFromLocalStorage,
  // getItem,
  // setItem,
  // removeItem,
} from "../utils/localStorageManager.js";

const axiosClient = axios.create({
  // we can define the baseURL here , so that we dont have to write or repeat it again
  // it should baseURL.., dont misspell it , it will give error
  baseURL: "http://localhost:7000/api",
  //   without withCredentials cookies wont be send from frontend to backend
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  // (config)=>{
  // any name can be given to it
  (request) => {
    const accessToken = gettingItemFromLocalStorage();
    // the backend is expecting the request like this with Bearer space string access token
    // the backend is also checking that authorization header inside the request
    // so sending authorization inside headers and attaching accessToken to it like as below
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
  },
  (error) => {
    console.log(error);
  }
);
axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }
    // original Request is the api request frontend to backend to fetch resources
    const originalRequest = response.config;

    // this will logout the user ,
    // when the refresh token is expired and user is send to the login page by reloading
    // when the response from the refresh api is 401 it means refresh token has expired say after 1yr
    // depends on the expiry date , so logout the user and reload the login page,
    // refresh token of 1yr has been expired ,therefore logout and login again
    if (
      // when the refresh token is expired and user is send to the login page
      data.statusCode === 401 &&
      originalRequest.url === "http://localhost:7000/api/auth/refresh"
    ) {
      removingItemFromLocalStorage(KEY_ACCESS_TOKEN);
      // reloading the login page in the itself, not in the react way , but in the document way
      window.location.replace("/login", "_self");
      return Promise.reject(data.error);
    }
    // when the statusCode of 401 is not coming from the refresh api, it is coming from
    // the normal api which means the access token has expired so call the refresh api to regenerate
    // the access token

    if (data.statusCode === 401) {
      // while calling the refresh api we may get the error , it is beacuse of the refresh token
      // may have got expired after 1yr i.e the validity is 1yr
      const response = await axiosClient.get("/auth/refresh");
      console.log("response from backend", response);
      if (response.status === "ok") {
        settingItemFromLocalStorage(KEY_ACCESS_TOKEN, response.newaccessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.accessToken}`;

        return axios(originalRequest);
      }
    }
    // if the error is neither 401 nor refresh pai error then send the response error where the request being sent
    return Promise.reject(response.error);
  }
  // (error) => {
  // console.log(error);
  // }
);
export default axiosClient;
