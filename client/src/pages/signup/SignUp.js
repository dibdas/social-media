import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.scss";

function SignUp() {
  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">SgnUp</h2>
        <form action="">
          {/* providing id to the input field is important,as id can be linked to label */}

          <label htmlFor="name">Name</label>
          <input type="text" className="name" id="name" />

          <label htmlFor="email">Email</label>
          <input type="email" className="email" id="email" />

          <label htmlFor="password">Password</label>
          <input type="password" className="password" id="password" />

          <button type="submit">Sign Up</button>
        </form>
        <p className="signUp">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
