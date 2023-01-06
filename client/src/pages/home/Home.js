import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";

function Home() {
  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    const response = await axiosClient.get("/post/all");
    console.log(` got the response ${response}`);
  }
  return (
    <div>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Home;
