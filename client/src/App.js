// import "./App.css";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          {/* protected Route */}
          {/* if we need to go to home, we need to go to require user , require user will check whether
          access token is there or not , if access token is there , we sent you to home,
          orherwise we sent you to login page   */}
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
