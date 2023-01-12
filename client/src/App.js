// import "./App.css";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          {/* protected Route */}
          {/* if we need to go to home, we need to go to require user , require user will check whether
          access token is there or not , if access token is there , we sent you to home,
          orherwise we sent you to login page   */}
          {/* <Route path="/" element={<Home />}>  */}
          {/* path="/" inside  <Route path="/" element={<Home />}>  is not necessary  */}
          <Route element={<Home />}>
            {/* when "/" it will got user Require if the require user exist then it goes to Home,
            Home will make the Navbar and Outlet , and inside that Outlet the Feed component will open */}
            <Route path="/" element={<Feed />} />
            {/* when path is "/profile/:userId" it will go to UserRequire , if the
            user exist i.e the user Require exist , then it will go to Home
            component , the Home component will make the navbar as defined in
            the Home component , and then inside the outlet the Profile
            component will open */}
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
