import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  gettingItemFromLocalStorage,
  KEY_ACCESS_TOKEN,
} from "../utils/localStorageManager";
// this file is to check whether the user logged in or not
function RequireUser() {
  {
    /* if we need to go to home, we need to go to require user , require user will check whether
          access token is there or not , if access token is there , we sent you to home,
orherwise we sent you to login page  */
  }
  // if we do have the access tken key then the user is loggedin
  const user = gettingItemFromLocalStorage(KEY_ACCESS_TOKEN);
  return user ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
}

export default RequireUser;
