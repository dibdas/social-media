import axios from "axios";
import { token } from "morgan";
import {
  KEY_ACCESS_TOKEN,
  removingItemFromLocalStorage,
  gettingItemFromLocalStorage,
  // settingItemFromLocalStorage,
  // getItem,
  setItem,
  // removeItem,
} from "../utils/localStorageManager.js";

// the work of axois is to do backend api call in order to do api call from the servers
// we created axiosClient instead of axios.create it is because there are several operations
//  which we dont have to repeat  again and again in every api call
// making a global axios client by which we are making all the global operations
// global opration for which global axios Client is made, the operations are  :-
// declaring the baseURL of the app and send the cookies, by declaring withCredentials
const axiosClient = axios.create({
  // we can define the baseURL here , so that we dont have to write or repeat it again
  // it should baseURL.., dont misspell it , it will give error
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  //   without withCredentials cookies wont be send from frontend to backend
  withCredentials: true, // sending the cookies,passing cookies
});

// we use request interceptor , in order to put access token in the authorization header
axiosClient.interceptors.request.use(
  // (config)=>{
  // any name can be given to it
  (request) => {
    const accessToken = gettingItemFromLocalStorage(KEY_ACCESS_TOKEN);
    console.log(accessToken);
    // the backend is expecting the request like this with Bearer space string access token
    // the backend is also checking that authorization header inside the request
    // so sending authorization inside headers and attaching accessToken to it like as below
    // in every request we  need to put access token inside the authorization header
    // putting accessToken in the authorization header
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
  }
);
axiosClient.interceptors.response.use(
  async (response) => {
    console.log(response);
    const data = response.data;
    const statusCode = data.statusCode;
    const error = data.message;
    if (data.status === "ok") {
      // if the status is ok then whichever componenet did the api call will recieve the data
      console.log("ok", response);
      return data.result;
    }
    console.log("oi");
    // original Request is the api request frontend to backend to fetch resources
    const originalRequest = response.config;
    console.log(originalRequest);
    console.log(response);

    // this will logout the user ,
    // when the refresh token is expired and user is send to the login page by reloading
    // when the response from the refresh api is 401 it means refresh token has expired say after 1yr
    // depends on the expiry date , so logout the user and reload the login page,
    // refresh token of 1yr has been expired ,therefore logout and login again
    // checking the statusCode is 401 and whether the api request is refresh api or not, if 401 is coming
    // from the refresh api then you cant refresh further then remove access token from local storage,and
    // redirecting the User to the login page
    if (
      // when the refresh token is expired and user is send to the login page
      statusCode === 401 &&
      originalRequest.url ===
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
      removingItemFromLocalStorage(KEY_ACCESS_TOKEN);
      console.log(`ko`);
      // reloading the login page in the itself, not in the react way , but in the document way
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }

    // here we are calling the post/all api
    // when the statusCode of 401 is not coming from the refresh api, it is coming from
    // the normal api which means the access token has expired so call the refresh api to regenerate
    // the access token

    // access token got expired
    // checking the statusCode and also the checking the Whether the original request has been retried
    // or not , if not then retry the original request
    // means access token has expired
    if (statusCode === 401 && !originalRequest._retry) {
      // access token expired
      // while calling the refresh api we may get the error , it is beacuse of the refresh token
      // may have got expired after 1yr i.e the validity is 1yr , then it will return the error
      console.log("12");
      originalRequest._retry = true;
      // const response = await axiosClient.get("/auth/refresh");
      // instead of axiosClient we did axios.create it is because of the axiosClient which was previously
      // defined before would have called the refresh api for refresh token and that would have intercepted
      // the error , thus it creates the issue which is infinite loop
      // therefore doing the axios .create,
      const axiosResponse = await axios
        .create({ withCredentials: true }) // assing cookies inside the rfresh api cal
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
      console.log("ki");

      console.log("response from backend", axiosResponse);
      if (axiosResponse.data.status === "ok") {
        // gettting 401 error from Post api , therefore invalid access key i.e access token got expired
        // so hitting refresh api to get the new access token and saving the the new access token
        // in the local storage
        // saving the new access oken inside the local storage
        // settingItemFromLocalStorage(
        setItem(KEY_ACCESS_TOKEN, axiosResponse.data.result.newaccessToken);
        // after saving the new access token in the local storage ,we are send it attaching it with the
        // authoriation header of the original request i.e post/all , from the request where the error came
        // passing the newaccessToken inside the authorization header of the original request from where
        // the 401 error came and original is not the refresh token request
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${axiosResponse.data.result.newaccessToken}`;

        // callling the originalRequest by axios , therefore if the error was from post/all , them
        // it will be called again with new access token and it will bring the response from
        // where it is being called

        return axios(originalRequest);
        // dont call the axiosClient , it will choose the previous authorization header not th recent one
        // issues coming while refresing the access Token
      } else {
        //if we get the error from the refresh api
        removingItemFromLocalStorage(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(axiosClient.data.error);
      }
    }
    // if the error is neither 401 nor refresh api error then send the response error where the
    // request being sent
    return Promise.reject(data.error);
  }
  // (error) => {
  // console.log(error);
  // }
);
export default axiosClient;
