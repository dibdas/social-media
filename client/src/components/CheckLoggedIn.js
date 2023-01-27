import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  gettingItemFromLocalStorage,
  KEY_ACCESS_TOKEN,
} from "../utils/localStorageManager";

function CheckLoggedIn() {
  const user = gettingItemFromLocalStorage(KEY_ACCESS_TOKEN);
  //   if the user is present then go to home , otherwise go the login and signup
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default CheckLoggedIn;
