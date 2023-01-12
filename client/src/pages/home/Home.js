import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axiosClient from "../../utils/axiosClient";

function Home() {
  // async function fetchdata() {
  //   try {
  //     const response = await axiosClient.get("/post/all");
  //     console.log(` got the response ${response}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchdata();
  // }, []);
  return (
    <>
      {/* <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link> */}
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
