import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import {
  KEY_ACCESS_TOKEN,
  settingItemFromLocalStorage,
  setItem,
} from "../../utils/localStorageManager";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  // console.log(axiosClient.baseUrl);
  async function handleSubmit(event) {
    event.preventDefault(); // it prevent to reload the page
    try {
      const result = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      console.log(result);
      // settingItemFromLocalStorage(
      // setItem(KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
      setItem(KEY_ACCESS_TOKEN, result.accessToken);
      console.log(result.accessToken);
      console.log("logged in ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* providing id to the input field is important,as id can be linked to label */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" onSubmit={handleSubmit}>
            Login
          </button>
        </form>
        <p className="signUp">
          Need an account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
