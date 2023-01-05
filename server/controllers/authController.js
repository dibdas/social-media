const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //   return res.status(400).json({ text: `All fields are required` });
      //   sending the response in the wrapper format
      return res.send(error(400, { text: `All fields are required` }));
    }
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      //   return res.status(409).json({ text: `Email already registered` });
      return res.send(error(409, { text: `Email already registered` }));
    }
    // bcrypt.hash(data you would like to hash, saltrounds)
    // once you encode the password it cant be decoded
    // bcrypt is an async function
    const hashedPassword = await bcrypt.hash(password, 9);

    // it can also be done by doing like Users.save() instead

    // const user = await Users.create({
    //   email,
    //   password: hashedPassword,
    // });
    // OR
    const creatingUser = new Users({
      email,
      password: hashedPassword,
    });
    const user = await creatingUser.save();
    // return res.status(201).json({ user });
    return res.send(success(201, { user }));

    res.send("signup");
  } catch (error) {
    console.log(error);
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //   return res.status(400).json({ text: `all fields required` });
      return res.send(error(400, { text: `All fields are required` }));
    }
    const user = await Users.findOne({ email });
    console.log(user); // whole user data is coming not only email and password fields
    if (!user) {
      //   return res.status(404).json({ text: `email does not exist` });
      return res.send(error(400, { text: `user does not exist` }));
    }
    // cont userPassword
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      //   return res.status(404).json({ text: `incorrect password` });
      return res.send(error(404, { text: `incorrect password` }));
    }
    // generating the access token ,as email and password got matched and they are ok
    // inside the generateAccesstoken can pass anything here passing email and id
    const accessToken = generateAccessToken({
      email: user.email,
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      email: user.email,
      _id: user._id,
    });
    // console.log(accessToken);
    // cookieName is the name of the cookie
    res.cookie("cookieName", refreshToken, {
      httpOnly: true, // cannot be accessed by frontend
      secure: true, // for https it is secured while attaching SSL certificates
    });
    // return res.status(200).json({
    //   user: `${user}`,
    //   accessToken: `${accessToken}`,
    // sending  the refresh token in cookie
    // refreshToken: `${refreshToken}`,
    // });
    return res.send(
      success(200, { user: `${user}`, accessToken: `${accessToken}` })
    );
    res.send("signup");
  } catch (error) {
    console.log(error);
  }
};

// this api will check the refresh token validity and generate a new access token
// as it is coming from the client via internet thats why sync, and these is not internal function
const refreshAccessTokenController = async (req, res) => {
  //   const { refreshToken } = req.body;
  // fetching or getting the refresh token from the cookie now and  not from the req.body
  //   fetching the refresh token from the cookies not from the req.body

  const cookies = req.cookies;
  if (!cookies.cookieName) {
    // return res.status(401).json({ message: `refresh token is required` });
    return res.send(
      error(401, { text: `refresh token in cookie is required` })
    );
  }
  const refreshToken = cookies.cookieName;
  console.log(`refreshToken: ${refreshToken}`);

  if (!refreshToken) {
    // return res.status(401).json({ message: `refresh token is required` });
    return res.send(error(401, { text: `refresh token is required` }));
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    // in any scenario if the refresh token seems to be invalid  then generate the access token by login
    // and create a new access token  , that accessToken creates the refresh token

    // when refresh token got verified ,create the access token
    const _id = decoded._id;
    const email = decoded.email;
    const accessToken = generateAccessToken({ _id, email });
    return res.status(201).json({ newaccessToken: `${accessToken}` });
  } catch (error) {
    // return res.status(401).json({ msg: `Invalid refresh token` });
    return res.send(error(401, { msg: `Invalid refresh token` }));
  }
};

// internal functions, which is not  for exporting

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
  // return token;
};
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "1yr",
    });
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
  // return token;
};
module.exports = {
  loginController,
  signupController,
  refreshAccessTokenController,
};
