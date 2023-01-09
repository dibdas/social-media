import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import "./SignUp.scss";

function SignUp() {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [name, setName] = useState();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">SgnUp</h2>

        <form action="" onSubmit={handleSubmit}>
          {/* providing id to the input field is important,as id can be linked to label */}

          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="submit" onSubmit={handleSubmit}>
            Sign Up
          </button>
        </form>
        <p className="signUp">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
