import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { getMyInfo, setLoading } from "../../redux/slices/appConfigSlice";
import axiosClient from "../../utils/axiosClient";

function Home() {
  // after require user home Component gets loaded
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
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("home");
    console.log(dispatch);
    // after reqire uer user home Component gets loaded , whenever home component gets loaded
    // dispatch the action getMyInfo to fetch data from the backend ,getMyInfo do an async call
    dispatch(getMyInfo());
  }, []);
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
