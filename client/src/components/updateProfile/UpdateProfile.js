import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss"; // make themes google search social media themes
import userImg from "../../assets/hacker.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();
  const myProfileInfo = useSelector(
    (state) => state.appConfigReducer.myProfile
  );
  useEffect(() => {
    // in the begining the value of name, bio which is declared in the form input
    // is null or can be null , when it is null it becomes uncontrolled input
    // thus when name and bio gets the actual value , it becomes controlled input
    // hence transforming from uncontrolled input to controlled input
    // therefor to remove the warning introdncing ||" " , which means if we
    // if we recieve null from the myProfileInfo then we will return "" i.e empty
    // which remove the warning of uncontrolled input
    setName(myProfileInfo?.name || "");
    setBio(myProfileInfo?.bio || "");
    // setUserImage(myProfileInfo?.avatar.url||"");
    // in the begining  myProfileInfo may be null ,as the value inside the myProfileInfo may come later
    // as it is a async function , so if the data inside the myProfileInfo comes later ,the component
    // wont come to know about the update therefore putting myProfileInfo inside the dependency array so that
    // useEffect will run again as there is change or update inside the myProfileInfo ,well..
    // therefore state variable of the component gets updated
    // hence whenever the data inside the myProfileInfo gets updated or changes please run the useEffect again
  }, [myProfileInfo]);
  function handleImageChange(event) {
    // we can select multiple files , out of mutiple files , we are trying
    // to get the one file by default which is present inside the array and i.e
    // the first element of the array list
    const file = event.target.files[0];
    // we get the FileReader from DOM itself
    // before sending a file to the backend we need to encode that file into base64
    const fileReader = new FileReader();
    // passing the file inside the dataURl,
    //  readAsDataURL is an async operation
    fileReader.readAsDataURL(file);
    // after completion of file reading , it will load , it will tell us
    fileReader.onload = () => {
      // checking whether the file is ready to read or not
      if (fileReader.readyState === fileReader.DONE) {
        setUserImage(fileReader.result);
      }
    };
  }
  function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-side">
          {/* <img src={userImg} alt="user-image" /> */}
          <div className="input-user-image">
            <label htmlFor="userInputImg" className="labelUserImage">
              <img src={userImage} alt="name" />
            </label>
            {/* accept="image/*" it means it will accept any sort of image  */}
            {/* input id and htmlFor having the same name , therfore linking the both with same name */}
            <input
              id="userInputImg"
              type="file"
              className="input-Image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              value={bio}
              type="text"
              placeholder="your bio "
              onChange={(event) => setBio(event.target.value)}
            />
            <button
              type="submit"
              className="btn-primary"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
          <button className="btn-primary delete-account ">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
